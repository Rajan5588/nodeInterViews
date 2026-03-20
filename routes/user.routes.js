const express=require("express");

const { login, register, resfressToken } = require("../controllers/auth.controller");

const router=express.Router();


router.post("/register",register)
router.post("/login",login);
router.post("/refresh-token",resfressToken)


module.exports=router;