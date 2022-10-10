/* Load Truck Data Access Object */
const TruckDao = require('../dao/truckDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Truck entity */
const Truck = require('../model/truck');

/**
 * Truck Controller
 */
class TruckController {

    constructor() {
        this.truckDao = new TruckDao();
        this.common = new ControllerCommon();
    }

    

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.truckDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {
        this.truckDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let truck = new Truck();
        truck.id = req.body.id || req.params.id;
        truck.truckName = req.body.truckName;
        truck.publishedMonth = req.body.publishedMonth;
        truck.availableDate = req.body.availableDate;

        return this.truckDao.update(truck)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let truck = new Truck();
        if (req.body.id) {
            truck.id = req.body.id;
        }
        truck.truckName = req.body.truckName;
        truck.publishedMonth = req.body.publishedMonth;
        truck.availableDate = req.body.availableDate;
        
            this.truckDao.exists(truck.truckName)
            .then((data) => {
                console.log("data::",data)
                if(data?.[0]?.found === 1){
                    res.json({code: 409, data: "Name Exists"});
                }else{
                    return this.truckDao.create(truck)
                    .then(this.common.editSuccess(res))
                    .catch(this.common.serverError(res));
                }
            })
            .catch(this.common.findError(res));
        

    };


    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.truckDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = TruckController;