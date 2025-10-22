const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../model/tourModel');

//TODO TO Read the environment variables file
const dotenv = require('dotenv');

dotenv.config({
  path: `../../config.env`
});

// const DB = process.env.MONGODB_PROD_URI.replace('<PASSWORD>', process.env.MONGODB_PASSWORD);
const DB ="mongodb+srv://sahanherath555:BHtO1ifLyc8ZTquQ@cluster0.4ohb8bf.mongodb.net/reddit-clone?retryWrites=true&w=majority&appName=Cluster0";

// const DB = "mongodb://localhost:27017/natours-redesign"

// const DB2 =process.env.LOCAL_DATABASE

// console.log("DB ",DB2)


mongoose.connect(DB).then(()=>{
  console.log("SUCCESSFULLY CONNECTED TO MONGODB Database")
}).catch((e)=>{
  console.log("Error ",e)
})

// connectToDB();

console.log("DIR NAME CURRENT ")
console.log(`${__dirname}`)

// TODO Read JSON FIle
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

console.log("Loaded Data Form the File ",tours)

// TODO import Data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Successfully Loaded");
  } catch (e) {
    console.log('ERROR ', e);
  }
  process.exit()
};



//TODO DELETE ALL DATA FROM Tour Collection
const deleteData=async ()=>{
  try {
    await Tour.deleteMany();
    console.log("Data Deleted ");

  } catch (e) {
    console.log('ERROR ', e);
  }
  process.exit()
}


console.log("PROCESS ENV",process.argv[2]);


if(process.argv[2]==="--import"){
  importData();
}else if (process.argv[2]==="--delete") {
  deleteData()
}


