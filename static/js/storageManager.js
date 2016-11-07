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


    function saveTaskToServer(task)
    {
        sendXMLHTTPRequest("POST", "http://127.0.0.1:3001/tasks/", true, task, logHTTPRequest);
    }


    function updateTaskOnServer(task)
    {
        sendXMLHTTPRequest("PUT", "http://127.0.0.1:3001/tasks/" + String(task._id) + "/", true, task, logHTTPRequestReload);
        // sendXMLHTTPRequest("PUT", "http://127.0.0.1:3001/tasks/" + task + "/", true, notes[arrayWorker.findTaskByIDAsIndex(task)], logHTTPRequest);
    }


    function deleteTaskFromServer(taskID)
    {
        sendXMLHTTPRequest("DELETE", "http://127.0.0.1:3001/tasks/" + String(taskID) + "/", true, null, logHTTPRequestReload);
    }


    function deleteNewTaskFromServer(taskID)
    {
        sendXMLHTTPRequest("DELETE", "http://127.0.0.1:3001/tasks/" + String(taskID) + "/1/", true, null, logHTTPRequestReload);
    }


    function dataLoad(pID)
    {
        if(pID === undefined)
        {
            sendXMLHTTPRequest("GET", "http://127.0.0.1:3001/tasks/", true, null, dataShow);
        }
        else
        {
            sendXMLHTTPRequest("GET", "http://127.0.0.1:3001/tasks/" +  pID, true, null, dataShowDetail);
        }
    }


    function dataShow()
    {
        ui.dataShow(JSON.parse(this.responseText));
    }


    function dataShowDetail()
    {
        ui.displayTaskDetail(JSON.parse(this.responseText));
    }


    function logHTTPRequest()
    {
        console.log(this.responseText);
    }


    function logHTTPRequestReload()
    {
        dataLoad();
        console.log(this.responseText);
    }


    function storagePut(itemToStore, data)
    {
        return localStorage.setItem(String(itemToStore), JSON.stringify(data));
    }


    function storageGet(storedItem, create, data)
    {
        if(create === true)
        {
            var dataFromStorage = JSON.parse(localStorage.getItem(storedItem));

            if(dataFromStorage === null)
            {
                storagePut(storedItem, data);
                return storageGet(storedItem, false);
            }
        }
        return JSON.parse(localStorage.getItem(storedItem));
    }


    function storageRemove(itemToRemove)
    {
        localStorage.removeItem(itemToRemove);
    }


    return{
        saveTaskToServer : saveTaskToServer,
        updateTaskOnServer : updateTaskOnServer,
        deleteTaskFromServer : deleteTaskFromServer,
        deleteNewTaskFromServer : deleteNewTaskFromServer,
        dataLoad : dataLoad,
        // putToStorage : storagePut,
        // getFromStorage : storageGet,
        // removeFromStorage : storageRemove,
    };

}());