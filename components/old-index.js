'use strict'

customElements.define('c-btn--dropdown', class extends HTMLElement {
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

/* construct __element's before block__'s in case containing element does something like wrap its contents */
customElements.define('c-link-item__title', class extends HTMLElement {
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

customElements.define('c-link-item__description', class extends HTMLElement {
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

customElements.define('c-link-item', class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);
      const anchorTag = document.createElement('a');
      anchorTag.href = '#' + encodeURIComponent(this.children[0].textContent.trim().toLowerCase());
      anchorTag.appendChild(this.cloneNode(true));
      this.replaceWith(anchorTag);
      this.append();
    });
  }
});

customElements.define('c-link-list', class extends HTMLElement {
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

customElements.define('c-nav-overlay-card--absolute', class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
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
          // support touch event too...
          /*closeOnClickElements[i].addEventListener('touchstart', () => {
            if(this.classList.contains(isOpenClass)){
              this.classList.remove(isOpenClass)
            }
          })*/
        }

        /* attach self to DOM */
        this.append();
      });
    }
});

customElements.define('c-post', class extends HTMLElement {
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

customElements.define('c-post__title', class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);
      this.setAttribute('id', encodeURIComponent(this.textContent.trim().toLowerCase()));
      this.append();
    });
  }
});

customElements.define('c-post__content', class extends HTMLElement {
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

customElements.define('c-post__footer', class extends HTMLElement {
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

// ToDo - Have tool-chain generate HTMLElement classes that properly extend from one another (e.g. c-link--see-more extends c-link)
customElements.define('c-link--see-more', class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
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
  }
});


customElements.define('c-link-item--is-selected', class extends HTMLElement {
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


customElements.define('c-brand', class extends HTMLElement {
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

customElements.define('c-main-content', class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", (event) => {
      constructClassNames(this);
      const dimWhenOpenId = this.getAttribute('dimWhenOpenId');
      const openClassName = this.getAttribute('elemOpenClassName');
      const dimClass = this.getAttribute('dimClass');
      const undimWhenElemsClickedClass = this.getAttribute('undimWhenElemsClickedClass');

      const dimWhenOpenTargetElem = document.getElementById(dimWhenOpenId);
      const unDimWhenClickedElements = document.getElementsByClassName(undimWhenElemsClickedClass);

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

      for(let i=0; i<unDimWhenClickedElements.length; i++){
        unDimWhenClickedElements[i].addEventListener('click', () => {
          if(this.classList.contains(dimClass)){
            this.classList.remove(dimClass);
          }
        })
      }
      
      this.append();
    });
  }
});

customElements.define('c-col', class extends HTMLElement {
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

customElements.define('c-row--stretch', class extends HTMLElement {
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

customElements.define('c-col--vertically-center', class extends HTMLElement {
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

customElements.define('c-row', class extends HTMLElement {
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

customElements.define('c-row--center', class extends HTMLElement {
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

customElements.define('c-row--space-between', class extends HTMLElement {
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

customElements.define('c-row--space-around', class extends HTMLElement {
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
