const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const controller = require("../controllers/index.js");

router.get("/", controller.index);
router.post("/insert-users", controller.insertUsers);
router.get("/users", controller.getAllUsers);
router.post('/insert-bankdetails',controller.insertBankDetails);
router.get('/getbankdetails',controller.getBankDetails)

//router.post('/insert-users-harshit',controller.insertUserHarshitMethod)

module.exports = router;
