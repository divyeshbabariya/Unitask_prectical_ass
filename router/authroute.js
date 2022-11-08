const router = require('express').Router();
const {authController,
    login,
    getuserById,
    logout} = require('../controller/authcontroller')

const {verify,
    userToken} = require('../middleware/authmiddleware');
router.post("/users/signup",authController);
router.post("/users/login",login);
router.get("/users/:id",verify,getuserById);
router.post("/users/logout/:token",userToken,logout)


module.exports=router;