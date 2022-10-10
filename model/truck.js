/**
 * Truck Entity (ES6 Class)
 */

 class Truck {
    constructor(id, truckName, publishedMonth, createdDate, modifiedDate, availableDate) {
        this.id = id;
        this.truckName = truckName;
        this.publishedMonth = publishedMonth;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.availableDate = availableDate;
    }
}

module.exports = Truck;