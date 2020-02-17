'use strict';

customElements.define('c-btn--dropdown', class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      document.addEventListener("DOMContentLoaded", (event) => {
        constructClassNames(this);

        /* public interface */
        const onHoverTargetElemId = this.getAttribute('onHoverTargetElemId');
        const onHoverModifierClass = this.getAttribute('onHoverModifierClass');

        /* get references to other elements */
        const targetElem = document.getElementById(onHoverTargetElemId);

        /* construct self */
        this.addEventListener('mouseover', () => {
          if (!targetElem.classList.contains(onHoverModifierClass)) {
            targetElem.classList.add(onHoverModifierClass);
          }
        });
        targetElem.addEventListener('mouseleave', () => {
          if(targetElem.classList.contains(onHoverModifierClass)){
            targetElem.classList.remove(onHoverModifierClass)
          }
        })

        /* attach self to DOM */
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

        /* public interface */
        const onHoverTargetElemId = this.getAttribute('onHoverTargetElemId');
        const onHoverModifierClass = this.getAttribute('onHoverModifierClass');

        /* get references to other elements */
        const targetElem = document.getElementById(onHoverTargetElemId);

        /* construct self */
        this.onmouseenter = () => {
          if(!targetElem.classList.contains(onHoverModifierClass)){
            targetElem.classList.add(onHoverModifierClass);
          }
        }

        this.onmouseleave = () => {
          if(targetElem.classList.contains(onHoverModifierClass)){
            targetElem.classList.remove(onHoverModifierClass)
          }
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

customElements.define('c-link--see-more', class extends HTMLElement {
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
