/* Load Truck entity */
const Truck = require('../model/truck');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Truck Data Access Object
 */
class TruckDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM foodTrucks";
        return this.common.findAll(sqlRequest).then(rows => {
            let trucks = [];
            for (const row of rows) {
                
                trucks.push(new Truck(row.id, row.truckName, row.publishedMonth, row.createdDate, row.modifiedDate, row.availableDate));
            }
            console.log(trucks)
            return trucks;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM foodTrucks";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Truck
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Truck) {
        let sqlRequest = "UPDATE foodTrucks SET " +
            "truckName=$truckName, " +
            "publishedMonth=$publishedMonth, " +
            "modifiedDate= CURRENT_TIMESTAMP, " +
            "availableDate= $availableDate " +
            "WHERE id=$id";

        let sqlParams = {
            $truckName: Truck.truckName,
            $publishedMonth: Truck.publishedMonth,
            $id: Truck.id,
            $availableDate: Truck.availableDate

        };
        console.log(sqlParams)
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Truck
     * returns database insertion status
     */
    create(Truck) {
        let sqlRequest = "INSERT into foodTrucks (truckName, publishedMonth, availableDate) " +
            "VALUES ($truckName, $publishedMonth, $availableDate)";
        let sqlParams = {
            $truckName: Truck.truckName,
            $publishedMonth: Truck.publishedMonth,
            $availableDate: Truck.availableDate
        };
        return this.common.run(sqlRequest, sqlParams);
    };


    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(name) {
        
        const search = name;
        const param = '%' + search + '%';
        let sqlRequest = `SELECT (count(*) > 0) as found FROM foodTrucks WHERE truckName like '${param}'`;
        return this.common.findAll(sqlRequest);
    };
}

module.exports = TruckDao;