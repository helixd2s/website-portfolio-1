import Swiper, { Navigation, Pagination } from 'swiper';

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
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.header .swiper-scrollbar',
  },
});


//
const reading = new Swiper('.reading .swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  modules: [Navigation, Pagination],

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
  modules: [Navigation, Pagination],
  slidesPerView: 2,
  spaceBetween: 64,

  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },

  // If we need pagination
  pagination: {
    el: '.customers .swiper-pagination',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.customers .swiper-scrollbar',
  },
});