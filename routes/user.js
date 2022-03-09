const express = require('express');
const app = express();
const router = express.Router();
const { celebrate, Joi, errors, Segments } = require('celebrate');
app.use(errors());
const conntroller = require('../controllers/user');

router.post('/createuser', celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
    })
}), conntroller.createUser);

router.get('/getuser', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        username: Joi.string().required(),
        device_id: Joi.string().required()
    })
}), conntroller.getUser);

router.post('/updateuser', celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        device_id: Joi.string().required(),
        newusername: Joi.string(),
        new_device_id: Joi.string(),
        newscore: Joi.number(),
    })
}), conntroller.updateUser);

module.exports = router;