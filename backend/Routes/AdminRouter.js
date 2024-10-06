const router=require('express').Router();
const {getUser,deleteUser,changeRole} = require("../Controllers/Admin");
const isAdmin=require('../Middlewares/Admin')

const ensureAdminAuthentication=require('../Middlewares/AdminAuth')

router.get('/getUsers',ensureAdminAuthentication,getUser)
router.post('/delete/:id',ensureAdminAuthentication,deleteUser)
router.post('/changeRole/:id',ensureAdminAuthentication,changeRole)

module.exports=router;