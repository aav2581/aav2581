$(function () {

    $('.header__item-link, .footer__item-link').on('click', function (e) {
        e.preventDefault();

        let href = $(this).attr('href');
        let offset = $(href).offset().top;

        $('html, body').animate({
            scrollTop: offset,
        }, 700);
    });


    $('.come-back').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 700);
    });


    const body = document.querySelector('body');
    let modalWindow = document.querySelector('.media-container');
    let closeModalWindow = document.querySelector('.mob-nav__btn-close');

    let previousActiveElement;

    modalWindow.inert = true;


    function openMenu() {
        $('.header__nav').css('display', 'flex');
    };

    function closeMenu() {
        $('.header__nav').css('display', 'none');
    };

    
    function disableScroll() {
        $('html, body').addClass('stop-scrolling');
    };

    function enableScroll() {
        $('html, body').removeClass('stop-scrolling');
    }


    function openForm() {
        $('.media-container').fadeIn(500);
        $('.media-container').css('display', 'flex');
        disableScroll();
        previousActiveElement = document.activeElement;

        Array.from(body.children).forEach((child) => {
            if (child !== modalWindow) {
                child.inert = true;
            }
        });

        modalWindow.inert = false;
        setTimeout(() => {
            closeModalWindow.focus();
        }, 100);
    };

    function closeForm() {
        $('.media-container').fadeOut(500);
        enableScroll();

        Array.from(body.children).forEach((child) => {
            if (child !== modalWindow) {
                child.inert = false;
            }
        });

        previousActiveElement.focus();
        modalWindow.inert = true;
    };


    function openMessage() {
        $('.message-success').fadeIn(500);
        $('.message-success').css('display', 'flex');
        disableScroll();
    };

    function closeMessage() {
        $('.message-success').fadeOut(500);
        enableScroll();
    };


    $('.media-container, .message-success').click(function (event) {
        if (event.target == this) {
            $(this).fadeOut(500);
            enableScroll();

            Array.from(body.children).forEach((child) => {
                if (child !== modalWindow) {
                    child.inert = false;
                }
            });
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 27) {
            closeForm();
            closeMenu();
            closeMessage();
        }
    });


    $('body').on('click', '.burger', openMenu);
    $('body').on('click', '.mob-nav__btn-close', closeMenu);
    $('body').on('click', '.do-button, .call-button', openForm);
    $('body').on('click', '.form__btn-close', closeForm);
    $('body').on('click', '.message-success__btn-close', closeMessage);


    $('input[type = "tel"]').inputmask({
        "mask": "+7 (999) 999-9999"
    });


    $('.form').each(function () {
        $(this).validate({
            errorPlacement(error, element) {
                return true;
            },
            submitHandler(form) {
                let th = $(form);

                $.ajax({
                    type: 'POST',
                    url: 'mail.php',
                    data: th.serialize(),

                }).done(() => {
                    th.trigger('reset');
                    closeForm();
                    openMessage();
                });
                return false;
            }
        });
    });
});