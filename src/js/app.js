(function () {
    'use strict';

    function App() {

    }

    App.prototype.init = function () {
        window.TheNotesApp = window.TheNotesApp || {
                models: {},
                views: {},
                controllers: {}
            };
    };

    var app = new App();
    app.init();
})();