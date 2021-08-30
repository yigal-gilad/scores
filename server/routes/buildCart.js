var express = require('express');
var app = express();
var router = express.Router();
var { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
var checkToken = require('../middlewares/checktoken');
var user = require('../models/user');
var product = require('../models/product')
// var ObjectId = require('mongodb').ObjectId;


// builds valid cart for the user
router.post('/buildcart', celebrate({
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().required(),
        cart: Joi.array().required()
    })
}), checkToken, (req, res) => {
    user.findById(req.body.token._id)
        .then((doc) => {
           
            const promise1 = new Promise((resolve, reject) => {
                var index = 0;
                var missings = 0;
                var cart = [];
                var reco = function () {

                    if (req.body.cart.length > index) {
                        product.findById(req.body.cart[index].product._id)
                            .then((doc2) => {
                                if (doc2) {
                            
                                    cart.push({
                                        amount: req.body.cart[index].amount,
                                        product: doc2
                                    });
                                  
                                    index += 1;
                                    reco();
                                
                                } else {
                                    missings += 1;
                                    index += 1;
                                    reco()
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                resolve({ isOk: false, missings: missings, cart: cart })
                            });

                    } else {
                       
                        resolve({ isOk: true, missings: missings, cart: cart })
                    }
                }
                reco()
            });

            promise1.then((value) => {
                if (!value.isOk) return res.status(500).send("something went wrong...");
              
                res.status(200).send({ cart: value.cart, missings: value.missings })
            })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send("something went wrong...")
        });
});

module.exports = router;