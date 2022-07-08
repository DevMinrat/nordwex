document.addEventListener("DOMContentLoaded", () => {
  //= ../../../node_modules/swiper/swiper-bundle.js
  //= components/

  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs =
        typeof target === "string" ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll(".tabs-btn");
      this._elPanes = this._elTabs.querySelectorAll(".tabs-pane");
      this._eventShow = new Event("tab.itc.change");
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute("role", "tablist");
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute("role", "tab");
        this._elPanes[index].setAttribute("role", "tabpanel");
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector(".tabs-btn_active");
      const elPaneShow = this._elTabs.querySelector(".tabs-pane_show");
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove("tabs-btn_active") : null;
      elPaneShow ? elPaneShow.classList.remove("tabs-pane_show") : null;
      elLinkTarget.classList.add("tabs-btn_active");
      elPaneTarget.classList.add("tabs-pane_show");
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    }
    _events() {
      this._elTabs.addEventListener("click", (e) => {
        const target = e.target.closest(".tabs-btn");
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  if (document.querySelector(".popular")) {
    new ItcTabs(".popular");
  }

  if (document.querySelector(".product-info")) {
    new ItcTabs(".product-info");
  }

  // prdouct navs

  const productNavs = document.querySelector(".product-info__navs");
  const initPosElem =
    productNavs && productNavs.getBoundingClientRect().top + window.pageYOffset;

  const productNavslinks = document.querySelectorAll(".product-info__navs-btn"),
    productSections = document.querySelectorAll(".product-section");

  function fixedProductNavs() {
    let curPosElem = productNavs.getBoundingClientRect().top;

    if (curPosElem <= 0 && initPosElem < window.pageYOffset) {
      productNavs.classList.add("fixed");
    } else if (initPosElem >= window.pageYOffset) {
      productNavs.classList.remove("fixed");
    }
  }
  if (productNavs) {
    fixedProductNavs();
  }

  function setProdActiveNavEl() {
    let scrollDistance = window.scrollY;

    productSections.forEach((el, index) => {
      if (scrollDistance >= el.offsetTop - 250) {
        productNavslinks.forEach((elem) => {
          if (elem.classList.contains("active")) {
            elem.classList.remove("active");
          }
        });

        productNavslinks[index].classList.add("active");
      } else if (scrollDistance < 300) {
        productNavslinks[index].classList.remove("active");
      }
    });
  }

  // product accordion

  const prodAccTitle = document.querySelectorAll(".product-section__heading"),
    prodAccContent = document.querySelectorAll(".product-section__content");

  if (prodAccTitle.length > 0) {
    for (let i = 0; i < prodAccTitle.length; i++) {
      prodAccContent[0].style.maxHeight = prodAccContent[0].scrollHeight + "px";
      prodAccTitle[0].classList.add("active");

      prodAccTitle[i].addEventListener("click", function () {
        this.classList.toggle("active");

        let panel = prodAccContent[i];

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  // catalog & filter

  const filterPrices = document.querySelectorAll(".filter-price__input");

  filterPrices.forEach((el) => {
    el.addEventListener("input", () => {
      el.value = el.value.replace(/[^0-9]/g, "");
      el.value = Number(el.value).toLocaleString();
    });
  });

  const filterTitle = document.querySelectorAll(".filter-item__heading"),
    filterItemContent = document.querySelectorAll(".filter-item__content");

  if (filterTitle.length > 0) {
    for (let i = 0; i < filterTitle.length; i++) {
      filterItemContent[0].style.maxHeight =
        filterItemContent[0].scrollHeight + "px";
      filterTitle[0].classList.add("active");

      filterTitle[i].addEventListener("click", function () {
        this.classList.toggle("active");

        let panel = filterItemContent[i];

        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  const catalogHorBtn = document.getElementById("catalog-hor");
  const catalogVertBtn = document.getElementById("catalog-vert");
  const catalogContent = document.querySelector(".catalog-content");

  const filterHeading = document.querySelector(".filter-heading");
  const filterContent = document.querySelector(".filter__content");

  if (catalogContent) {
    catalogHorBtn.addEventListener("click", function () {
      catalogContent.classList.add("horizontal");

      this.classList.add("active");
      catalogVertBtn.classList.remove("active");
    });

    catalogVertBtn.addEventListener("click", function () {
      catalogContent.classList.remove("horizontal");

      this.classList.add("active");
      catalogHorBtn.classList.remove("active");
    });

    filterHeading.addEventListener("click", () => {
      filterHeading.classList.toggle("active");

      filterContent.classList.toggle("active");
    });
  }

  // throttleScroll

  let isScrolling = false;

  window.addEventListener("scroll", throttleScroll, false);

  function throttleScroll(e) {
    if (isScrolling == false) {
      window.requestAnimationFrame(function () {
        if (productNavs) {
          fixedProductNavs();
          setProdActiveNavEl();
        }
        isScrolling = false;
      });
    }
    isScrolling = true;
  }
});


//headerMobile scroll

const header = document.querySelector(".headerMob");
let lastScroll = 0;

const throttle = (func, time = 20) => {
  let lastTime = 0;
  return () => {
    const now = new Date();
    if (now - lastTime >= time) {
      func();
      time = now;
    }
  };
};

const validateHeader = () => {
  const windowY = window.scrollY;
  const windowH = 108;
  if (windowY > windowH) {
    header.classList.add("is-fixed");
    if (windowY > windowH + 40) {
      header.classList.add("can-animate");
      if (windowY < lastScroll) {
        header.classList.add("scroll-up");
      } else {
        header.classList.remove("scroll-up");
      }
    } else {
      header.classList.remove("scroll-up");
    }
  } else {
    header.classList.remove("is-fixed", "can-animate");
  }
  lastScroll = windowY;
};

window.addEventListener("scroll", throttle(validateHeader, 20));


//header desctop scroll

const headerDesctop = document.querySelector(".slickyContainer");
let lastScrollDesctop = 0;

const throttleFunction = (func, time = 20) => {
  let lastTime = 0;
  return () => {
    const now = new Date();
    if (now - lastTime >= time) {
      func();
      time = now;
    }
  };
};

const validateHeaderFunction = () => {
  const windowY = window.scrollY;
  const windowH = 430;
  if (windowY > windowH) {
    headerDesctop.classList.add("is-fixed");
    if (windowY > windowH + 40) {
      headerDesctop.classList.add("can-animate");
      if (windowY < lastScrollDesctop) {
        headerDesctop.classList.add("scroll-up");
      } else {
        headerDesctop.classList.remove("scroll-up");
      }
    } else {
      headerDesctop.classList.remove("scroll-up");
    }
  } else {
    headerDesctop.classList.remove("is-fixed", "can-animate");
  }
  lastScrollDesctop = windowY;
};

window.addEventListener("scroll", throttleFunction(validateHeaderFunction, 20));


//brandsSecondLevel tabs 

const tabsBtn = document.querySelectorAll(".controlTitle");
const tabsItems = document.querySelectorAll(".radioCotainer")

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener('click', function() {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);

    if( !currentBtn.classList.contains('activeTabBtn')) {
      tabsBtn.forEach(function(item) {
        item.classList.remove('activeTabBtn')
      })
  
      tabsItems.forEach(function(item) {
        item.classList.remove('radioContainerActive')
      })
  
      currentBtn.classList.add('activeTabBtn')
      currentTab.classList.add('radioContainerActive')
    }
  })
}

document.querySelector('.controlTitle').click();



