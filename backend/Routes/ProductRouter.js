const express=require('express');

const router=express.Router();
const Product=require('../Models/Products')

router.post('/products', async (req, res) => {
    const product = new Product(req.body);
    try {
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all products
  router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    console.log('Request received for product details:', productId);

    try {
        const product = await Product.findById(productId); // Use findById for MongoDB

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/search', async (req, res) => {
  const { query } = req.query; // Extract the search query

  try {
      // Use regex for case-insensitive search in name and description
      const products = await Product.find({
          $or: [
              { name: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } }
          ]
      });

      res.json(products);
  } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


  module.exports=router;