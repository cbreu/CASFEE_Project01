/**
 * UI relevant Functions
 */


var ui = (function()
{
    "use strict";


    function displayNotes(template, notesToDisplay)
    {
         document.getElementById("notes").innerHTML = Handlebars.compile(document.getElementById(template).innerHTML)(notesToDisplay);


        // var myTemplate = Handlebars.compile(document.getElementById(template).innerHTML);
        // document.getElementById("notes").innerHTML = myTemplate(notesToDisplay);

        // var myTemplate = Handlebars.compile($(template).html());
        // var notesHtml = $("#notes");
        // notesHtml.empty();
        // notesHtml.append(myTemplate(notesToDisplay));
    }


    function dataShow()
    {
        console.log(notes);

        var notesToShow = notes;

        if (document.getElementById("hide").checked === true)
        {
            notesToShow = arrayWorker.removeHiddenTasks(notes);
        }

        if(document.getElementById("sortCreationDate").checked === true)
        {
            if(notesToShow.length > 0)
            {
                notesToShow.sort(function(a, b){return a.id - b.id;});
                displayNotes("notes-template", {notesToShow});
            }
            else
            {
                displayNotes("noNoteFound-template", {});
            }
        }
        else if (document.getElementById("sortDueDate").checked === true)
        {
            if(notesToShow.length > 0)
            {
                notesToShow.sort(function(a, b){return a.dueDateNum - b.dueDateNum;});
                displayNotes("notes-template", {notesToShow});
            }
            else
            {
                displayNotes("noNoteFound-template", {});
            }
        }
        else if (document.getElementById("sortImportance").checked === true)
        {
            if(notesToShow.length > 0)
            {
                notesToShow.sort(function(a, b){return b.importance - a.importance;});
                displayNotes("notes-template", {notesToShow});
            }
            else
            {
                displayNotes("noNoteFound-template", {});
            }
        }

        uiElementsVisibility("on", []);
    }


    function toggleStyleSetting(element)
    {
        document.getElementsByTagName("Link")[0].setAttribute("href", element.value);
    }


    function displayNoteDetail(singleNote)
    {
        displayNotes("noteDetail-template", {singleNote});
        document.getElementById("importanceSelector").selectedIndex = singleNote[0].importance;

        if(singleNote[0].done === 1)
        {
            document.getElementById("noteCompleteDetail").setAttribute("checked", "checked");
        }
        else
        {
            document.getElementById("noteCompleteDetail").removeAttribute("checked");
        }
        uiElementsVisibility("off", singleNote);
    }


    function uiElementsVisibility(state, singleNote)
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

            if(singleNote[0].new > 0)
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
        displayNotes : displayNotes,
        dataShow : dataShow,
        toggleStyleSetting : toggleStyleSetting,
        displayNoteDetail : displayNoteDetail,
        uiElementsVisibility : uiElementsVisibility,
        toggleChecked : toggleChecked,
        formatLZ : formatLZ,
    };

}());