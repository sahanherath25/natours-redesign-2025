const fs = require("fs");
const {StatusCodes} = require("http-status-codes");


const data = fs.readFileSync(`./dev-data/data/tours-simple.json`)
const tours = JSON.parse(data)

exports.addNewTour = async (req, res, next) => {

    console.log("ROUTE HIT THE TOURS")
    const requestBody = req.body;
    console.log("Request Body ", requestBody);

    const newId = tours[tours.length - 1].id + 1

    const newTour = Object.assign({id: newId}, req.body)

    // TODO Adding New TOur Object to the  Array
    tours.push(newTour);

    // TODO Writing Data to the FIle
    fs.writeFile(`./dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {

        if (err) {
            res.end(err)
        }

        res.status(StatusCodes.CREATED).json({
            status: "success",
            message: "New Tour Added",
            data: {
                tours
            }
        })
    })


    //
    // try {
    //
    //     // const foundUser = await User.find();
    //
    //
    //
    //     console.log("USERS ",foundUser)
    //
    //     if (!foundUser) {
    //
    //         res.status(StatusCodes.NOT_FOUND).json({
    //             success: false,
    //             message: "Users Not Found in Database ",
    //         })
    //
    //     } else {
    //
    //         res.status(StatusCodes.ACCEPTED).json({
    //             success: true,
    //             message: "Users Found ",
    //             data: foundUser,
    //         })
    //     }
    //
    //
    // } catch (e) {
    //
    //     console.log("Error ", e)
    //     next(e.message)
    //
    // }

}

exports.fetchOneTour = (req, res, next) => {

    console.log("Verification Code is ",req.verifyCode)

    // TODO Convert String to Integer Method 1
    const id = req.params.id * 1;

    // TODO Convert String to Integer Method 2
    // const id2=parseInt(req.params.id);

    const foundTour = tours.find((tour) => {
        return tour.id === id;
    })
    if (!foundTour) {
        res.status(404).json({
            status: "fail",
            message: "Tour Not Found",
        })
    }

    console.log("Found Tour ", foundTour);

    res.status(200).json({
        status: "success",
        message: "Found Matching Tour",
        data: {
            tour: foundTour
        }
    })
}

exports.checkBody=(req,res,next)=>{

    console.log("Request if Varified")
    req.verifyCode=911;

    next()



}

exports.updateTour = (req, res, next) => {

    // TODO Convert String to Integer Method 1
    const id = req.params.id * 1;

    return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Tour Updated ",
    })

}

exports.deleteTour = (req, res, next) => {

    // TODO Convert String to Integer Method 1
    const id = req.params.id * 1;

    console.log("You are Going to Remove "+id)

    const foundTours=tours.filter((tour) => {
        return tour.id !== id;
    })

    console.log("After Removing Tour ",foundTours)


    return res.status(StatusCodes.NO_CONTENT).json({
        status: "success",
        message: "Tour Deleted ",
        data:null
    })

}

