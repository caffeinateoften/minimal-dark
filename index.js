'use strict';
document.addEventListener("DOMContentLoaded", function(event) {
  //feature_OpenOverlayCardWhenNavButtonIsHovered();
  //feature_DimContentWhenOverlayCardIsOpen();
});

function feature_OpenOverlayCardWhenNavButtonIsHovered() {
  const btn = document.querySelector('#nav-menu-button');
  const navCard = document.querySelector('#nav-card');
  const OPEN_CLASS_NAME = 'nav-overlay-card--is-open';
  btn.onmouseover = () => { addClass(OPEN_CLASS_NAME, navCard); };
  navCard.onmouseleave = () => { removeClass(OPEN_CLASS_NAME, navCard); };
}

function feature_DimContentWhenOverlayCardIsOpen(){
  const OPEN_CLASS_NAME = 'nav-overlay-card--is-open';
  const DIM_CLASS_NAME = 'overlay--dim';
  const content = document.querySelector('.layout-content');
  const navCard = document.querySelector('#nav-card')
  const navCardObserver = new MutationObserver((mutations) => {
    for(var i=0; i<mutations.length; i++){
      const mutation = mutations[i];
      if(mutation.attributeName === 'class'){
        if(mutation.target.classList.contains(OPEN_CLASS_NAME)){
          addClass(DIM_CLASS_NAME, content)
        }
        else {
          removeClass(DIM_CLASS_NAME, content);
        }
      }
    }
  });
  navCardObserver.observe(navCard, { attributes: true, childList: true, subtree: true });
}

function addClass(className, elem){
  if(!elem.classList.contains(className)){
    elem.classList.add(className)
  }
}

function removeClass(className, elem){
  if(elem.classList.contains(className)){
    elem.classList.remove(className);
  }
}
