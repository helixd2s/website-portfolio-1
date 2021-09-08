import Swiper, { Navigation, Pagination, EffectCreative } from 'swiper';

//
import '../styles/main.scss'

// swiper bundle styles
import 'swiper/css/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'

//
Swiper.use([Navigation, Pagination]);

//
const header = new Swiper('.header .swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  modules: [Navigation, Pagination],

  // If we need pagination
  pagination: {
    el: '.header .swiper-pagination',
  }
});


//
const reading = new Swiper('.reading .swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  modules: [Navigation, Pagination],
  spaceBetween: 512,

  navigation: {
    nextEl: ".reading .swiper-button-next",
    prevEl: ".reading .swiper-button-prev",
  },

  // If we need pagination
  pagination: {
    el: '.reading .swiper-pagination',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.reading .swiper-scrollbar',
  },
});

//
const customers = new Swiper('.customers .swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  modules: [Navigation, Pagination, EffectCreative],
  slidesPerView: 1,
  spaceBetween: 64,

  effect: "creative",
  creativeEffect: {
    prev: {
      opacity: 0,
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["calc(100% + 64px)", 0, 0],
      opacity: 0.6
    },
  },

  // If we need pagination
  pagination: {
    el: '.customers .swiper-pagination',
  }
});


let elements = document.querySelectorAll(".faq details");
for (let el of elements) {
  el.querySelector("summary").addEventListener("click", function () {
    let parent = this.parentNode;
    for (let el of elements) {
      if (el != parent) { el.open = false; };
      parent.open = parent.open ? false : true;
    };
  });
}