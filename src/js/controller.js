(function () {
    'use strict';

    function Controller(model, view) {
        if (!Controller._this) {
            Controller._this = this;
        }

        this.model = model;
        this.view = view;

        this.editForm = {
            title: document.querySelector('.edit-note__title'),
            text: document.querySelector('.edit-note__text')
        };


        return Controller._this;
    }

    Controller.prototype.renderList = function () {
        var _this = this;

        _this.model.read()
            .then(function (response) {
                _this.view.renderList(response);

                _this.view.bindListItemClick(function (item) {
                    _this.editNote(item.getAttribute('data-id'));
                });
            });
    };

    Controller.prototype.createNote = function () {

    };

    Controller.prototype.editNote = function (noteId) {
        var _this = this;

        _this.model.read({id: noteId})
            .then(function (note) {


                _this.view.showEditForm();
            });


    };

    window.app = window.app || {};
    window.app.Controller = Controller;
})();
