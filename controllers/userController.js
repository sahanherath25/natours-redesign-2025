
// TODO Route Handlers

const fs=require('fs');
const {StatusCodes} = require("http-status-codes");
const path = require("path");

// TODO Data is in JSON Form fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)

// TODO We need to Convert JSON ==>JavaScript

const data=fs.readFileSync(`./dev-data/data/tours-simple.json`)
const tours=JSON.parse(data)


// fs.readFile("dev-data/data/tours-simple.json","utf-8",(err, data)=>{
//
//     console.log("FILE DATA ",data)
// })



// console.log("test",test)
// const tours=JSON.parse(fs.readFileSync(`../${__dirname}/dev-data/data/tours-simple.json`));

exports.getAllUsers = async (req, res, next) => {


    console.log("ROUTE HIT THE USERS")

    try {

        // const foundUser = await User.find();

        // console.log("USERS ",foundUser)

        // if (!foundUser) {
        //
        //     res.status(StatusCodes.NOT_FOUND).json({
        //         success: false,
        //         message: "Users Not Found in Database ",
        //     })
        //
        // } else {
        //
        //     res.status(StatusCodes.ACCEPTED).json({
        //         success: true,
        //         message: "Users Found ",
        //         data: foundUser,
        //     })
        // }

        res.status(StatusCodes.OK).json({
            status: "success",
            message: "Users Found ",
            results:tours.length,
            data:{
                tours
            }
        })


    } catch (e) {

        console.log("Error ", e)
        next(e.message)

    }

}