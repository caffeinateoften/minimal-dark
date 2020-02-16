'use strict';

class post extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", (event) => {
      // TODO: Stricter validation on Block__Element--Modifier usage in custom HTML Element tags
      const name = this.nodeName.toLowerCase();

      // BEM CSS Methodology
      let nameChunks = name.split('__');
      let blockName = nameChunks[0];

      let nameChunks2 = nameChunks[1].split('--');
      let elementName = nameChunks2[0];

      let modifierNames = nameChunks2.slice(1);

      let classNames = blockName + '__' + elementName + ' ';
      for(var i=0; i<modifierNames.length; i++){
        classNames += blockName + '__' + elementName + '--' + modifierNames[i] + ' ';
      } 
      this.setAttribute('class', classNames);
    });
  }
}

class post__title extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", (event) => {
     
    });
  }
}

class post__content extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", (event) => {
     
    });
  }
}

class post__footer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", (event) => {
     
    });
  }
}

customElements.define('post__container--large--rounded', post)
