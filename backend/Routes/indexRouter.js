const express=require('express')
const taskRouter=  require('./TaskRouter.js');
const authRoutes=  require('./AuthRouter.js');
const productRoutes=require('./ProductRouter.js')
const orderRouter=require('./OrderRouter.js')
const reviews=require('./Reviews.js')
const ensureAuthentication=  require('../Middlewares/Auth.js');


const router =express.Router();

router.use('/auth',authRoutes);
router.use('/tasks',taskRouter);
router.use('/products',productRoutes);
router.use('/orders',orderRouter);
router.use('/reviews',reviews);

module.exports=router;

