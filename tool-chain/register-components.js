const fs = require('fs');
const util = require('util');
const css = require('css');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

async function main(){
  const gridCssFile = await readFile('../grid.css', 'utf-8');
  const modulesCssFile = await readFile('../modules.css', 'utf-8');
  const obj = css.parse(modulesCssFile);
  const obj2 = css.parse(gridCssFile);

  const rules = obj.stylesheet.rules.concat(obj2.stylesheet.rules);

  const validClassNames = [];
  rules.forEach(rule => {
    const selectors = rule.selectors;
    if(selectors.length === 1 && !selectors[0].includes(':') && selectors[0].charAt(0) === '.'){
      validClassNames.push(selectors[0])
    }
  });
  
  const dir = '../components';
  const dirExists = await exists(dir);
  if(!dirExists){
    await mkdir(dir);
  }
  if(!dir){
    fs.mkdir(dir)
  }

 let customElementNames = [];
  validClassNames.forEach(name => {
    customElementNames.push('c-' + name.slice(1));
  })
  let generatedCode = '';
  generatedCode += createCustomElementNameArrayCodeSnippet(customElementNames);
  generatedCode += await createConnectedCallbackFunctionsCodeSnippet(process.argv[2]);
  generatedCode += createRegisterCustomElementsCodeSnippet();
  generatedCode += createHelperFunctionCodeSnippet();

  await writeFile(dir + '/generated-index.js', generatedCode);

}
main().then().catch(e => {
  console.log(e);
});

async function createConnectedCallbackFunctionsCodeSnippet(path){
  const connectedCallbackFuncs = await readFile(path);
  return `
${connectedCallbackFuncs}  
`
}

function createCustomElementNameArrayCodeSnippet(names){
  return `'use strict';

/* DO NOT EDIT. THIS FILE WAS AUTOMATICALLY GENERATED. */

var customElementNames = [${names.map(name => `'${name}'`)}];
`
}

function createRegisterCustomElementsCodeSnippet(){
  return `registerCustomElements(customElementNames, connectedCallbacks);
  
function registerCustomElements(names, connectedCallbackFuncs){
  Object.keys(connectedCallbackFuncs).map(nameFromCallbacksFile => {
    if(!names.includes(nameFromCallbacksFile)){
      throw 'ERROR. ' + nameFromCallbacksFile + ' is specified in your connectedCallbacks.js file, but it doesnt appear in your CSS files.';
    }
  })
  for(let i=0; i<names.length; i++){
    let name = names[i];
    let connectedCallbackFunc = connectedCallbackFuncs[name];

    if(connectedCallbackFunc === 'default'){
      connectedCallbackFunc = function(){
        document.addEventListener("DOMContentLoaded", (event) => {
          constructClassNames(this);
          this.append();
        });
      }
    }

    if(!connectedCallbackFunc){
      throw 'ERROR. ' + name + ' is missing in the connectedCallbackFuncs map. Every custom element should be provided a connected callback function.';
    }
    if(typeof connectedCallbackFunc !== 'function'){
      throw 'ERROR. ' + name + '\\'s connectedCallbackFunc should be a function. ' + connectedCallbackFunc;
    }
    let customElementClass = createCustomElementBaseClass(connectedCallbackFunc)
    customElements.define(name, customElementClass);
  }
}

function createCustomElementBaseClass(connectedCallbackFunc){
  let baseClass = class extends HTMLElement {
    constructor() {
      super();
    }
  };
  if(connectedCallbackFunc){
    baseClass.prototype.connectedCallback = connectedCallbackFunc;
  }
  return baseClass;
}
`
}

function createHelperFunctionCodeSnippet(){
  return `
/**
 * Todo: set class names at build step instead of runtime
 */
function constructClassNames(elem){
  const name = elem.nodeName.toLowerCase().slice(2); // slice off the prefix for now
  let BLOCK_NAME; // See BEM CSS Methodology
  let ELEMENT_NAME;
  let MODIFIER_NAME;
  let textArrSplitByBlockDelimiter;
  if(name.includes('__')){ // block__elem
    textArrSplitByBlockDelimiter = name.split('__');
    BLOCK_NAME = textArrSplitByBlockDelimiter[0];
  }
  if(textArrSplitByBlockDelimiter && textArrSplitByBlockDelimiter.includes('--')){ // block__elem--mod
    let textArrSplitByStateDelimiter = textArrSplitByBlockDelimiter[1].split('--');
    ELEMENT_NAME = textArrSplitByStateDelimiter[0];
    MODIFIER_NAME = textArrSplitByStateDelimiter[1];
  }
  else if(name.includes('--')) { // block--mod
    let nameSplitByStateDelimiter = name.split('--');
    BLOCK_NAME = nameSplitByStateDelimiter[0];
    MODIFIER_NAME = nameSplitByStateDelimiter[1];
  }
  else { // block
    BLOCK_NAME = name;
  }
  let rootClass = BLOCK_NAME;
  rootClass += ELEMENT_NAME ? '__' + ELEMENT_NAME : '';
  let modifierClass = rootClass + (MODIFIER_NAME ? '--' + MODIFIER_NAME : '');
  elem.classList.add(rootClass);
  elem.classList.add(modifierClass);
}
`
}
