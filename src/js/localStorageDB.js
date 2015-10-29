(function () {
    'use strict';

    function LocalStorageDB(callback) {
        if (!LocalStorageDB._this) {
            LocalStorageDB._this = this;
        }

        LocalStorageDB._this.name = 'notes';

        if (!localStorage[LocalStorageDB._this.name]) {
            localStorage[LocalStorageDB._this.name] = JSON.stringify([]);
        }

        if (callback) {
            callback.call(this, JSON.parse(localStorage[name]));
        }

        return LocalStorageDB._this;
    }

    LocalStorageDB.prototype.find = function (query, callback) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            var notes = JSON.parse(localStorage[_this.name]);

            notes = notes.filter(function (todo) {
                for (var q in query) {
                    if (query[q] !== todo[q]) {
                        return false;
                    }
                }
                return true;
            });

            resolve(notes);
        });

        //if (!callback) {
        //    return;
        //}
        //
        //var notes = JSON.parse(localStorage[_this.name]);
        //
        //callback.call(_this, notes.filter(function (todo) {
        //    for (var q in query) {
        //        if (query[q] !== todo[q]) {
        //            return false;
        //        }
        //    }
        //    return true;
        //}));
    };

    LocalStorageDB.prototype.save = function (updateData, callback) {
        var _this = this;

        var notes = JSON.parse(localStorage[_this.name]);

        callback = callback || function () {};

        if (updateData.id) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === updateData.id) {
                    notes[i] = updateData;

                    break;
                }
            }

            localStorage[_this.name] = JSON.stringify(notes);
            callback.call(this, JSON.parse(localStorage[_this.name]));
        } else {
            updateData.id = new Date().getTime();

            notes.push(updateData);
            localStorage[_this.name] = JSON.stringify(notes);
            callback.call(this, [updateData]);
        }
    };

    LocalStorageDB.prototype.delete = function (id, callback) {
        var _this = this;

        var notes = JSON.parse(localStorage[_this.name]);

        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                notes.splice(i, 1);
                break;
            }
        }

        localStorage[_this.name] = JSON.stringify(data);
        callback.call(this, JSON.parse(localStorage[_this.name]));
    };



    window.app = window.app || {};
    window.app.dataBases = window.app.dataBases || {};
    window.app.dataBases.LocalStorageDB = LocalStorageDB;
})();