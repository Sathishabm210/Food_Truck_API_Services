/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./config/sqlite.db');

/* Init foodTruck and items tables if they don't exist */
let init = function () {
    db.run("CREATE TABLE if not exists foodTrucks (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " truckName TEXT," +
        " publishedMonth TEXT," +
        " createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
        " modifiedDate TIMESTAMP," +
        " availableDate TIMESTAMP" +
        ")");

    db.run("CREATE TABLE if not exists foodItems (" +
        " id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " truckId INT," +
        " name TEXT," +
        " description TEXT," +
        " price INT," +
        " createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
        " modifiedDate TIMESTAMP" +
        ")");
};

module.exports = {
    init: init,
    db: db
};

