/**
 * Storage Functions
 */


var storageManager = (function()
{
    "use strict";


    function sendXMLHTTPRequest(method, url, syncType, data, callback)
    {
        if(data !== null)
        {
            data = JSON.stringify(data);
        }
        var xhttp = new XMLHttpRequest();
        xhttp.callback = callback;
        xhttp.arguments = Array.prototype.slice.call(arguments, 2);
        xhttp.onload = function() {this.callback.apply(this, this.arguments);};
        xhttp.onerror = function() {console.error(this.statusText);};
        xhttp.open(method, url, syncType);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);
    }


    function dataLoad(pID, callback)
    {
        if(pID === undefined)
        {
            sendXMLHTTPRequest("GET", "http://127.0.0.1:3001/tasks/", true, null, callback);
        }
        else
        {
            sendXMLHTTPRequest("GET", "http://127.0.0.1:3001/tasks/" +  pID, true, null, callback);
        }
    }


    function saveTaskToServer(task, callback)
    {
        sendXMLHTTPRequest("POST", "http://127.0.0.1:3001/tasks/", true, task, callback);
    }


    function updateTaskOnServer(task, taskID, callback)
    {
        sendXMLHTTPRequest("PUT", `http://127.0.0.1:3001/tasks/${String(taskID)}/`, true, task, callback);
    }


    function deleteTaskFromServer(taskID, callback)
    {
        sendXMLHTTPRequest("DELETE", `http://127.0.0.1:3001/tasks/${String(taskID)}/`, true, null, callback);
    }


    function deleteNewTaskFromServer(taskID, callback)
    {
        sendXMLHTTPRequest("DELETE", `http://127.0.0.1:3001/tasks/${String(taskID)}/1/`, true, null, callback);
    }


    return{
        saveTaskToServer : saveTaskToServer,
        updateTaskOnServer : updateTaskOnServer,
        deleteTaskFromServer : deleteTaskFromServer,
        deleteNewTaskFromServer : deleteNewTaskFromServer,
        dataLoad : dataLoad,
    };

}());