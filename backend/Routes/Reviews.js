const express=require('express');

const router=express.Router();

const Review=require('../Models/Reviews')
const Product=require('../Models/Products')

router.post('/review', async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        // Validate that the product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const review = new Review({ productId, userId, rating, comment });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/review/:productId ', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const reviews = await Review.find({ productId: product._id });
        res.status(200).json({ product, reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;