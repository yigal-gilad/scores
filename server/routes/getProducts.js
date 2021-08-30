var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var products = require('../models/product')

router.get('/getproducts', (req, res) => {
    products.find({})
        .then((doc) => {
            if (!doc.length) return res.status(404).send("no results for this search...");
            return res.status(200).send(doc);
        })
        .catch((err) => {
            console.log(err);
            if (err) return res.status(500).send("something went wrong...");
        });
});


module.exports = router;