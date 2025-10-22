const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require('colors');



dotenv.config({
    path:"./config.env",

});

const PORT = process.env.PORT || 3010;

// const mongoDBURI = process.env.MONGODB_URI_LOCAL.replace("<PASSWORD>", process.env.MONGODB_PASSWORD);
// const mongoDBURI = process.env.MONGODB_DOCKER_URI.replace("<PASSWORD>", process.env.MONGODB_PASSWORD);


// TODO  ATLAS DB
const mongoDBURI = process.env.MONGODB_PROD_URI.replace("<PASSWORD>", process.env.MONGODB_PASSWORD);

// const mongoDBURI = process.env.LOCAL_DATABASE;

// const mongoDBURI = process.env.MONGODB_DOCKER_URI

// console.log("MongoDB URI: " + mongoDBURI);

console.log("Mode is ",process.env.NODE_ENV);

async function startServer() {
    try {
        await mongoose.connect(mongoDBURI);
        console.log(colors.brightGreen("✅ MongoDB Connected!").underline.bold);

        app.listen(PORT, () => {
            console.log(colors.brightWhite.bold("🚀 Server running on port ")+colors.red(PORT).bold);
        });
    } catch (err) {
        console.error(colors.brightRed(`❌ Failed to start server: ${err}`));
        process.exit(1); // optional: exit process if DB fails
    }
}

startServer()

