'use strict';
customElements.define('button--dropdown',
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
        this.setAttribute('class', 'btn btn--dropdown');
        this.textContent = 'Menu';
        this.addEventListener('mouseover', () => {
          if (!targetElem.classList.contains(modifierClass)) {
            targetElem.classList.add(modifierClass);
          }
        });
        targetElem.addEventListener('mouseleave', () => {
          if(targetElem.classList.contains(modifierClass)){
            targetElem.classList.remove(modifierClass)
          }
        })

        /* attach self to DOM */
        this.append();
      });
    }
  }
)
