(function () {
    'use strict';

    function NotesController() {
        var _this = this;

        _this.noteList = document.querySelector('.note-list');
        _this.editNote = document.querySelector('.edit-note');
    }



    window.app = window.app || {};
    window.app.controllers = window.app.controllers || {};
    window.app.controllers.NotesController = NotesController;
})();
