const fs = require('fs');
const util = require('util');
const css = require('css');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

async function main(){
  const modulesCssFile = await readFile('../modules.css', 'utf-8');
  const obj = css.parse(modulesCssFile);

  const validClassNames = [];
  obj.stylesheet.rules.forEach(rule => {
    const selectors = rule.selectors;
    if(selectors.length === 1 && !selectors[0].includes(':') && selectors[0].charAt(0) === '.'){
      validClassNames.push(selectors[0])
    }
  });
  
  const dir = './output';
  const dirExists = await exists(dir);
  if(!dirExists){
    await mkdir(dir);
  }
  if(!dir){
    fs.mkdir(dir)
  }

  let generatedCode = '';
  validClassNames.forEach(className => {
    className = 'c-' + className.slice(1); // add 'c-' prefix, remove '.' prefix
    generatedCode += createRegisterElementCodeSnippet(className);
  })
  generatedCode += createHelperFunctionCodeSnippet();
  await writeFile(dir + '/index.js', generatedCode);

}
main().then().catch(e => {
  console.log(e);
});

function createRegisterElementCodeSnippet(elementName){
  return `
customElements.define('${elementName}', class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);
      this.append();
    });
  }
});
`
}

function createHelperFunctionCodeSnippet(){
  return `
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
