const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../model/tourSchema');

//TODO TO Read the environment variables file
const dotenv = require('dotenv');

dotenv.config({
  path: `../../config.env`
});

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


const DB = "mongodb://localhost:27017/natours-test"
// const DB2 =process.env.LOCAL_DATABASE

// console.log("DB ",DB2)

// mongoose.connect(DB,{
//
// }).then(()=>{
//   console.log("Connected TO DB Sucessfully");
// })

// const connectToDB=async ()=>{
//     try {
//       await mongoose.connect(DB)
//       console.log("SUCESSFULLY CONNECTED TO MONGODB Database")
//       }catch (e) {
//         console.log("Error ",e)
//       }
// }

mongoose.connect(DB).then(()=>{
  console.log("SUCESSFULLY CONNECTED TO MONGODB Database")
}).catch((e)=>{
  console.log("Error ",e)
})

// connectToDB();

console.log("DIR NAME CURRENT ")
console.log(`${__dirname}`)

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// console.log("TOUS LOADED ",tours)

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


