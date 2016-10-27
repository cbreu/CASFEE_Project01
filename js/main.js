/**
 * main Functions
 */

"use strict";


var notes = [];


function dataLoad()
{
    notes = storageManager.getFromStorage("TaskManagerTasks", true, notes);
}

function dataSave()
{
    storageManager.putToStorage("TaskManagerTasks", notes);
}


window.onload
{

    dataLoad();

    ui.dataShow();
}


function noteEdit(oID)
{
    ui.displayNoteDetail(notes.filter(function(element, index, array){return (element.id === oID);}));
}


function newNote()
{
    // var note = new Note();

    var note = task.newTask();
    notes.push(note);

    ui.displayNoteDetail(arrayWorker.findTaskByIDAsArray(note.id));
}


function noteEditRemove(oID)
{
    // removeTaskItem(oID);
    arrayWorker.removeTask(oID);
    dataSave();
    ui.dataShow();
}


function noteEditCancel(oID)
{
    if(arrayWorker.findTaskByIDAsArray(oID)[0].new > 0)
    {
        arrayWorker.removeTask(oID);
        // removeTaskItem(oID);
    }

    ui.dataShow();
}


function noteEditSave(oID)
{
    noteModify(oID);
    dataSave();
    ui.dataShow();
}


function noteModify(oID)
{
    console.log(notes);

    var noteIndex = arrayWorker.findTaskByIDAsIndex(oID);
    var selector = document.getElementById("importanceSelector");

    task.setTitle(notes[noteIndex], document.getElementById("noteDetailTitel").value);
    task.setText(notes[noteIndex], document.getElementById("noteDetailText").value);
    // task.setDueDateElements(notes[noteIndex]);
    task.setDueDateByElements(notes[noteIndex], document.getElementById("noteDetailDueDateYear").value, document.getElementById("noteDetailDueDateMonth").value - 1, document.getElementById("noteDetailDueDateDay").value, document.getElementById("noteDetailDueDateHour").value, document.getElementById("noteDetailDueDateMin").value, document.getElementById("noteDetailDueDateSec").value);
    task.setImportance(notes[noteIndex], selector.options[selector.selectedIndex].value);

    if (document.getElementById("noteCompleteDetail").getAttribute("checked") === "checked")
    {
        task.setDone(notes[noteIndex], 1);
    }
    else
    {
        task.setDone(notes[noteIndex], 0);
    }

    task.setNew(notes[noteIndex], 0);
}
