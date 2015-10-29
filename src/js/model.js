(function () {
    'use strict';

    function Model(callback) {
        if (!Model._this) {
            Model._this = this;
        }

        this.name = 'notes';

        if (!localStorage[this.name]) {
            localStorage[this.name] = JSON.stringify([]);
        }

        if (callback) {
            callback.call(this, JSON.parse(localStorage[name]));
        }

        return Model._this;
    }

    Model.prototype.create = function (data) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            var notes = JSON.parse(localStorage[_this.name]);

            data.id = new Date().getTime();
            notes.push(data);

            localStorage[_this.name] = JSON.stringify(notes);
            resolve([data]);
        });
    };

    Model.prototype.read = function (query) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            var notes = JSON.parse(localStorage[_this.name]);

            notes = notes.filter(function (note) {
                for (var q in query) {
                    if (query[q] !== note[q]) {
                        return false;
                    }
                }
                return true;
            });

            resolve(notes);
        });
    };

    Model.prototype.update = function (data) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            var notes = JSON.parse(localStorage[_this.name]);

            if (data.id) {
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].id === data.id) {
                        notes[i] = data;

                        break;
                    }
                }
            } else {
                reject('Data has no ID!');
            }

            localStorage[_this.name] = JSON.stringify(notes);
            resolve([data]);
        });
    };

    Model.prototype.delete = function (id) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            var notes = JSON.parse(localStorage[_this.name]);
            var removedItems;

            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id == id) {
                    removedItems = notes.splice(i, 1);
                    break;
                }
            }

            localStorage[_this.name] = JSON.stringify(data);
            resolve(removedItems.length ? removedItems : null);
        });
    };



    window.app = window.app || {};
    window.app.Model = Model;
})();