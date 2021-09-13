import Swiper, { Navigation, Pagination, EffectCreative } from 'swiper';

//
import '../styles/main.scss'
import '../styles/custom.scss'

// swiper bundle styles
import 'swiper/css/bundle'

// swiper core styles
import 'swiper/css'

// modules styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'

//
import asmcss from '@asmcss/assembler';

//
import {CSObserver, PropertyMapper} from 'css-utils-js';
const ComputedStyleObserver = CSObserver.ComputedStyleObserver;

//
//import bootstrap from 'bootstrap'

//
//import '../../node_modules/bootstrap/scss/bootstrap-grid.scss'
//import '../../node_modules/bootstrap/scss/bootstrap-reboot.scss'
//import '../../node_modules/bootstrap/scss/bootstrap-utilities.scss'
//import '../../node_modules/bootstrap/scss/bootstrap.scss'

//
Swiper.use([Navigation, Pagination]);

//
const hero = new Swiper('.hero .swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  modules: [Navigation, Pagination],

  // If we need pagination
  pagination: {
    el: '.hero .swiper-pagination',
  }
});


//
const blog = new Swiper('.blog .swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,
  modules: [Navigation, Pagination],
  spaceBetween: 512,

  navigation: {
    nextEl: ".blog .swiper-button-next",
    prevEl: ".blog .swiper-button-prev",
  },

  // If we need pagination
  pagination: {
    el: '.blog .swiper-pagination',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.blog .swiper-scrollbar',
  },
});

//
const quotes = new Swiper('.quotes .swiper', {
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
    el: '.quotes .swiper-pagination',
  }
});

document.addEventListener("DOMContentLoaded", ()=>{
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

  let mapping = PropertyMapper.updateProperties(".card .avatar", {
    pseudo: "",
    observe: false
  });
});



