const express = require('express');
const { newData, getData, getDataID, dataUpdate } = require('../controllers/officeControllers');
const router = express.Router();


router.post("/", newData)
router.get("/", getData)
router.get("/get-one/:id", getDataID)
router.patch("/update-one/:id", dataUpdate)


module.exports = router