import mongoose from "mongoose";

const schema = new mongoose.Schema({
    happy: {
        type: [String],
        default: [
            'Gulab Jamun',
            'Jalebi',
            'Chicken Biryani',
            'Butter Chicken',
            'Kheer'
        ]
    },
    bored: {
        type: [String],
        default: [
            'Samosa',
            'Kachori',
            'Pani Puri',
            'Bhelpuri',
            'Aloo Tikki'
        ]
    },
    stressed: {
        type: [String], 
        default: [
            'Dal Makhani',
            'Rajma Chawal',
            'Khichdi',
            'Palak Paneer',
            'Gajar ka Halwa'
        ]
    },
    sad: {
        type: [String],
        default: [
            'Rasam',
            'Khichdi',
            'Dal Tadka',
            'Kheer',
            'Doodh Peda'
        ]
    },
    lonely: {
        type: [String],
        default: [
            'Paneer Tikka Masala',
            'Biryani',
            'Dal Makhani',
            'Aloo Paratha',
            'Lassi'
        ]
    },
    tired: {
        type: [String],
        default: [
            'Idli-Sambar',
            'Upma',
            'Poha',
            'Fruit Salad',
            'Ragi Mudde'
        ]
    },
    frustrated: {
        type: [String],
        default: [
            'Vada Pav',
            'Pakora',
            'Bhaji',
            'Kachori',
            'Samosa'
        ]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
        unique: true
    }
});

export const MoodFood = mongoose.model('MoodFood', schema);