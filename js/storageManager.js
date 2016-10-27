/**
 * Locale Storage Functions
 */


var storageManager = (function()
{
    "use strict";


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
        putToStorage : storagePut,
        getFromStorage : storageGet,
        removeFromStorage : storageRemove,
    };

}());