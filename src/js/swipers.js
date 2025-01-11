import Swiper from "swiper/bundle";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";

let sliders = document.querySelectorAll("._swiper");
if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];
    if (!slider.classList.contains("swiper-build")) {
      let slider_items = slider.children;
      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index];
          el.classList.add("swiper-slide");
        }
      }
      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement("div");
      slider_wrapper.classList.add("swiper-wrapper");
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = "";
      slider.appendChild(slider_wrapper);
      slider.classList.add("swiper-bild");
    }
    if (slider.classList.contains("._gallery")) {
    }
  }
  slider_bild_callback();
}

let sliderScrollItems = document.querySelectorAll(".swiper_scroll");
if (sliderScrollItems.length > 0) {
  for (let index = 0; index < sliderScrollItems.length; index++) {
    const sliderScrollItem = sliderScrollItems[index];
    const sliderScrollBar =
      sliderScrollItems.querySelector(".swiper-scrollbar");
    const sliderScroll = new Swiper(sliderScrollItem, {
      observer: true,
      observeParents: true,
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false,
      },
      mousewheel: {
        releaseOnEdges: true,
      },
    });
    sliderScroll.scrollbar.updateSize();
  }
}

function slider_bild_callback(params) {}

if (document.querySelector(".slider-main__body")) {
  new Swiper(".slider-main__body", {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    // loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    // allowTouchMove: false,
    modules: [Navigation, Pagination],
    pagination: {
      el: ".controls-slider-main__dots",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-main .slider-arrow_next",
      prevEl: ".slider-main .slider-arrow_prev",
    },
    on: {
      lazyImageReady: function () {
        ibg();
      },
    },
  });
}

if (document.querySelector(".slider-rooms__body")) {
  new Swiper(".slider-rooms__body", {
    observer: true,
    observeParents: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    watchOverflow: true,
    speed: 800,
    loop: true,
    // loopAdditionalSlides: 5,
    preloadImages: false,
    parallax: true,
    // allowTouchMove: false,
    modules: [Navigation, Pagination],
    pagination: {
      el: ".slider-rooms__dots",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-rooms .slider-arrow_next",
      prevEl: ".slider-rooms .slider-arrow_prev",
    },
    on: {
      lazyImageReady: function () {
        ibg();
      },
    },
  });
}

if (document.querySelector(".slider-tips__body")) {
  new Swiper(".slider-tips__body", {
    observer: true,
    observeParents: true,
    // slidesPerView: 3,
    // spaceBetween: 33,
    watchOverflow: true,
    speed: 800,
    loop: true,
    // loopAdditionalSlides: 5,
    // preloadImages: false,
    // parallax: true,
    // allowTouchMove: false,
    modules: [Navigation, Pagination],
    pagination: {
      el: ".slider-tips__dots",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-tips .slider-arrow_next",
      prevEl: ".slider-tips .slider-arrow_prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 33,
      },
    },
    on: {
      lazyImageReady: function () {
        ibg();
      },
    },
  });
}

// let main_slider = new Swiper(".main-slider__body", {
//   observer: true,
//   observeParents: true,
//   slidesPerView: 1,
//   spaceBetween: 0,
//   autoHeight: false,
//   speed: 800,
//   loop: true,
//   modules: [Navigation, Pagination],
//   navigation: {
//     nextEl: ".control-main-slider__arrow_next",
//     prevEl: ".control-main-slider__arrow_prev",
//   },
//   //   breakpoints: {
//   //     320: {
//   //       autoHeight: true,
//   //     },
//   //     768: {
//   //       autoHeight: false,
//   //     },
//   //   },
//   on: {
//     lazyImageReady: function () {
//       ibg();
//     },
//   },
// });
