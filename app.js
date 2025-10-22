const express = require('express');
const rateLimit=require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');

const {StatusCodes} = require("http-status-codes");
const globalErrorController=require("./controllers/errorControllers")
const app = express();

// const limitter=rateLimit({
//     max:2,
//     windowMs:60*60*1000, // 2 request per one hour rule added
//     message:"Limit Exceed Please Contact CEHP"
// })

//TODO  Enable CORS
// app.use(limitter)

// TODO Middlewares
app.use(morgan("dev"))

// TODO Adding query parser
app.set('query parser', 'extended');

app.use(cors());
// TODO Middleware
app.use(express.json());

const userRouter=require('./routes/userRoutes');
const tourRouter=require('./routes/tourRoutes');
// const authRouter=require('./routes/authRoutes');
// const restaurantRouter=require('./routes/restaurantRoutes');
// const categoryRouter=require('./routes/categoryRoutes');
// const AppError = require("./utils/AppError");
// const globalErrorHandler=require("./controllers/errorController")


app.use('/api/v1/users',userRouter);
app.use('/api/v1/tours',tourRouter);

// app.use('/api/v1/auth',authRouter);
// app.use('/api/v1/restaurants',restaurantRouter);
// app.use('/api/v1/category',categoryRouter);

// TODO  Handling Unhandled Routes => if route doesnt exists
// Express 5 we need to use /.*/ instead of *
// User * with Express 4

// app.all(/.*/,async (req,res,next)=>{
//     // let err=new Error("DDos Attack Occured");
//     // err.status="fail";
//     // err.statusCOde=404;
//     // TODO If we pass any argument to any next() method it skip all other middlewares and execute Global Error Handler
//     next(new AppError("Route Does Not Exist",404));
//
// })


// TODO Global Error Handling Middleware

// app.use(globalErrorHandler)


module.exports = app;

