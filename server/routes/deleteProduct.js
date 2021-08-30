var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var checkToken = require('../middlewares/checktoken');
var user = require('../models/user');
var product = require('../models/product');
var settings = require('../models/settings')

// allow admin to delete a product from db
router.post('/deleteproduct', celebrate({
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
        target_id: Joi.string().required()
    })
}), checkToken, (req, res) => {
    user.findById(req.body.token._id)
        .then((doc) => {
            if (!doc) return res.status(404).send("could not find user");
            if (!["admin", "moderator"].includes(doc.role))
                return res.status(403).send("access denied");
            product.remove({ _id: req.body.target_id }, function (err) {
                if (err) return res.status(500).send("something went wrong...");
                settings.findOne({}).then((data) => {
                    if (!data) return res.status(500).send("something went wrong...");
                    data.totalproducts += 1;
                    data.save().then(function () {
                        return res.status(200)
                            .send({ messege: "item has been deleted from database" });
                    })
                });
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("something went wrong...");
        });
});

module.exports = router;