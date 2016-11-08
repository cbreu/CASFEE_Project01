/**
 * UI relevant Functions
 */


var ui = (function()
{
    "use strict";


    function displayTasks(template, tasksToDisplay)
    {
         document.getElementById("tasks").innerHTML = Handlebars.compile(document.getElementById(template).innerHTML)(tasksToDisplay);
    }


    function dataShow(tasks)
    {
        var tasksToShow = tasks;

        if (document.getElementById("hide").checked === true)
        {
            tasksToShow = arrayWorker.removeHiddenTasks(tasks);
        }

        if(document.getElementById("sortCreationDate").checked === true)
        {
            if(tasksToShow.length > 0)
            {
                tasksToShow.sort(function(a, b){return a._id - b._id;});
                displayTasks("tasks-template", {tasksToShow});
            }
            else
            {
                displayTasks("noTaskFound-template", {});
            }
        }
        else if (document.getElementById("sortDueDate").checked === true)
        {
            if(tasksToShow.length > 0)
            {
                tasksToShow.sort(function(a, b){return a.dueDateNum - b.dueDateNum;});
                displayTasks("tasks-template", {tasksToShow});
            }
            else
            {
                displayTasks("noTaskFound-template", {});
            }
        }
        else if (document.getElementById("sortImportance").checked === true)
        {
            if(tasksToShow.length > 0)
            {
                tasksToShow.sort(function(a, b){return b.importance - a.importance;});
                displayTasks("tasks-template", {tasksToShow});
            }
            else
            {
                displayTasks("noTaskFound-template", {});
            }
        }

        uiElementsVisibility("on", []);
    }


    function toggleStyleSetting(element)
    {
        var urlString = (element.value + "?" + Date.now().toString());
        document.getElementsByTagName("Link")[1].setAttribute("href", urlString);
    }


    function displayTaskDetail(singleTask)
    {
        displayTasks("taskDetail-template", {singleTask});
        document.getElementById("importanceSelector").selectedIndex = singleTask[0].importance;

        if(singleTask[0].done === 1)
        {
            document.getElementById("taskCompleteDetail").setAttribute("checked", "checked");
        }
        else
        {
            document.getElementById("taskCompleteDetail").removeAttribute("checked");
        }
        uiElementsVisibility("off", singleTask);
    }


    function uiElementsVisibility(state, singleTask)
    {
        if (state === "on")
        {
            document.getElementById("newButton").removeAttribute("disabled");
            document.getElementById("hide").removeAttribute("disabled");
            document.getElementById("sortDueDate").removeAttribute("disabled");
            document.getElementById("sortCreationDate").removeAttribute("disabled");
            document.getElementById("sortImportance").removeAttribute("disabled");
        }
        else
        {
            document.getElementById("newButton").setAttribute("disabled", "disabled");
            document.getElementById("hide").setAttribute("disabled", "disabled");
            document.getElementById("sortDueDate").setAttribute("disabled", "disabled");
            document.getElementById("sortCreationDate").setAttribute("disabled", "disabled");
            document.getElementById("sortImportance").setAttribute("disabled", "disabled");

            if(singleTask[0].new > 0)
            {
                document.getElementById("removeButton").setAttribute("disabled", "disabled");
            }
            else
            {
                document.getElementById("removeButton").removeAttribute("disabled");
            }
        }
    }


    function toggleChecked(element)
    {
        if(element.getAttribute("checked") === "checked")
        {
            element.removeAttribute("checked");
        }
        else
        {
            element.setAttribute("checked", "checked");
        }
    }


    function formatLZ(pNum, pLen)
    {
        var resultString = pNum.value + "";

        if(Number(pNum.value) < Number(pNum.min))
        {
            resultString = pNum.min + "";
        }
        else if(Number(pNum.value) > Number(pNum.max))
        {
            resultString = pNum.max + "";
        }

        while (resultString.length < pLen)
        {
            resultString = "0" + resultString;
        }

        pNum.value = resultString;
    }


    return{
        displayTasks : displayTasks,
        dataShow : dataShow,
        toggleStyleSetting : toggleStyleSetting,
        displayTaskDetail : displayTaskDetail,
        uiElementsVisibility : uiElementsVisibility,
        toggleChecked : toggleChecked,
        formatLZ : formatLZ,
    };

}());