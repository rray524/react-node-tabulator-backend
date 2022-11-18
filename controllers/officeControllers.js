const recordPerPage = require("../config/pagination");
const Office = require("../models/officeModel");

const newData = async (req, res, next) => {
    const { fName, mName, lName, doj, departMent, salary } = req.body;
    if (!(fName && mName && lName && doj && departMent && salary)) {
        res.status(400).send("All fields are required")
    }
    // duplicate check
    const existingData = await Office.findOne({ fName: fName });
    // console.log(existingData);
    if (existingData) {
        res.status(400).send("Name already exists")
    }
    try {

        const data = await Office.create({
            fName, mName, lName, doj, departMent, salary
        })
        // console.log(data)
        res.status(201).json({
            data
        })

    } catch (error) {
        next(error);
    }
}

const getData = async (req, res, next) => {
    const search = req.query.search || "";
    let query;
    query = {
        "$or": [
            { "fName": { "$regex": search, "$options": "i" } },
            { "mName": { "$regex": search, "$options": "i" } },
            { "lName": { "$regex": search, "$options": "i" } },
            { "doj": { "$regex": search, "$options": "i" } },
            { "departMent": { "$regex": search, "$options": "i" } }
        ]
    }
    // asc / desc order
    let sort = req.query.sort;
    if (sort) {
        sort = req.query.sort.split(",")
    }
    else {
        sort = [sort]
    }

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1]
    }
    else {
        sortBy[sort[0]] = "asc"
    }

    try {
        const productCount = await Office.countDocuments();
        const data = await Office.find(query).sort(sortBy)
        // console.log(data)
        res.status(200).json({
            data,
            productCount

        })

    } catch (error) {
        next(error)
    }
}

const getDataID = async (req, res, next) => {
    try {
        const dataId = req.params.id;
        if (dataId) {
            const product = await Office.findById(dataId)
            res.status(200).json({
                product
            })
        }

    } catch (error) {
        next(error);
    }
}

const dataUpdate = async (req, res, next) => {
    try {
        const id = req.params.id;
        let data = await Office.findById(id);
        // console.log(product);

        const { fName, mName, lName, doj, departMent, salary } = req.body;
        // console.log(name, description, category, stock, price, attrs);

        if (fName !== undefined) {
            data.fName = fName;
        }
        if (mName !== undefined) {
            data.mName = mName;
        }
        if (lName !== undefined) {
            data.lName = lName;
        }
        if (doj !== undefined) {
            data.doj = doj;
        }
        if (departMent !== undefined) {
            data.departMent = departMent;
        }
        if (salary !== undefined) {
            data.salary = salary;
        }

        // // save to DB
        await data.save();

        res.status(200).json({
            data: data
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { newData, getData, getDataID, dataUpdate };