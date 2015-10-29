(function () {
    'use strict';

    function View() {
        if (!View._this) {
            View._this = this;
        }

        this.noteList = document.querySelector('.note-list');
        this.editNote = document.querySelector('.edit-note');

        this.templates = {
            noteListItem: '<li class="note-list__item" data-id="{{id}}">' +
            '<article class="note">' +
            '<h1 class="note__title">{{title}}</h1>' +
            '<p class="note__text">{{text}}</p>' +
            '<article>' +
            '</li>'
        };

        return View._this;
    }

    View.prototype.renderList = function (items) {
        var _this = this;

        var buildedItems = items.map(function (item) {
            return _this.buildNoteListItem(item);
        });

        this.noteList.innerHTML = buildedItems.join('\n');
    };

    View.prototype.buildNoteListItem = function (item) {
        var _this = this;
        var template = _this.templates.noteListItem;

        template = template.replace('{{id}}', item.id);
        template = template.replace('{{title}}', item.title);
        template = template.replace('{{text}}', item.text);

        return template;
    };

    View.prototype.bindListItemClick = function (callback) {
        var items = document.querySelectorAll('.note-list__item');
        for (var i = 0, ln = items.length; i < ln; i++) {
            items[i].addEventListener('click', function () {
                callback(this);
            });
        }
    };

    View.prototype.showEditForm = function () {
        var _this = this;

        _this.editNote.classList.add('m-show');
    };

    View.prototype.hideEditForm = function () {
        var _this = this;

        _this.editNote.classList.remove('m-show');
    };

    window.app = window.app || {};
    window.app.View = View;
})();
