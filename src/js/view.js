(function () {
    'use strict';

    function View() {
        if (!View._this) {
            View._this = this;
        }

        this.noteList = document.querySelector('.note-list');
        this.editNote = document.querySelector('.edit-note');

        this.templates = {
            noteListItem: '<li class="note-list__item" data-id="{{id}}">{{title}}</li>'
        };

        return View._this;
    }

    View.prototype.renderList = function (items) {
        var _this = this;

        var buildedItems = items.map(function (item) {
            return _this.buildNoteListItem(item)
        });

        this.noteList.innerHTML = buildedItems.join('\n');
    };

    View.prototype.buildNoteListItem = function (item) {
        var _this = this;
        var template = _this.templates.noteListItem;

        template = template.replace('{{id}}', item.id);
        template = template.replace('{{title}}', item.title);

        return template;
    };

    window.app = window.app || {};
    window.app.View = View;
})();