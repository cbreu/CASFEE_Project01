/**
 * task
 */


var task = (function()
{
    "use strict";


    class Task
    {
        constructor(obj)
        {
            if(obj)
            {
                this._id = obj._id;
                this.creationDate = new Date(obj.creationDate);
                this.dueDate = new Date(obj.dueDate);
                this.title = obj.title;
                this.text = obj.text;
                this.importance = obj.importance;
                this.done = obj.done;
                this.new = obj.new;
            }
            else
            {
                this._id = Date.now();
                this.creationDate = new Date(this._id);
                this.dueDate = new Date(this._id);
                this.title = "";
                this.text = "";
                this.importance = 0;
                this.done = 0;
                this.new = 1;
            }

            Object.defineProperty(this, "id", {
                get: function ( ) {return this._id;}
            } );

            Object.defineProperty(this, "dueString", {
                get: function ( ) {return `Due: ${this.formatLZ(this.dueDate.getDate(), 2)}.${this.formatLZ(this.dueDate.getMonth() + 1, 2)}.${this.dueDate.getFullYear()} ${this.formatLZ(this.dueDate.getHours(), 2)}:${this.formatLZ(this.dueDate.getMinutes(), 2)}`;}
            } );

            Object.defineProperty(this, "dueYear", {
                get: function ( ) {return this.dueDate.getFullYear();}
            } );

            Object.defineProperty(this, "dueMonth", {
                get: function ( ) {return this.dueDate.getMonth() + 1;}
            } );

            Object.defineProperty( this, "dueDay", {
                get: function ( ) {return this.dueDate.getDate();}
            } );

            Object.defineProperty(this, "dueHours", {
                get: function ( ) {return this.dueDate.getHours();}
            } );

            Object.defineProperty(this, "dueMinutes", {
                get: function ( ) {return this.dueDate.getMinutes();}
            } );

            Object.defineProperty(this, "dueSeconds", {
                get: function ( ) {return this.dueDate.getSeconds();}
            } );

            Object.defineProperty(this, "dueNum", {
                get: function ( ) {return this.dueDate.valueOf();}
            } );

            Object.defineProperty(this, "importanceString", {
                get: function ( ) {this.importance = parseInt(this.importance);
                    var importanceString = "";
                    for(var i = 0; i < this.importance; i++)
                    {
                        importanceString += "\u2756";
                    }

                    return importanceString;}
            } );
        }

        setDueDate(y, m, d, hh, mm, ss)
        {
            this.dueDate = new Date(`${y}-${this.formatLZ(m, 2)}-${this.formatLZ(d, 2)}T${this.formatLZ(hh, 2)}:${this.formatLZ(mm, 2)}:${this.formatLZ(ss, 2)}`);
        }

        formatLZ(pNum, pLen)
        {
            var resultString = pNum + "";
            while (resultString.length < pLen)
            {
                resultString = "0" + resultString;
            }

            return resultString;
        }
    }


    function newTask(obj)
    {
        return new Task(obj);
    }


    return{
        newTask : newTask,
    };

}());