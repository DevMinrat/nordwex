// menuTabs


const menuTabsBtn = document.querySelectorAll(".menuControlTitle");
const menuTabsItems = document.querySelectorAll(".menuContentContainer");
const headerButton = document.querySelector('.headerButton')
console.log(headerButton)
const menuContainer = document.querySelector('.menuContainer')


headerButton.addEventListener('click', function () {
  menuContainer.classList.toggle('menuContainerActive')
})

if (menuTabsBtn.length > 0 && menuTabsItems.length > 0 && window.matchMedia("(min-width: 920px)").matches) {


  menuTabsBtn.forEach(menuOnTabClick);

  function menuOnTabClick(item) {
    item.addEventListener('click', function() {
      let menuCurrentBtn = item;
      let menuTabId = menuCurrentBtn.getAttribute("data-tab")
  
      let menuCurrentTab = document.querySelector(menuTabId)
  
      if( !menuCurrentBtn.classList.contains('activeMenuTabBtn') ) {
        menuTabsBtn.forEach(function(item) {
          item.classList.remove('activeMenuTabBtn')
        })
    
        menuTabsItems.forEach(function(item) {
          item.classList.remove('contentActive')
        })
    
        menuCurrentBtn.classList.add('activeMenuTabBtn');
    
        menuCurrentTab.classList.add('contentActive')
      }
  
    });
  }
  
  document.querySelector('.menuControlTitle').click();
  
  const changeTabsBtn = document.querySelectorAll(".changeCategory");
  const menuTabs = document.querySelectorAll(".menuTabs");
  
  
    changeTabsBtn.forEach(changeOnTabClick);
  
  function changeOnTabClick(item) {
    item.addEventListener('click', function() {
      let changeCurrentBtn = item;
      let changeTabId = changeCurrentBtn.getAttribute("data-tab")
  
      let changeCurrentTab = document.querySelector(changeTabId)
  
      if( !changeCurrentBtn.classList.contains('changeCategoryActive') ) {
        changeTabsBtn.forEach(function(item) {
          item.classList.remove('changeCategoryActive')
        })
    
        menuTabs.forEach(function(item) {
          item.classList.remove('menuTabsActive')
        })
    
        changeCurrentBtn.classList.add('changeCategoryActive');
    
        changeCurrentTab.classList.add('menuTabsActive')
      }
  
    });
  }
  
  document.querySelector('.changeCategory').click();
  
  }
 

 



const burgerButton = document.querySelector(".burgerIcon")




if (burgerButton != null) {
  burgerButton.addEventListener('click', function() {
    menuContainer.classList.toggle('menuContainer')
    menuContainer.classList.toggle('mobileMenu')
  })
}

if (window.matchMedia("(max-width: 920px)").matches) {
  const changeTabsBtn = document.querySelectorAll(".changeCategory");
  const menuTabs = document.querySelectorAll(".menuTabs");

  console.log(changeTabsBtn)
  console.log(menuTabs)
  
  
    changeTabsBtn.forEach(changeOnTabClick);
  
  function changeOnTabClick(item) {
    item.addEventListener('click', function() {
      let changeCurrentBtn = item;
      let changeTabId = changeCurrentBtn.getAttribute("data-tab")
  
      let changeCurrentTab = document.querySelector(changeTabId)
  
      if( !changeCurrentBtn.classList.contains('changeCategoryActiveMobile') ) {
        changeTabsBtn.forEach(function(item) {
          item.classList.remove('changeCategoryActiveMobile')
        })
    
        menuTabs.forEach(function(item) {
          item.classList.remove('menuTabsActiveMobile')
        })
    
        changeCurrentBtn.classList.add('changeCategoryActiveMobile');
    
        changeCurrentTab.classList.add('menuTabsActiveMobile')
      }
  
    });
  }
  
  document.querySelector('.changeCategory').click();



  menuTabsBtn.forEach(menuOnTabClick);

  function menuOnTabClick(item) {
    item.addEventListener('click', function() {
      let menuCurrentBtn = item;
      let menuTabId = menuCurrentBtn.getAttribute("data-tab")
  
      let menuCurrentTab = document.querySelector(menuTabId)

      console.log(menuCurrentTab)
  
      if( !menuCurrentBtn.classList.contains('activeMenuTabBtn') ) {
        menuTabsBtn.forEach(function(item) {
          item.classList.remove('activeMenuTabBtn')
        })
    
        menuTabsItems.forEach(function(item) {
          item.classList.remove('contentActiveMobile')
        })
    
        menuCurrentBtn.classList.add('activeMenuTabBtn');
    
        menuCurrentTab.classList.add('contentActiveMobile')
      }
  
    });
  }
  
  document.querySelector('.menuControlTitle').click();




}