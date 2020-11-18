$(function(){
    
    function openMenu() {
        $('.menu').css('display', 'block');
        $('body').css('overflow', 'hidden');
    }

    function closeMenu() {
        $('.menu').css('display', 'none');
        $('body').css('overflow', 'auto');
    }

    function openSearch() {
        $('.search').css({
            'display': 'block',
            'width': '85%',
            'z-index': '8',
            'position': 'absolute',
        });
        $('.search-mini').css('display', 'none');
        $('.search-field').css('width', '100%');

        $('.header').prepend('<button class="close-search" aria-label="Закрыть поиск"></button>');
    }

    function closeSearch() {
        $('.search').css('display', 'none');
        $('.search-mini').css('display', 'block');
        
        $('.close-search').remove();
    }

    $('body').on('click', '.menu-button', openMenu);
    $('body').on('click', '.menu-button-close', closeMenu);
    $('body').on('click', '.search-mini', openSearch);
    $('body').on('click', '.close-search', closeSearch);
});