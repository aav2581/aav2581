const slider = document.querySelector('.swiper-container');

let mySwiper = new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
     navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        800: {
            slidesPerView: 2,
            centeredSlides: false,
            spaceBetween: 25,
        },
        1025: {
            slidesPerView: 3,
            centeredSlides: true,
            loop: true,
        },
    },
    
});
