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


    function findTaskByIDAsArray(array, oID)
    {
        return array.filter(function(element){return (element._id === oID);});
    }


    function findTaskByIDAsIndex(array, oID)
    {
        return array.findIndex(function(element){return (element._id === oID);});
    }


    return{
        removeHiddenTasks : removeHiddenTasks,
        findTaskByIDAsArray : findTaskByIDAsArray,
        findTaskByIDAsIndex : findTaskByIDAsIndex,
    };

}());