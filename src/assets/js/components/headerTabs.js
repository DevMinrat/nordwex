// menuTabs


const menuTabsBtn = document.querySelectorAll(".menuControlTitle");
const menuTabsItems = document.querySelectorAll(".menuContentContainer");

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





const menuTabsBtn2 = document.querySelectorAll(".menuControlTitle2");
const menuTabsItems2 = document.querySelectorAll(".menuContentContainer2");

menuTabsBtn2.forEach(menuOnTabClick2);

function menuOnTabClick2(item) {
  item.addEventListener('click', function() {
    let menuCurrentBtn = item;
    let menuTabId = menuCurrentBtn.getAttribute("data-tab")

    let menuCurrentTab = document.querySelector(menuTabId)

    if( !menuCurrentBtn.classList.contains('activeMenuTabBtn') ) {
      menuTabsBtn2.forEach(function(item) {
        item.classList.remove('activeMenuTabBtn')
      })
  
      menuTabsItems2.forEach(function(item) {
        item.classList.remove('contentActive')
      })
  
      menuCurrentBtn.classList.add('activeMenuTabBtn');
  
      menuCurrentTab.classList.add('contentActive')
    }

  });
}

document.querySelector('.menuControlTitle2').click();





const changeTabsBtn2 = document.querySelectorAll(".changeCategory2");
const menuTabs2 = document.querySelectorAll(".menuTabs2");

changeTabsBtn2.forEach(changeOnTabClick2);

function changeOnTabClick2(item) {
  item.addEventListener('click', function() {
    let changeCurrentBtn = item;
    let changeTabId = changeCurrentBtn.getAttribute("data-tab")

    let changeCurrentTab = document.querySelector(changeTabId)

    if( !changeCurrentBtn.classList.contains('changeCategoryActive') ) {
      changeTabsBtn2.forEach(function(item) {
        item.classList.remove('changeCategoryActive')
      })
  
      menuTabs2.forEach(function(item) {
        item.classList.remove('menuTabsActive')
      })
  
      changeCurrentBtn.classList.add('changeCategoryActive');
  
      changeCurrentTab.classList.add('menuTabsActive')
    }

  });
}

document.querySelector('.changeCategory2').click();