import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', function() {

    function menu() {
        const openMenuBtn = document.querySelector('.header__burger');
        const closeMenuBtn = document.querySelector('.menu-container__close-btn');
        const menuContainer = document.querySelector('.menu-container');

        function openMenu() {
            document.body.style.overflow = 'hidden';
            closeMenuBtn.classList.remove('display-none');
            menuContainer.classList.add('menu-container--active');
        }

        function closeMenu() {
            closeMenuBtn.classList.add('display-none');
            document.body.style.overflow = 'auto';
            menuContainer.classList.remove('menu-container--active');
        }

        openMenuBtn.addEventListener('click', openMenu);
        closeMenuBtn.addEventListener('click', closeMenu);
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        })
    }

    menu();

    function kittenSwiper() {
        const kittenswiper = new Swiper('.kittens__swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            slidesPerView: 1,
            spaceBetween: 10,
            
            breakpoints: {
                550: {
                    slidesPerView: 2,
                },

                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                },
                1140:{
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                }
            }
        })
    }

    kittenSwiper();

    function aboutYear() {
        if (document.contains(document.querySelector('.about__year'))) {
            const yearSpan = document.querySelector('.about__year');
            let todayData = new Date();
            let todayYear = todayData.getFullYear();
            const startYeaer = 2013;

            let year = todayYear - startYeaer;
            yearSpan.innerHTML = year;
        }
    }

    aboutYear();

    function chooseThItem() {
        if (document.contains(document.querySelector('.th-main'))) {
            let allItems = document.querySelectorAll('.th-main__item');
            let arrItems = Array.from(allItems);
            
            for (let i = 0; i < arrItems.length; i++) {
                arrItems[i].addEventListener('click', () => {
                    arrItems[i].classList.toggle('th-main__item--active');
                })
            }
        }
    }

    chooseThItem();

    function findHomeSlider() {
        const swiper = new Swiper('.fh-cards-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            slidesPerView: 1,
            spaceBetween: 10,
            autoHeight: 'auto',
            centeredSlides: true,
            centeredSlidesBounds: true,

            breakpoints: {
               
                500: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
           
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
            
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 40
                }
            }
        });
    }

    findHomeSlider();
});