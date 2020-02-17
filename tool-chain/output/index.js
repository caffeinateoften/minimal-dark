
customElements.define('c-nav-primary', class extends HTMLElement {
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

customElements.define('c-btn', class extends HTMLElement {
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

customElements.define('c-nav-overlay-card', class extends HTMLElement {
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

customElements.define('c-nav-overlay-card--is-open', class extends HTMLElement {
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

customElements.define('c-overlay--dim', class extends HTMLElement {
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

customElements.define('c-btn--rect', class extends HTMLElement {
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

customElements.define('c-menu', class extends HTMLElement {
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

customElements.define('c-menu--vertical', class extends HTMLElement {
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

customElements.define('c-link', class extends HTMLElement {
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

customElements.define('c-link--basic', class extends HTMLElement {
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
  