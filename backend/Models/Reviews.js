const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports=Review;