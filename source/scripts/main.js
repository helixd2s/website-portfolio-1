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