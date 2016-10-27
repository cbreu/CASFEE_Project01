/**
 * task Functions
 */


var task = (function()
{
    "use strict";


    class Task
    {
        constructor(creaDate)
        {
            this.id = Date.now();
            this.creationDate = new Date(creaDate);
            this.dueDate;
            this.dueDateString = "";
            this.dueDateNum = 0;
            this.dueDateYear = "";
            this.dueDateMonth = "";
            this.dueDateMonthPlus1 = "";
            this.dueDateDay = "";
            this.dueDateHours = "";
            this.dueDateMinutes = "";
            this.dueDateSeconds = "";
            this.title = "";
            this.text = "";
            this.importance = 0;
            this.importanceString = "";
            this.done = 0;
            this.new = 1;
        }
    }


    function newTask()
    {
        var creaDate = new Date();
        var taskNew = new Task(creaDate);
        setDueDate(taskNew, creaDate);
        setImportance(taskNew, 0);
        return taskNew;
    }


    function setDueDate(task, pDate)
    {
        // console.log("setDueDate1-1");
        // console.log(task);

        // var tempDate = new Date(dueYear, dueMonth, dueDay, dueHours, dueMins, dueSecs);
        task.dueDate = pDate;
        task.dueDateNum = pDate.getTime();

        task.dueDateYear = pDate.getFullYear();
        task.dueDateMonth = formatLZ(pDate.getMonth(), 2);
        task.dueDateMonthPlus1 = formatLZ(pDate.getMonth() + 1, 2);
        task.dueDateDay = formatLZ(pDate.getDate(), 2);
        task.dueDateHours = formatLZ(pDate.getHours(), 2);
        task.dueDateMinutes = formatLZ(pDate.getMinutes(), 2);
        task.dueDateSeconds = formatLZ(pDate.getSeconds(), 2);

        task.dueDateString = task.dueDateDay + "." + task.dueDateMonthPlus1 + "." + task.dueDateYear + " " + task.dueDateHours + ":" + task.dueDateMinutes;

        // console.log("setDueDate1-2");
        // console.log(task);
    }


    function setDueDateByElements(task, dueYear, dueMonth, dueDay, dueHours, dueMins, dueSecs)
    {
        // console.log("setDueDate2-1");
        // console.log(task);

        var tempDate = new Date(dueYear, dueMonth, dueDay, dueHours, dueMins, dueSecs);
        task.dueDate = tempDate;
        task.dueDateNum = tempDate.getTime();

        task.dueDateYear = dueYear;
        task.dueDateMonth = formatLZ(dueMonth, 2);
        task.dueDateMonthPlus1 = formatLZ(dueMonth + 1, 2);
        task.dueDateDay = formatLZ(dueDay, 2);
        task.dueDateHours = formatLZ(dueHours, 2);
        task.dueDateMinutes = formatLZ(dueMins, 2);
        task.dueDateSeconds = formatLZ(dueSecs, 2);

        task.dueDateString = task.dueDateDay + "." + task.dueDateMonthPlus1 + "." + task.dueDateYear + " " + task.dueDateHours + ":" + task.dueDateMinutes;

        // console.log("setDueDate2-2");
        // console.log(task);
    }


    function setImportance(task, importance)
    {
        task.importance = parseInt(importance);
        task.importanceString = "";
        for(var i = 0; i < importance; i++)
        {
            task.importanceString += "\u2756";
        }
    }


    function setTitle(task, pTitle)
    {
        task.title = pTitle;
    }


    function setText(task, pText)
    {
        task.text = pText;
    }


    function setDone(task, pDone)
    {
        task.done = pDone;
    }


    function setNew(task)
    {
        task.new = 0;
    }


    function formatLZ(pNum, pLen)
    {
        var resultString = pNum + "";
        while (resultString.length < pLen)
        {
            resultString = "0" + resultString;
        }

        return resultString;
    }


    return{
        newTask : newTask,
        setDueDate : setDueDate,
        setDueDateByElements : setDueDateByElements,
        setImportance : setImportance,
        setTitle : setTitle,
        setText : setText,
        setDone : setDone,
        setNew : setNew,
    };

}());