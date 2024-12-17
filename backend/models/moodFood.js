import mongoose from "mongoose";

const schema = new mongoose.Schema({
    happy: {
        type: [String],
        default: ['Pizza', 'Chocolate', 'Ice Cream']
    },
    bored: {
        type: [String],
        default: ['Chips', 'Cookies', 'Popcorn']
    },
    stressed: {
        type: [String],
        default: ['Comfort Food', 'Pizza', 'Chocolate Cake'] 
    },
    sad: {
        type: [String],
        default: ['Ice Cream', 'Soup', 'Bread'] 
    },
    lonely: {
        type: [String],
        default: ['Pasta', 'Tea', 'Sandwich']
    },
    tired: {
        type: [String],
        default: ['Coffee', 'Tea', 'Fruit Salad'] 
    },
    frustrated: {
        type: [String],
        default: ['Fried Chicken', 'Burgers', 'Donuts'] 
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'please provide user']
    }
});

export const MoodFood = mongoose.model('MoodFood', schema);