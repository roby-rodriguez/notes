window.notesUI = (function () {
    'use strict';

    function foldMenuOpener() {
        $('.js-fh5co-menu-btn')
            .click(function (evt) {
                $('#fh5co-offcanvass').addClass('fh5co-awake');
                evt.stopPropagation();
            });
    }

    function foldMenuCloser() {
        var foldMenu = $('#fh5co-offcanvass');
        // when close btn clicked
        $('.js-fh5co-offcanvass-close')
            .click(function () {
                foldMenu.removeClass('fh5co-awake');
            });
        // when fold menu item clicked
        $('.fh5co-fold-menu>li')
            .click(function () {
                foldMenu.removeClass('fh5co-awake');
            });
        // when clicking outside of fold-menu
        $(document)
            .click(function (evt) {
                if (!foldMenu.is(evt.target) && !foldMenu.has(evt.target).length)
                    foldMenu.removeClass('fh5co-awake');
            });
        // when scrolling to far below
        $(window)
            .scroll(function () {
                var scrolled = $(window).scrollTop();
                if (scrolled > 500)
                    foldMenu.removeClass('fh5co-awake');
            });
    }

    return {
        initFoldMenu: function () {
            foldMenuCloser();
        },
        initHeader: function () {
            foldMenuOpener();
        },
        initHome: function () {
            // this hack is needed to get allow angular finish its housekeeping
            setTimeout(window.salvattore.init, 0);
        }
    }
}());
