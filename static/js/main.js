/**
 * main Functions
 */

"use strict";





window.onload
{
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

