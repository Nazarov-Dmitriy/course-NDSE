const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/file')
const Advertisement = require('../models/Advertisement')


router.get('/api/advertisements', async (req, res) => {
    try {
        res.render("advertisement/index", {
            title: "Обьявления",
            advertisement: 'advertisement',
            user: req.user
        });
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get('/api/advertisements/create', async (req, res) => {
    try {
        res.render("advertisement/create", {
            title: "Создать обьявление",
            advertisement: 'advertisement',
            user: req.user
        });
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/api/advertisements/create', fileMulter.array('images', 12), async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const {
        shortText,
        description,
        tags,
    } = req.body
    const images = req.files;
    const isDeleted = false;
    const createdAt =  new Date();
    const newAdvertisement = new Advertisement({
        shortText,
        description,
        createdAt,
        tags,
        isDeleted
    })
    try {
        // await newAdvertisement.save();
        // res.send(images)
        res.redirect('/api/advertisements/create')
    } catch (e) {
        res.status(500).json(e)
    }
    // const advertisements = await Advertisement.find(params);
})

module.exports = router