import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', function() {

   function accordion() {
       let allHeader = document.querySelectorAll('.accordion__header');
       let header = Array.from(allHeader); 

       for (let i = 0; i !== header.length; i++) {
           header[i].addEventListener('click', () => {
                header[i].nextElementSibling.classList.toggle('accordion__descr--active');
                header[i].firstElementChild.classList.toggle('accordion__header-span--active');
           });

           header[i].addEventListener('keydown', (e) => {
               if (e.key === 'Enter') {
                header[i].nextElementSibling.classList.toggle('accordion__descr--active');
                header[i].firstElementChild.classList.toggle('accordion__header-span--active');
               }
           })
       }
   }

   function menu() {
       const btn = document.querySelector('.header__btn');
       const nav = document.querySelector('.header__nav-list');

       btn.addEventListener('click', () => {
           nav.classList.toggle('header__nav-list--active');
           btn.classList.toggle('header__btn--close');
       })

       btn.addEventListener('keyup', (e) => {

           if (e.key === 'Enter') {
                nav.classList.add('header__nav-list--active');
                btn.classList.add('header__btn--close');
           }

           if (e.key === 'Escape') {
                nav.classList.remove('header__nav-list--active');
                btn.classList.remove('header__btn--close');
           }
       })
   }

   menu();

   function partnersSlide() {
        const swiper = new Swiper('.partners__swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 20,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 17
                },

                488: {
                    slidesPerView: 3,
                    spaceBetween: 17
                },

                375: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                }
            }
        });
   }

   partnersSlide();
   accordion();

  function goToAnchors() {
      let anchors = document.querySelectorAll('.header__nav-link');
      let anchorsArr = Array.from(anchors);

      for (let i = 0; i < anchorsArr.length; i++) {
          anchorsArr[i].addEventListener('click', (e) => {
            e.preventDefault();
            let nameId = anchorsArr[i].getAttribute('href');
            // console.log(nameId);

            document.querySelector(nameId).scrollIntoView({block: "center", behavior: "smooth"});
          })
      }
  }

  goToAnchors();
});