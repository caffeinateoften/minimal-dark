/* Only modifier handlers in the space-cowboy-coding.js file */

let handlers = {

  'c-link-item': function(elem){
      const anchorTag = document.createElement('a');
      anchorTag.href = '#' + encodeURIComponent(elem.children[0].textContent.trim().toLowerCase());
      while(elem.lastChild){
        anchorTag.appendChild(elem.firstChild);
      }
      elem.appendChild(anchorTag);
  },

  'c-nav-overlay-card--absolute': function(elem){
      constructClassNames(elem);

      // the class that says whether the state of this nav-overlay-card is OPEN
      const isOpenClass = elem.getAttribute('isOpenClass');

      // the thing that can open this menu
      const openOnHoverId = elem.getAttribute('openOnHoverId');

      // the thing that can close this menu
      const closeOnClickId = elem.getAttribute('closeOnClickId');
      const closeOnClickClass = elem.getAttribute('closeOnClickClass');

      /* get references to other elements that impact this element */
      const openOnHoverElem = document.getElementById(openOnHoverId);
      const closeOnClickElem = document.getElementById(closeOnClickId);
    
      /* construct self */
      // open if target elem is hovered
      openOnHoverElem.addEventListener('mouseenter', () => {
        if(!elem.classList.contains(isOpenClass)){
          elem.classList.add(isOpenClass);
        }
      });
      // support touch event too..
      openOnHoverElem.addEventListener('touchstart', () => {
        if(!elem.classList.contains(isOpenClass)){
          elem.classList.add(isOpenClass);
        }
      });

      // close if target elem is clicked
      closeOnClickElem.addEventListener('click', () => {
        if(elem.classList.contains(isOpenClass)){
          elem.classList.remove(isOpenClass)
        }
      });
      // support touch event too...
      closeOnClickElem.addEventListener('touchstart', () => {
        if(elem.classList.contains(isOpenClass)){
          elem.classList.remove(isOpenClass)
        }
      })

      const closeOnClickElements = document.getElementsByClassName(closeOnClickClass);
      for(let i=0; i<closeOnClickElements.length; i++){
        closeOnClickElements[i].addEventListener('click', () => {
          if(elem.classList.contains(isOpenClass)){
            elem.classList.remove(isOpenClass)
          }
        });
      }
  },

  'c-post__title': function(elem){
    elem.setAttribute('id', encodeURIComponent(elem.textContent.trim().toLowerCase()));
  },

  'c-link--see-more': function(elem){
    const url = elem.getAttribute('url');
    const anchorTag = document.createElement('a');
    anchorTag.href = url;
    anchorTag.rel = "noopener noreferrer";
    anchorTag.target = "_blank";
    anchorTag.appendChild(elem.cloneNode(true));
    elem.replaceWith(anchorTag);
  },

  'c-main-content': function(elem){
    const dimWhenOpenId = elem.getAttribute('dimWhenOpenId');
      const openClassName = elem.getAttribute('elemOpenClassName');
      const dimClass = elem.getAttribute('dimClass');
      const undimWhenElemsClickedClass = elem.getAttribute('undimWhenElemsClickedClass');

      const dimWhenOpenTargetElem = document.getElementById(dimWhenOpenId);

      const targetElemObserver = new MutationObserver((mutations) => {
        for(let i = 0; i<mutations.length; i++){
          const mutation = mutations[i];
          if(mutation.type === 'attributes' && mutation.attributeName === 'class'){
            if(dimWhenOpenTargetElem.classList.contains(openClassName) && !elem.classList.contains(dimClass)){
              elem.classList.add(dimClass);
            }
          }
        }
      });
      targetElemObserver.observe(dimWhenOpenTargetElem, { attributes: true });

      elem.addEventListener('click', () => {
        if(elem.classList.contains(dimClass)){
          elem.classList.remove(dimClass);
        }
      });

      // if this works, use instead of relying on class names
      actionQueuer.applyWhenReady('c-link-item', (targetElem) => {
        targetElem.addEventListener('click', () => {
          if(elem.classList.contains(dimClass)){
            elem.classList.remove(dimClass);
          }
        });
      });

      /*
        const unDimWhenClickedElements = document.getElementsByClassName(undimWhenElemsClickedClass);
        for(let elem of unDimWhenClickedElements){

        }
      */

      // TODO:  a type connects multiple times. Need to make action queuer sorta "perma" attach/re-apply I guess.
  }
};

registerCustomElements(customElementNames, handlers);

function registerCustomElements(names, connectedCallbackHandlers){
  Object.keys(connectedCallbackHandlers).map(handlerName => {
    if(!names.includes(handlerName)){
      throw 'ERROR. ' + handlerName + ' is specified in your handlers map, but it doesnt appear in your CSS files.';
    }
  });
  for(let i=0; i<names.length; i++){
    let name = names[i];
    if(!handlers[name]){
      console.log('Registering ' + name + ' as a default custom element.');
    }
    let customElementClass = createCustomElementBaseClass()
    customElements.define(name, customElementClass);
  }
}

function createCustomElementBaseClass(connectedCallbackFunc){
  let baseClass = class extends HTMLElement {
    constructor() {
      super();
    }
  };
  baseClass.prototype.connectedCallback = createDefaultConnectedCallback();
  return baseClass;
}

function createDefaultConnectedCallback(){
  return function(){
    document.addEventListener("DOMContentLoaded", (event) => {
      let name = this.nodeName.toLowerCase();
      constructClassNames(this);
      handle(this, name);
      actionQueuer.customElementTypeConnected(this);
    });
  }
}

let hitCount = 0;
let missCount = 0;
let actionQueuer = {
  connectedElements: {},
  hashQueue: {},
  applyWhenReady(elemName, func){     // apply function now, otherwise queue it up for later
    this.queueAction(elemName, func);
  },
  queueAction(elemName, func){         // queue function for particular elemName
    if(this.hashQueue[elemName]){
      this.hashQueue[elemName].push(func);
    } else {
      this.hashQueue[elemName] = [func];
    }
    this.applyAllActionsToAllElementsOfType(elemName);
  },
  customElementTypeConnected(elem){    // store reference, dequeue all queued actions, and apply them to elem
    let name = elem.nodeName.toLowerCase();
    if(this.connectedElements[name]){
      this.connectedElements[name].push(elem);
    } else {
      this.connectedElements[name] = [elem];
    }
    console.log('Custom Elem Type ' + name + ' has connected! ' + (this.hashQueue[name] ? this.hashQueue[name].length : '0') + ' actions to apply.');
    this.applyAllActionsToSingleElementOfType(name, elem);
  },
  applyAllActionsToSingleElementOfType(elemName, elem){
    if(this.hashQueue[elemName]){
      console.log('Applying ' + this.hashQueue[elemName].length + ' functions for one recently connected element of type: ' + elemName);
      for(let func of this.hashQueue[elemName]){
        func(elem);
      }
    }
  },
  applyAllActionsToAllElementsOfType(elemName){ // for each function in the queue, call it with elem.
    if(this.hashQueue[elemName] && this.connectedElements[elemName]){
      console.log('Applying ' + this.hashQueue[elemName].length + ' functions for all ' + this.connectedElements[elemName].length + ' connected elements of type: ' + elemName);
      for(let elem of this.connectedElements[elemName]){
        for(let func of this.hashQueue[elemName]){
          func(elem);
        }
      }
    }
  }
}


function handle(elem, name){
  if(handlers[name]){
    handlers[name](elem);
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



