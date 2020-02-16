'use strict';
customElements.define('nav-overlay-card',
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      document.addEventListener("DOMContentLoaded", (event) => {
        /* public interface */
        const targetId = this.getAttribute('targetElemId');
        const modifierClass = this.getAttribute('modifierClass');

        /* get references to other elements */
        const targetElem = document.getElementById(targetId);

        /* construct self */
        this.setAttribute('class', 'nav-overlay-card');
        this.textContent = 'test';

        this.onmouseenter = () => {
          if(!targetElem.classList.contains(modifierClass)){
            targetElem.classList.add(modifierClass);
          }
        }

        this.onmouseleave = () => {
          if(targetElem.classList.contains(modifierClass)){
            targetElem.classList.remove(modifierClass)
          }
        }

        /* attach self to DOM */
        this.append();
      });
    }
  }
)
