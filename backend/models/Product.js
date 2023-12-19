const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id:   String,
            url: String,
        },
    ],
    color: [],
    tags: [String],
    ratings: {
        type: Number, // Change to Number to represent the total number of ratings
        default: 0,
    },
    totalrating: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
