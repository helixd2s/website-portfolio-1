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
    el: '.swiper-pagination',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
