var taskStore = require("../services/taskStore.js");


module.exports.add = function(req, res)
{
    taskStore.add(req.body, function(err, newDoc){
        res.format({
            'application/json': function()
            {
                res.send(newDoc);
            }
        });
    });
};

module.exports.update = function(req, res)
{
    taskStore.update(req.params.id, req.body, function(err, result){
        res.format({
            'application/json': function()
            {
                res.send("Modified: " + result);
            }
        });
    });
};

module.exports.remove = function(req, res)
{
    taskStore.remove(req.params.id, function(err, result){
        res.format({
            'application/json': function()
            {
                res.send("Removed: " + result);
            }
        });
    });
};

module.exports.removeNew = function(req, res)
{
    taskStore.removeNew(req.params.id, req.params.new, function(err, result){
        res.format({
            'application/json': function()
            {
                res.send("Removed New: " + result);
            }
        });
    });
};

module.exports.getOne = function(req, res)
{
    taskStore.getOne(req.params.id, function(err, result){
        res.format({
            'application/json': function()
            {
                res.send(result);
            }
        });
    });
};

module.exports.getAll = function(req, res)
{
    taskStore.getAll(function(err, result){
        res.format({
            'application/json': function()
            {
                res.send(result);
            }
        });
    });
};
