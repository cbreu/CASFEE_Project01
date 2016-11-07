var Datastore = require('nedb');
var db = new Datastore({ filename: '../server/data/tasks.db', autoload: true });


function publicAdd(data, callback)
{
    db.insert(data, function(err, newDoc) {
        if(callback)
        {
            callback(err, newDoc);
        }
    });
}

function publicUpdate(id, data, callback)
{
    db.update({_id: parseInt(id)}, data, {multi: false}, function(err, newDoc) {
        if(callback)
        {
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback)
{
    db.remove({_id: parseInt(id)}, {}, function (err, numRemoved) {
        if (callback)
        {
            callback(err, numRemoved);
        }
    });
}

function publicRemoveNew(id, newState, callback)
{
    db.remove({$and: [{_id: parseInt(id)}, {new: parseInt(newState)}]}, {}, function (err, numRemoved) {
        if (callback)
        {
            callback(err, numRemoved);
        }
    });
}

function publicSingle(id, callback)
{
    db.find({_id: parseInt(id)}, function (err, docs) {
        callback( err, docs);
    });
}

function publicAll(callback)
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {
    add : publicAdd,
    update : publicUpdate,
    remove : publicRemove,
    removeNew : publicRemoveNew,
    getOne : publicSingle,
    getAll : publicAll,
};