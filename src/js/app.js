(function () {
    'use strict';

    var application;

    function App() {
        if (!App._this) {
            App._this = this;
        }

        this.model = new window.app.Model();
        this.view = new window.app.View();
        this.controller = new window.app.Controller(this.model, this.view);

        return App._this;
    }

    App.prototype.init = function () {
        var _this = this;

        _this.controller.renderList();
    };

    document.addEventListener('DOMContentLoaded', function () {
        application = new App();

        application.init();
    });
})();
