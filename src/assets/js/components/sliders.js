// intro slider

// intro slider

let introFractCurrent = document.querySelector(".intro-fraction-current");
let introFractTotal = document.querySelector(".intro-fraction-total");
let introSlidesAmount = document.querySelectorAll(
  ".intro-slider__slide"
).length;

let introSlider = new Swiper(".intro-slider", {
  slidesPerView: 1,
  loop: true,
  loopedSlides: 0,

  pagination: {
    el: ".intro-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".slider-button-next",
    prevEl: ".slider-button-prev",
  },
});

introSlider.on("slideChange", function () {
  setIntroFraction(
    introFractCurrent,
    introFractTotal,
    introSlidesAmount,
    introSlider.realIndex
  );
});

function setIntroFraction(curEl, totalEl, slidesAmount, currentSlide) {
  totalEl.innerText = String(slidesAmount).padStart(2, "0");
  curEl.innerText = String(currentSlide + 1).padStart(2, "0");
}

if (introFractCurrent) {
  setIntroFraction(
    introFractCurrent,
    introFractTotal,
    introSlidesAmount,
    introSlider.realIndex
  );
}

//producers slider

let prodThumbsAmount =
  document.querySelectorAll(".prod-thumb__item").length - 1;
let prodMainAmount = document.querySelectorAll(".prod-main__item").length - 1;

let prodSliderThumbs = new Swiper(".producers-slider-thumbs", {
  spaceBetween: 90,
  centeredSlides: true,
  slidesPerView: "auto",
  slideToClickedSlide: true,
  touchRatio: 0.2,
  loop: true,
  loopedSlides: prodThumbsAmount,
  breakpoints: {
    320: {
      spaceBetween: 15,
    },
    500: {
      spaceBetween: 90,
    },
  },
});
let prodSliderMain = new Swiper(".producers-slider-main", {
  loop: true,
  loopedSlides: prodMainAmount,
  navigation: {
    nextEl: ".slider-button-next",
    prevEl: ".slider-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

prodSliderMain.controller.control = prodSliderThumbs;
prodSliderThumbs.controller.control = prodSliderMain;

// popular slider

let popSliders = document.querySelectorAll(".popular-tab__slider");

popSliders.forEach((el) => {
  new Swiper(el, {
    spaceBetween: 21,
    slidesPerView: 4,
    navigation: {
      nextEl: ".slider-button-next",
      prevEl: ".slider-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.7,
      },
      500: {
        slidesPerView: 3,
      },
      921: {
        slidesPerView: 4,
      },
    },
  });
});

// clients slider

let clientsThumbsAmount =
  document.querySelectorAll(".clients-thumb__item").length - 1;
let clientsMainAmount =
  document.querySelectorAll(".clients-main__item").length - 1;

let clientsSliderThumbs = new Swiper(".clients-slider-thumbs", {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: "auto",
  slideToClickedSlide: true,
  touchRatio: 0.2,
  loop: true,
  loopedSlides: prodThumbsAmount,
  breakpoints: {
    320: {
      spaceBetween: 21,
    },
    921: {
      spaceBetween: 10,
    },
  },
});
let clientsSliderMain = new Swiper(".clients-slider-main", {
  loop: true,
  loopedSlides: prodMainAmount,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      spaceBetween: 10,
    },
    921: {
      spaceBetween: 0,
    },
  },
});

clientsSliderMain.controller.control = clientsSliderThumbs;
clientsSliderThumbs.controller.control = clientsSliderMain;

let aboutBlogSlider = new Swiper(".about-blog__slider", {
  direction: "vertical",
  slidesPerView: 3.4,
  mousewheel: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      spaceBetween: 20,
      direction: "horizontal",
      slidesPerView: 1,
      mousewheel: false,
    },
    501: {
      spaceBetween: 0,
      mousewheel: true,
      slidesPerView: 3.4,
      direction: "vertical",
    },
    921: {
      slidesPerView: 3.4,
    },
  },
});

// product slider

let productSliderThumbs = new Swiper(".product-slider-thumbs", {
  slidesPerView: 6,
  spaceBetween: 24,
  slideToClickedSlide: true,
  touchRatio: 0.2,
  breakpoints: {
    320: {
      slidesPerView: "auto",
      spaceBetween: 8,
    },
    500: {
      spaceBetween: 24,
    },
  },
});

let productSliderMain = new Swiper(".product-slider-main", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  slidesPerView: 1,

  thumbs: {
    swiper: productSliderThumbs,
  },
});

//accessories slider

let accessoriesSlider = new Swiper(".product-acc__slider", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".slider-button-next",
    prevEl: ".slider-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },

  breakpoints: {
    320: {
      slidesPerView: 1.3,
      spaceBetween: 16,
      pagination: {
        type: "bullets",
      },
    },
    501: {
      slidesPerView: 3,
      spaceBetween: 20,
      pagination: {
        type: "bullets",
      },
    },
    920: {
      slidesPerView: 4,
      pagination: {
        type: "fraction",
      },
    },
  },
});

//about page benefits slider

let apBenefitsSlider = new Swiper(".aboutPage-benefits", {
  slidesPerView: "auto",
  spaceBetween: 0,
  freeMode: true,
  grabCursor: true,
});


//article slider

const articleSlider = new Swiper(".mySwiper", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".arrowNext",
    prevEl: ".arrowPrev",
  },
});

//article slider mobile

const articleSliderMobile = new Swiper(".mySwiperMobile", {

  pagination: {
    el: ".swiper-pagination",
    type: 'bullets',
    clickable: true,
  }, 
  
});

// brands slider

const brandsSwiper = new Swiper(".brandsSwiper", {
  slidesPerView: 8,
  loop: true,
  navigation: {
    nextEl: '.arrowNextcontainer',
    prevEl: '.arrowPrevContainer',
  },
});
