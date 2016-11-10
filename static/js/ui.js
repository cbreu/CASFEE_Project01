/**
 * ui
 */


var ui = (function()
{
    "use strict";


    $(document).ready(function() {
        dataCall();
        $("#newButton").on("click", taskNew);
        $("#hide").on("change", dataCall);
        $("#sortDueDate").on("change", dataCall);
        $("#sortCreationDate").on("change", dataCall);
        $("#sortImportance").on("change", dataCall);
        $("#styleStandard").on("change", toggleStyleSetting);
        $("#styleDark").on("change", toggleStyleSetting);
    });


    function dataCall()
    {
        if($(this).attr("dataID")){
            storageManager.dataLoad($(this).attr("dataID"), displayTaskDetail);
        }
        else
        {
            storageManager.dataLoad(undefined, dataShow);
        }
    }


    function taskNew()
    {
        var newTask = task.newTask();
        storageManager.saveTaskToServer(newTask, displayTaskDetail);
    }


    function taskRemove()
    {
         storageManager.deleteTaskFromServer($(this).attr("dataID"), dataCall);
    }


    function taskCancel()
    {
        storageManager.deleteNewTaskFromServer($(this).attr("dataID"), dataCall);
    }


    function taskSave()
    {
        var saveTask = task.newTask();
        saveTask._id = parseInt($(this).attr("dataID"));
        saveTask.title = $("#taskDetailTitel").val();
        saveTask.text = $("#taskDetailText").val();
        saveTask.importance = $("#importanceSelector")[0].selectedIndex;
        saveTask.done = ($("#taskCompleteDetail").prop("checked")) ? 1 : 0;
        saveTask.setDueDate($("#taskDetailDueDateYear").val(), $("#taskDetailDueDateMonth").val(), $("#taskDetailDueDateDay").val(), $("#taskDetailDueDateHour").val(), $("#taskDetailDueDateMin").val(), $("#taskDetailDueDateSec").val());
        saveTask.new = 0;

        storageManager.updateTaskOnServer(saveTask, $(this).attr("dataID"), dataCall);
    }


    function displayTasks(template, tasksToDisplay)
    {
        document.getElementById("tasks").innerHTML = Handlebars.compile(document.getElementById(template).innerHTML)(tasksToDisplay);
    }


    function dataShow()
    {
        var taskData = ($("#hide").prop("checked")) ? JSON.parse(this.responseText).filter(function(element){return (element.done < 1);}) : JSON.parse(this.responseText);
        var sortType = $("input:radio[name='sortchoose']:checked").val();

        var tasksToShow = taskData.map(toTask);

        (sortType === "creationDate") ? tasksToShow.sort(function(a, b){return a.id - b.id;}) : tasksToShow;
        (sortType === "dueDate") ? tasksToShow.sort(function(a, b){return a.dueNum - b.dueNum;}) : tasksToShow;
        (sortType === "importance") ? tasksToShow.sort(function(a, b){return b.importance - a.importance;}) : tasksToShow;

        if(tasksToShow.length > 0)
        {
            displayTasks("tasks-template", {tasksToShow});
            $(".editTaskButton").on("click", dataCall);
            $(".taskComplete").on("click", noClick);
        }
        else
        {
            displayTasks("noTaskFound-template", {});
        }

        uiElementsVisibility(0, []);
    }


    function displayTaskDetail()
    {
        var singleTask = JSON.parse(this.responseText).map(toTask);

        displayTasks("taskDetail-template", {singleTask});
        $("#importanceSelector")[0].selectedIndex = singleTask[0].importance;
        $("#taskCompleteDetail").prop("checked", singleTask[0].done);
        $("#removeButton").prop("disabled", (singleTask[0].new) ? true : false);
        $("#removeButton").on("click", taskRemove);
        $("#cancelButton").on("click", taskCancel);
        $("#saveButton").on("click", taskSave);
        uiElementsVisibility(1);
    }


    function uiElementsVisibility(state)
    {
        $("#newButton").prop("disabled", Boolean(state));
        $("#hide").prop("disabled", Boolean(state));
        $("#sortDueDate").prop("disabled", Boolean(state));
        $("#sortCreationDate").prop("disabled", Boolean(state));
        $("#sortImportance").prop("disabled", Boolean(state));
    }


    function toggleStyleSetting()
    {
        $("Link:eq(1)").attr("href", `${this.value}?${Date.now().toString()}`);
    }


    function toTask(obj)
    {
        return task.newTask(obj);
    }

    function noClick()
    {
        return false;
    }


    return{};

}());