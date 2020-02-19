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
  let generatedCode = createCustomElementNameArrayCodeSnippet(customElementNames);
  generatedCode += await createIndexFileText(process.argv[2]);

  await writeFile(dir + '/generated-index.js', generatedCode);

}
main().then().catch(e => {
  console.log(e);
});

async function createIndexFileText(path){
  const textContent = await readFile(path);
  return `
  ${textContent}  
`
}

function createCustomElementNameArrayCodeSnippet(names){
  return `'use strict';

/* DO NOT EDIT. THIS FILE WAS AUTOMATICALLY GENERATED. */

var customElementNames = [${names.map(name => `'${name}'`)}];
`
}
