var env = require('../readenv');
var jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    jwt.verify(req.body.token, env.jwt_pass, (err, encoded) => {
        if (err) return res.status(403).send("token is invalid");
        req.body.token = encoded;
        next();
    })
}

module.exports = checkToken