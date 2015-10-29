(function () {
    'use strict';

    function NotesModel(storage) {
        this.storage = storage;
    }

    NotesModel.prototype.create = function (item, callback) {
        callback = callback || function () {};

        this.storage.save(item, callback);
    };

    NotesModel.prototype.read = function (title, callback) {
        callback = callback || function () {};

        var query = {};

        if (title) {
            query.title = title;
        }

        this.storage.find(query)
            .then(callback);
    };

    NotesModel.prototype.update = function (data, callback) {
        this.storage.save(data, callback);
    };

    NotesModel.prototype.delete = function (id, callback) {
        this.storage.delete(id, callback);
    };

    window.app = window.app || {};
    window.app.models = window.app.models || {};
    window.app.models.NotesModel = NotesModel;
})();