'use strict';
var customElementNames = ['c-nav-primary','c-btn','c-btn--dropdown','c-nav-overlay-card','c-nav-overlay-card--absolute','c-nav-overlay-card--is-open','c-overlay--dim','c-btn--rect','c-brand','c-menu','c-menu--vertical','c-main-content','c-link-list','c-tldr-list','c-tldr-list__item','c-link-item','c-link-item__title','c-link-item__description','c-link','c-link--basic','c-link--see-more','c-post','c-post__title','c-post__content','c-post__footer'];

let connectedCallbacks = {
  'c-one': function(){
    console.log('c-one');
    this.append();
  },
  'c-two': function(){
    console.log('c-two');
    this.append();
  },
  'c-three': function(){
    console.log('c-three');
    this.append();
  }
}
  
registerCustomElements(customElementNames, connectedCallbacks);
  
function registerCustomElements(names, connectedCallbackFuncs){
  for(let i=0; i<names.length; i++){
    let name = names[i];
    let connectedCallbackFunc = connectedCallbackFuncs[name];
    if(!connectedCallbackFunc){
      throw 'ERROR. ' + name + ' is missing in the connectedCallbackFuncs map. Every custom element should be provided a connected callback function.';
    }
    if(typeof connectedCallbackFunc !== 'function'){
      throw 'ERROR. ' + name + '\'s connectedCallbackFunc should be a function. ' + connectedCallbackFunc;
    }
    let customElementClass = createCustomElementBaseClass(connectedCallbackFunc)
    customElements.define(name, customElementClass);
  }
}

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
