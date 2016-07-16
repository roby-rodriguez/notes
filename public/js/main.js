window.notesUI = (function () {
    'use strict';

    // TODO here we will adapt hydrogen's original main.js for use in our Angular views

    return {
        initHome: function () {
            // this hack is needed to get allow angular finish its housekeeping
            setTimeout(window.salvattore.init, 0);
        }
    }
}());
