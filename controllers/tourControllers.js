
// const fs = require("fs");
const {StatusCodes} = require("http-status-codes");
const Tour = require("../model/tourModel");


// const data = fs.readFileSync(`./dev-data/data/tours-simple.json`)
// const tours = JSON.parse(data)

exports.addNewTour = async (req, res, next) => {

    const requestBody = req.body;
    console.log("Request Body ", requestBody);

    try {
        // const foundUser = await User.find();

        const newTour = await Tour.create(requestBody);


        if (!newTour) {

            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Users Not Found in Database ",
            })

        } else {

            console.log("Tour Created  ", newTour)

            return res.status(StatusCodes.ACCEPTED).json({
                success: true,
                message: "Users Found ",
                data: newTour,
            })
        }


    } catch (e) {

        console.log("Error ", e)
        next(e.message)

    }

}

exports.aliasTopTours = async (req, res, next) => {

    req.query.limit="5";
    req.query.sort="-ratingAverage,price";
    req.query.fields="name,price,ratingAverage,_id,difficulty";

    req.filterObject={
        limit:"5",
        sort:"-ratingAverage,price",
        fields:"name,price,ratingAverage,_id,difficulty",
    }

    req.sahan="Gard Nilus"

    console.log("Middleware 1 Executed")
    console.log("SENDING QUERY OBJ ",req.query)
    next();
}

exports.fetchOneTour = (req, res, next) => {

    console.log("Verification Code is ", req.verifyCode)

    // TODO Convert String to Integer Method 1
    const id = req.params.id * 1;

    // TODO Convert String to Integer Method 2
    // const id2=parseInt(req.params.id);

    const foundTour = Tour.find((tour) => {
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

exports.getAllTours = async (req, res, next) => {



    const parameters = req.query
    console.log("Query Parameters ", parameters)

    // let sahan=req.sahan;

    console.log("SAHAN OBJ ",sahan)

    // TODO Convert String to Integer Method 1
    // const id = req.params.id * 1;

    // TODO Convert String to Integer Method 2
    // const id2=parseInt(req.params.id);

    // TODO 1.Build the Query

    // TODO Shallow Copy of query param object
    const queryObject = {...req.query};
    const excludedFields = ["page", "sort", "limit", "fields"];

    console.log("REQuest Objeetc ",req.query)

    // console.log("Before Filtering Obj ",queryObject);

    excludedFields.forEach((ele) => {
        delete queryObject[ele]
    })

    // TODO  Convert operators like gte, lte, gt, lt to MongoDB form ($gte, $lte, etc.)
    // converts a JavaScript value to a JSON string,

    // TODO  1.B Advanced Filtering
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


    let query = Tour.find(JSON.parse(queryStr))

    console.log("Sort property ", req.query.sort)

    // TODO 2.Sorting ==> Initial Query Object
    if (req.query.sort) {
        // use split to remove , in between
        const sortBy = req.query.sort.split(",").join(" ")
        console.log("Sort By ", sortBy)
        query = query.sort(sortBy)
        //  query.sort("price ratingAverage")
    } else {
        //     TODO If user doesnt specify a sort property
        //     TODO  Newest one appears 1st
        query = query.sort("price")

    }

    // TODO 3. Fields Limiting

    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ")
        console.log("Fields ", fields)
        query = query.select("name duration price rating");
    } else {

        query = query.select(" name id createdAt price rating");
    }

    // TODO Page=2 &limit=10

    // Page 1=1-10
    // Page 2:11-20
    // Page 2:21-30

    //TODO  To get the Page 2 results we need to skip 10 results

    // TODO We need to Calculate  the Page and  Limit

    // 4) TODO Pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;

    // TODO assume page 3 results need
    const skip = (page - 1) * limit;

    console.log("Page Requesting ", page)
    console.log("Page Limit  ", limit)

    query = query.skip(skip).limit(limit);

    // TODO Chaining other method for query
    // query=Tour.find(queryObject)
    //     .where("duration")
    //     .equals(5)
    //     .where("difficulty")
    //     .equals("easy")

    // TODO To get Total records

    if(req.query.page){
        const nuOfTours=await Tour.countDocuments();
    //     no of skip> no of tours throw error
    //     Throw error
        if(skip>=nuOfTours) throw new Error("Page Not Exists")
    }

    // TODO Execute the Query
    const foundTours = await query;

    // TODO  query.sort().select().skip().limit()  all methods chaining and applying in query

    // const foundTours =await Tour.find().where("duration").equals(5).where("difficulty").equals("easy");

    if (!foundTours) {
        return res.status(404).json({
            status: "fail",
            message: "Tour Not Found",
        })
    }

    // console.log("Found Tours ", foundTours);

    res.status(200).json({
        status: "success",
        // message: `Found ${foundTours.length} Tours `,
        data: {
            // tour: foundTours
        }
    })
}

exports.checkBody = (req, res, next) => {

    console.log("Request if Varified")
    req.verifyCode = 911;

    next()

}
exports.sahanTest = (req, res, next) => {

    console.log("Request if Varified",req.query)
    console.log("Obj sahan ",req.sahan)
    console.log("Filter Objetc ",req.filterObject)
    req.verifyCode = 911;

    res.status(200).json({
         status:"success",
         message: "Created",
    })

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

    console.log("You are Going to Remove " + id)

    const foundTours = tours.filter((tour) => {
        return tour.id !== id;
    })

    console.log("After Removing Tour ", foundTours)


    return res.status(StatusCodes.NO_CONTENT).json({
        status: "success",
        message: "Tour Deleted ",
        data: null
    })

}


// TODO Reading data from the file
// exports.addNewTour = async (req, res, next) => {
//
//     console.log("ROUTE HIT THE TOURS")
//     const requestBody = req.body;
//     console.log("Request Body ", requestBody);
//
//     const newId = tours[tours.length - 1].id + 1
//
//     const newTour = Object.assign({id: newId}, req.body)
//
//     // TODO Adding New TOur Object to the  Array
//     tours.push(newTour);
//
//     // TODO Writing Data to the FIle
//     fs.writeFile(`./dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
//
//         if (err) {
//             res.end(err)
//         }
//
//         res.status(StatusCodes.CREATED).json({
//             status: "success",
//             message: "New Tour Added",
//             data: {
//                 tours
//             }
//         })
//     })
//
//     //
//     // try {
//     //
//     //     // const foundUser = await User.find();
//     //
//     //
//     //
//     //     console.log("USERS ",foundUser)
//     //
//     //     if (!foundUser) {
//     //
//     //         res.status(StatusCodes.NOT_FOUND).json({
//     //             success: false,
//     //             message: "Users Not Found in Database ",
//     //         })
//     //
//     //     } else {
//     //
//     //         res.status(StatusCodes.ACCEPTED).json({
//     //             success: true,
//     //             message: "Users Found ",
//     //             data: foundUser,
//     //         })
//     //     }
//     //
//     //
//     // } catch (e) {
//     //
//     //     console.log("Error ", e)
//     //     next(e.message)
//     //
//     // }
//
// }
