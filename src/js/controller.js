(function () {
    'use strict';

    function Controller(model, view) {
        var _this = this;

        if (!Controller._this) {
            Controller._this = _this;
        }

        _this.model = model;
        _this.view = view;

        _this.addBtn = document.querySelector('.add-note');
        _this.noteFilter = document.querySelector('.note-filter');

        _this.editForm = {
            id: document.querySelector('.edit-note__id'),
            title: document.querySelector('.edit-note__title'),
            text: document.querySelector('.edit-note__text'),
            save: document.querySelector('.edit-note__save'),
            remove: document.querySelector('.edit-note__remove'),
            cancel: document.querySelector('.edit-note__cancel')
        };

        _this.addBtn.addEventListener('click', function () {
            _this.createNote();
        });

        _this.noteFilter.addEventListener('keyup', function () {
            _this.renderList();
        });

        _this.noteFilter.addEventListener('change', function (e) {
            _this.saveFilterState();
        });

        _this.editForm.save.addEventListener('click', function () {
            _this.onSaveEditNote();
        });

        _this.editForm.remove.addEventListener('click', function () {
            _this.onRemoveEditNote();
        });

        _this.editForm.cancel.addEventListener('click', function () {
            _this.onCancelEditNote();
        });

        return Controller._this;
    }

    Controller.prototype.renderList = function () {
        var _this = this;

        _this.model.read()
            .then(function (response) {
                var filterText = _this.noteFilter.value.toUpperCase();

                var notes = response.filter(function (note) {
                    var noteTitle;

                    if (filterText) {
                        noteTitle = note.title.toUpperCase();
                        return (noteTitle.indexOf(filterText) !== -1);
                    }

                    return true;
                });

                renderListAndBindEvents(_this, notes);
            });
    };

    //Controller.prototype.onFilterChange = function () {
    //
    //};

    Controller.prototype.saveFilterState = function () {

    };

    Controller.prototype.createNote = function () {
        var _this = this;

        _this.view.showEditForm();
    };

    Controller.prototype.editNote = function (noteId) {
        var _this = this;

        _this.model.read({id: noteId})
            .then(function (notes) {
                var note;

                if (notes.length) {
                    note = notes[0];

                    _this.editForm.id.value = note.id;
                    _this.editForm.title.value = note.title;
                    _this.editForm.text.value = note.text;
                }

                _this.view.showEditForm();
            });
    };

    Controller.prototype.onSaveEditNote = function () {
        var _this = this,
            promise,
            note = {
                title: _this.editForm.title.value,
                text: _this.editForm.text.value
            };

        if (_this.editForm.id.value) {
            note.id = _this.editForm.id.value;

            promise = _this.model.update(note)
        } else {
            promise = _this.model.create(note)
        }

        promise.then(function (notes) {
            renderListAndBindEvents(_this, notes);
            _this.view.hideEditForm();
            clearEditForm(_this.editForm);
        });
    };

    Controller.prototype.onRemoveEditNote = function () {
        var _this = this;

        if (_this.editForm.id.value) {

            _this.model.delete(_this.editForm.id.value)
                .then(function (notes) {
                    renderListAndBindEvents(_this, notes);
                    _this.view.hideEditForm();
                    clearEditForm(_this.editForm);
                });
        } else {
            _this.view.hideEditForm();
            clearEditForm(_this.editForm);
        }
    };

    Controller.prototype.onCancelEditNote = function () {
        var _this = this;

        _this.view.hideEditForm();

        clearEditForm(_this.editForm);
    };

    function clearEditForm(editForm) {
        editForm.id.value = '';
        editForm.title.value = '';
        editForm.text.value = '';
    }

    function renderListAndBindEvents(_this, notes) {
        _this.view.renderList(notes);

        _this.view.bindListItemClick(function (item) {
            _this.editNote(item.getAttribute('data-id'));
        });
    }

    window.app = window.app || {};
    window.app.Controller = Controller;
})();
