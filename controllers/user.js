const user = require('../models/user');
const mongoose = require('mongoose');


exports.createUser = (req, res) => {
    user.findOne({ name: req.body.username })
        .then((doc) => {
            if (doc) return res.status(403).send("user with this name already exists");
            const deviceId = new mongoose.Types.ObjectId();
            const userobj = {
                name: req.body.username,
                score: 0,
                device_id: deviceId
            };
            user.create(userobj, function (err, createdDoc) {
                if (err) return res.status(500).send(err);
                return res.status(200).send(createdDoc);
            });
        })
};

exports.getUser = (req, res) => {
    user.findOne({ name: req.query.username, device_id: req.query.device_id })
        .then((doc) => {
            if (!doc) return res.status(404).send("user not found");
            return res.status(200).send(doc);
        })
};

exports.updateUser = (req, res) => {
    const update = {
        "$set": {
            ...(req.body.newusername ? { name: req.body.newusername } : {}),
            ...(req.body.new_device_id ? { device_id: req.body.new_device_id } : {}),
            ...(req.body.newscore ? { score: req.body.newscore } : {})
        }
    };
    const options = { new: true };
    user.findOneAndUpdate({ name: req.body.username, device_id: req.body.device_id }, update, options)
        .then(updatedDocument => {
            if (!updatedDocument) return res.status(404).send("user not found");
            return res.status(200).send(updatedDocument);
        })
        .catch(err => {
            return res.status(403).send(err.code === 11000 ? "user with that property already esists: " + err.errmsg : err)
        })
};
