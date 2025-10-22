const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name for Tour"],
        unique: true,

    },
    duration: {
        type: Number,
        required: [true, "A Tour must have a Duration"]
    },
    rating: {
        type: Number,
        default: 4.5
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A Tour Must Have Group Size"]
    },
    price: {
        type: Number,
        required: [true, "Tour must have a price"],
    },
    priceDiscount: {
        type: Number,
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A Tour Must have a Summery"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "Tour Must Have a Image"]
    },
    images: [String],
    difficulty: {
        type: String,
        required: [true, "Tour Must HAv a Difficulty"],
        enum: {
            values: ["easy", "medium", "difficult"],
            message: "YOu Must Only Provide Either easy , medium , Difficult on this  Difficult Field"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false
    },
    startDates: [Date],

})

const Tour = mongoose.model("Tour", TourSchema)
module.exports = Tour;