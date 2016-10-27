/**
 * Array Functions
 */


var arrayWorker = (function()
{
    "use strict";


    function removeHiddenTasks(array)
    {
        return array.filter(function(element){return (element.done < 1);});
    }


    function findTaskByIDAsArray(oID)
    {
        return notes.filter(function(element){return (element.id === oID);});
    }


    function findTaskByIDAsIndex(oID)
    {
        return notes.findIndex(function(element){return (element.id === oID);});
    }


    function removeTask(oID)
    {
        notes.splice(findTaskByIDAsIndex(oID), 1);
    }


    return{
        removeHiddenTasks : removeHiddenTasks,
        findTaskByIDAsArray : findTaskByIDAsArray,
        findTaskByIDAsIndex : findTaskByIDAsIndex,
        removeTask : removeTask,
    };

}());