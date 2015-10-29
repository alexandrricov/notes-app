(function () {
    'use strict';

    function Controller(model, view) {
        if (!Controller._this) {
            Controller._this = this;
        }

        this.model = model;
        this.view = view;

        return Controller._this;
    }

    Controller.prototype.renderList = function () {
        var _this = this;

        _this.model.read()
            .then(function (response) {
                _this.view.renderList(response);
            });
    };

    window.app = window.app || {};
    window.app.Controller = Controller;
})();
