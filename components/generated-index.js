'use strict';

/* DO NOT EDIT. THIS FILE WAS AUTOMATICALLY GENERATED. */

var customElementNames = ['c-nav-primary','c-btn','c-btn--dropdown','c-nav-overlay-card','c-nav-overlay-card--absolute','c-nav-overlay-card--is-open','c-overlay--dim','c-btn--rect','c-brand','c-menu','c-menu--vertical','c-main-content','c-link-list','c-tldr-list','c-tldr-list__item','c-link-item','c-link-item__title','c-link-item__description','c-link','c-link--basic','c-link--see-more','c-post','c-post__title','c-post__content','c-post__footer','c-row','c-row--stretch','c-row--center','c-row--space-between','c-row--space-around','c-col','c-col--vertically-center'];

let connectedCallbacks = {
  'c-link--basic': 'default',
  'c-link': 'default',
  'c-tldr-list': 'default',
  'c-tldr-list__item': 'default',
  'c-menu--vertical': 'default',
  'c-menu': 'default',
  'c-btn--rect': 'default',
  'c-overlay--dim': 'default',
  'c-nav-overlay-card--is-open': 'default',
  'c-nav-overlay-card': 'default',
  'c-btn': 'default',
  'c-nav-primary': 'default',
  'c-btn--dropdown': 'default',
  'c-link-item__title': 'default',
  'c-link-item__description': 'default',

  'c-link-item': function(){
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);
      const anchorTag = document.createElement('a');
      anchorTag.href = '#' + encodeURIComponent(this.children[0].textContent.trim().toLowerCase());
      while(this.lastChild){
        anchorTag.appendChild(this.firstChild);
      }
      this.appendChild(anchorTag);
      this.append();
    });
  },

  'c-link-list': 'default',

  'c-nav-overlay-card--absolute': function(){
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);

      // the class that says whether the state of this nav-overlay-card is OPEN
      const isOpenClass = this.getAttribute('isOpenClass');

      // the thing that can open this menu
      const openOnHoverId = this.getAttribute('openOnHoverId');

      // the thing that can close this menu
      const closeOnClickId = this.getAttribute('closeOnClickId');
      const closeOnClickClass = this.getAttribute('closeOnClickClass');

      /* get references to other elements that impact this element */
      const openOnHoverElem = document.getElementById(openOnHoverId);
      const closeOnClickElem = document.getElementById(closeOnClickId);
      const closeOnClickElements = document.getElementsByClassName(closeOnClickClass);
    
      /* construct self */
      // open if target elem is hovered
      openOnHoverElem.addEventListener('mouseenter', () => {
        if(!this.classList.contains(isOpenClass)){
          this.classList.add(isOpenClass);
        }
      });
      // support touch event too..
      openOnHoverElem.addEventListener('touchstart', () => {
        if(!this.classList.contains(isOpenClass)){
          this.classList.add(isOpenClass);
        }
      });

      // close if target elem is clicked
      closeOnClickElem.addEventListener('click', () => {
        if(this.classList.contains(isOpenClass)){
          this.classList.remove(isOpenClass)
        }
      });
      // support touch event too...
      closeOnClickElem.addEventListener('touchstart', () => {
        if(this.classList.contains(isOpenClass)){
          this.classList.remove(isOpenClass)
        }
      })

      for(let i=0; i<closeOnClickElements.length; i++){
        closeOnClickElements[i].addEventListener('click', () => {
          if(this.classList.contains(isOpenClass)){
            this.classList.remove(isOpenClass)
          }
        });
      }

      /* attach self to DOM */
      this.append();
    });
  },

  'c-post': 'default',

  'c-post__title': function(){
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);
      this.setAttribute('id', encodeURIComponent(this.textContent.trim().toLowerCase()));
      this.append();
    });
  },

  'c-post__content': 'default',
  'c-post__footer': 'default',

  'c-link--see-more': function(){
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);
      const url = this.getAttribute('url');
      const anchorTag = document.createElement('a');
      anchorTag.href = url;
      anchorTag.rel = "noopener noreferrer";
      anchorTag.target = "_blank";
      anchorTag.appendChild(this.cloneNode(true));
      this.replaceWith(anchorTag);
      this.append();
    });
  },

  'c-brand': 'default',

  'c-main-content': function(){
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);
      const dimWhenOpenId = this.getAttribute('dimWhenOpenId');
      const openClassName = this.getAttribute('elemOpenClassName');
      const dimClass = this.getAttribute('dimClass');
      const undimWhenElemsClickedClass = this.getAttribute('undimWhenElemsClickedClass');

      const dimWhenOpenTargetElem = document.getElementById(dimWhenOpenId);

      const targetElemObserver = new MutationObserver((mutations) => {
        for(let i = 0; i<mutations.length; i++){
          const mutation = mutations[i];
          if(mutation.type === 'attributes' && mutation.attributeName === 'class'){
            if(dimWhenOpenTargetElem.classList.contains(openClassName) && !this.classList.contains(dimClass)){
              this.classList.add(dimClass);
            }
          }
        }
      });
      targetElemObserver.observe(dimWhenOpenTargetElem, { attributes: true });

      this.addEventListener('click', () => {
        if(this.classList.contains(dimClass)){
          this.classList.remove(dimClass);
        }
      });
      
      console.log(undimWhenElemsClickedClass);
      const unDimWhenClickedElements = document.getElementsByClassName(undimWhenElemsClickedClass);
      for(let i=0; i<unDimWhenClickedElements.length; i++){
        unDimWhenClickedElements[i].addEventListener('click', () => {
          if(this.classList.contains(dimClass)){
            this.classList.remove(dimClass);
          }
        })
      }
      
      this.append();
    });
  },

  'c-col': 'default',
  'c-col--vertically-center': 'default',
  'c-row': 'default',
  'c-row--stretch': 'default',
  'c-row--center': 'default',
  'c-row--space-between': 'default',
  'c-row--space-around': 'default',
}
  
registerCustomElements(customElementNames, connectedCallbacks);
  
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
      throw 'ERROR. ' + name + '\'s connectedCallbackFunc should be a function. ' + connectedCallbackFunc;
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
