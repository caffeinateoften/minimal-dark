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
      anchorTag.appendChild(this.cloneNode(true));
      this.replaceWith(anchorTag);
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
  },

  'c-col': 'default',
  'c-col--vertically-center': 'default',
  'c-row': 'default',
  'c-row--stretch': 'default',
  'c-row--center': 'default',
  'c-row--space-between': 'default',
  'c-row--space-around': 'default',
}
