const express = require('express');
const router = express.Router();
const tourControllers = require("../controllers/tourControllers")

// TODO Param middleware have 4 arguments (req,res,next and Value)
router.param("id",(req, res, next,value)=>{

    console.log("Param Middleware ID ",value)
    next()
})


router.route("/").get(tourControllers.addNewTour)
router.route("/").post(tourControllers.addNewTour)


router.route("/:id").get(tourControllers.checkBody,tourControllers.fetchOneTour)
router.route("/:id").patch(tourControllers.updateTour)
router.route("/:id").delete(tourControllers.deleteTour)

// router.route("/:id/:page/:rank").get(tourControllers.fetchOneTour)


module.exports = router;