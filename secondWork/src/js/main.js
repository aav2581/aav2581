import Choices from 'choices.js';
import { Datepicker } from 'vanillajs-datepicker';
import ru from '../../node_modules/vanillajs-datepicker/js/i18n/locales/ru.js';
import Swiper, { Navigation, } from 'swiper';
import Inputmask, { remove } from 'inputmask';

Object.assign(Datepicker.locales, ru);
Swiper.use([Navigation,]);

document.addEventListener('DOMContentLoaded', function() {

  const openMenuButton = document.querySelector('.header__burger');
  const closeMenuButton = document.querySelector('.header__close-button');
  const menuWrapper = document.querySelector('.header-wrapper');

  function closeMenu() {
    menuWrapper.classList.add('display-none');
    openMenuButton.classList.remove('display-none');
    document.body.style.overflow = 'auto';
  }

  function openMenu() {
    openMenuButton.classList.add('display-none');
    menuWrapper.classList.remove('display-none');
    document.body.style.overflow = 'hidden';
  }

  openMenuButton.addEventListener('click', openMenu);

  closeMenuButton.addEventListener('click', closeMenu);
  
  menuWrapper.addEventListener('click', function(e) {
    if (e.target == menuWrapper) {
      closeMenu();
    }
  });
  
  function countriesSelect() {

    const element = document.querySelector('.select-countries');
    const choices = new Choices(element, {
      searchEnabled: false,
      placeholder: true,
      placeholderValue: 'Страны',
      itemSelectText: '',
      group: 'choices__heading',
      groupHeading: 'select-countries__continent',
      shouldSort: false,
    });
  }

  function selectTrip() {
  
    const element = document.querySelector('.select-trip');
    const choices = new Choices(element, {
      searchEnabled: false,
      placeholder: true,
      placeholderValue: 'Тип путешествия',
      itemSelectText: '',
      shouldSort: false,
    });
  }

 function datePicker() {
  const elem = document.querySelector('.header-form__data');
  const datepicker = new Datepicker(elem, {
    autohide: true,
    maxNumberOfDates: 2,
    dateDelimiter: ' - ',
    orientation: 'bottom, left',
    title: 'Выберите дату не позднее которой хотите вернуться',
    language: 'ru',
    nextArrow: '>',
    prevArrow: '<',
  });  
}
 
  datePicker();
  countriesSelect();
  selectTrip();


 const popularTourSlider = new Swiper('.popular-tours__container', {
  navigation: {
    nextEl: '.popular-tours__button-next',
    prevEl: '.popular-tours__button-prev',
  },
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 27,
  
  breakpoints: {
    768: {
      slidesPerView: 2,
      loop: true,
      centeredSlides: false,
    }
  }
 });

 function showNextCard() {

  let lastMinuteTourCards = document.querySelectorAll('.last-minute-card');
  let arrLastTours = Array.from(lastMinuteTourCards);
  const showMoreBtn = document.querySelector('.last-minute-tour__button');
  let firstThree = 3;
  showMoreBtn.removeAttribute('disabled');

  showMoreBtn.addEventListener('click', function() {
    if (firstThree == (arrLastTours.length - 1)) {
      showMoreBtn.setAttribute('disabled', true);
    }
    arrLastTours[firstThree].classList.remove('display-none');
    firstThree += 1;
  })
}

function filtredSlide() {
  let lastMinuteTourCards = document.querySelectorAll('.last-minute-card');
  let arrLastTours = Array.from(lastMinuteTourCards);
  let spainBtn = document.querySelector('.spain-btn');
  let italyBtn = document.querySelector('.italy-btn');
  let icelandBtn = document.querySelector('.iceland-btn');
  let turkeyBtn = document.querySelector('.turkey-btn');

  spainBtn.addEventListener('click', () => {

    for (let i = 0; i != arrLastTours.length; i++) {
      if (arrLastTours[i].classList.contains('spain-card')) {
        arrLastTours[i].classList.toggle('display-none');
      }
    }

    spainBtn.classList.toggle('filtred-button--disactive');
    spainBtn.classList.toggle('filtred-button--active');

  });

  italyBtn.addEventListener('click', () => {

    for (let i = 0; i != arrLastTours.length; i++) {
      if (arrLastTours[i].classList.contains('italy-card')) {
        arrLastTours[i].classList.toggle('display-none');
      }
    }

    italyBtn.classList.toggle('filtred-button--disactive');

  });

  icelandBtn.addEventListener('click', () => {

    for (let i = 0; i != arrLastTours.length; i++) {
      if (arrLastTours[i].classList.contains('iceland-card')) {
        arrLastTours[i].classList.toggle('display-none');
      }
    }

    icelandBtn.classList.toggle('filtred-button--disactive');

  });

  turkeyBtn.addEventListener('click', () => {

    for (let i = 0; i != arrLastTours.length; i++) {
      if (arrLastTours[i].classList.contains('turkey-card')) {
        arrLastTours[i].classList.toggle('display-none');
      }
    }

    turkeyBtn.classList.toggle('filtred-button--disactive');

  });

}

  const lastMinuteTour = document.querySelector('.last-minute-tour__container');
  let lastMinutSlider;

  function desctopSlider() {

    if (window.innerWidth >= 768 && lastMinuteTour.dataset.mobile == 'false') {
      lastMinutSlider = new Swiper('.last-minute-tour__container', {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 20,
        centeredSlidesBounds: true,
        observer: true,
        navigation: {
          nextEl: '.last-minute-tour__button-next',
          prevEl: '.last-minute-tour__button-prev',
        },
      })
      lastMinuteTour.dataset.mobile == 'true';

      for (let i = 0; i != (Array.from(document.querySelectorAll('.last-minute-card'))).length; i++) {
        if(Array.from(document.querySelectorAll('.last-minute-card'))[i].classList.contains('display-none')) {
          Array.from(document.querySelectorAll('.last-minute-card'))[i].classList.remove('display-none');
        }
      }    

      filtredSlide();

    }

    if (window.innerWidth < 768) {
      lastMinuteTour.dataset.mobile = 'false';
      showNextCard();

      if (lastMinuteTour.classList.contains('swiper-container-initialized')) {
        lastMinutSlider.destroy();
      }
    }
  }

  desctopSlider();

  window.addEventListener('resize', function() {
    desctopSlider();
  });

  

  function modal() {
    let openBtn = document.querySelector('.agreed-wrapper');
    let modalContainer = document.querySelector('.privacy-politic-container');
    let closeBtn = document.querySelector('.privacy-close-button');
    let agreedWrapper = document.querySelector('.agreed-check');
    let nativeCheckbox = document.querySelector('.privacy-checkbox');

    function openModal() {
      modalContainer.classList.remove('visually-hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalContainer.classList.add('visually-hidden');
      document.body.style.overflow = 'auto';
    }

    openBtn.addEventListener('click', openModal);

    closeBtn.addEventListener('click', closeModal);

    modalContainer.addEventListener('click', function(e) {
      if (e.target == modalContainer) {
        closeModal();
      }
    })

    nativeCheckbox.addEventListener('click', () => {
      agreedWrapper.classList.toggle('display-none');
      openBtn.classList.toggle('eror-descr');
    })

  }
  modal();

  function maskMob() {

    const telInput = document.querySelector('.tel-mask');
    Inputmask({"mask": "+7 999 999 99 99",}).mask(telInput);

  }
  
  maskMob();
  
  function checkForm() {
    const form = document.querySelector('.contact-form');
    const inputName = document.querySelector('.name-input');
    const inputPlace = document.querySelector('.place-input');
    const agreedCheckbox = document.querySelector('.privacy-checkbox');
    const erorName = document.querySelector('.eror-span-name');
    const erorPlace = document.querySelector('.eror-span-place');

    inputName.addEventListener('input', () => {

      if (inputName.value.length == 0) {
        erorName.innerHTML = 'Введите имя';
        erorName.classList.add('eror-descr-text');
      } 

      if (inputName.value.length != 0) {
        erorName.innerHTML = '';
        erorName.classList.remove('eror-descr-text');
      }
    })

    inputPlace.addEventListener('input', () => {

      if (inputPlace.value.length == 0) {
        erorPlace.innerHTML = 'Укажите континент, страну или город';
        erorPlace.classList.add('eror-descr-text');
      } 

      if (inputPlace.value.length != 0) {
        erorPlace.innerHTML = '';
        erorPlace.classList.remove('eror-descr-text');
      }
    })

    form.addEventListener('submit', function(event) {
      if((inputPlace.value.length == 0) || (inputName.value.length == 0) || (agreedCheckbox.validity.valueMissing)) {
        event.preventDefault();
        erorName.innerHTML = 'Введите имя';
        erorName.classList.add('eror-descr-text');
        erorPlace.innerHTML = 'Укажите континент, страну или город';
        erorPlace.classList.add('eror-descr-text');
      }
    })


   
  }

  checkForm();

})

