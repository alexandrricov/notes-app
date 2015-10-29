(function () {
    'use strict';

    function NotesView() {
        var _this = this;

        _this.noteList = document.querySelector('.note-list');
        _this.editNote = document.querySelector('.edit-note');
    }



    window.app = window.app || {};
    window.app.views = window.app.views || {};
    window.app.views.NotesView = NotesView;
})();