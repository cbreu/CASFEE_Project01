/**
 * main Functions
 */


var main = (function()
{
    "use strict";


    window.onload
    {
        console.log("in window.onload");

        storageManager.dataLoad();
     }


    function taskEdit(oID)
    {
        storageManager.dataLoad(oID);
    }


    function taskNew()
    {
        var newTask = task.newTask();
        storageManager.saveTaskToServer(newTask);
        storageManager.dataLoad(newTask._id);
    }


    function taskRemove(oID)
    {
        storageManager.deleteTaskFromServer(oID);
    }


    function taskCancel(oID)
    {
        storageManager.deleteNewTaskFromServer(oID);
    }


    function taskSave(oID)
    {
        var modTask = task.taskModify(oID);
        storageManager.updateTaskOnServer(modTask);
    }


    return{
        taskEdit : taskEdit,
        taskNew : taskNew,
        taskRemove : taskRemove,
        taskCancel : taskCancel,
        taskSave : taskSave,
    };

}());