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


// let headerMobile = document.querySelector(".headerMobileFixed"),
// 	scrollPrev = 500;
//   console.log(scrollPrev)

// window.addEventListener("scroll", () => {
//   let scrolled = document.documentElement.scrollTop;

//   console.log(scrolled)
 
// 	if (scrolled == 0 || scrolled > scrollPrev ) {
// 		headerMobile.classList.add('out');
// 	} else {
// 		headerMobile.classList.remove('out');
// 	}
// 	scrollPrev = scrolled;
// });


// let stickyHeader = document.querySelector('.headerMobile')
// let offset = stickyHeader.offsetTop
// offset = 108
// console.log(stickyHeader)
// window.addEventListener("scroll", () => {
//   let scrolled = document.documentElement.scrollTop;

// console.log(scrolled, 'asfsf')



//   if (scrolled > offset) {
//     stickyHeader.classList.add('out');
//   } else if (scrolled < offset) {
//     stickyHeader.classList.remove('out');
//   }

// })



// let scrolled1 = window.scrollY;

// console.log(window.scrollY, 'asfsf')


const hideNav = () => {
  const hiddenNavClassName = 'navigation__hidden';
  const fixedNavClassName = 'navigation__fixed';
  const headerHeight = 108;
  const navHeight = 0;
  let initialYvalue = window.scrollY;
  let body = document.querySelector('body');
  // console.log(body)
  let main = document.querySelector('main')
  // main.style.paddingTop = '10.8rem'

  let isItHidden = false;
  let isItFixed = false;

  window.addEventListener('scroll', (ev) => {
      const scrollY = window.scrollY;
      if (scrollY > headerHeight) {
          makeItFixed();

          if (scrollY > headerHeight + navHeight && scrollY > initialYvalue) {
              hide();
          } else {
              show();
          }
      } else {
          makeItNotFixed();
      }

      initialYvalue = scrollY;
  });

  function hide() {
      if (!isItHidden) {
          body.classList.add(hiddenNavClassName);
          isItHidden = true;
      }
  }

  function show() {
      if (isItHidden) {
          body.classList.remove(hiddenNavClassName);
          isItHidden = false;
      }
  }

  function makeItFixed() {
      if (!isItFixed) {
          body.classList.add(fixedNavClassName);
          isItFixed = true;
      }
  }

  function makeItNotFixed() {
      if (isItFixed) {
          body.classList.remove(fixedNavClassName);
          isItFixed = false;
      }
  }
}

hideNav()



