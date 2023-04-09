const express = require('express')
const router = express.Router()
const service = require('../services/user.service');

router.post('/login', async (req, res, next) => {
    try {
        let obj=req.body;
        var response = await service.login(obj);
        res.json(response)
    }
    catch (err) {
        res.json(err);
        // res.sendStatus(err.error.code).json({"message":"Invalid User"});
    }
})

router.get('/', (req, res, next) => {
    try {
        var response = service.getuser();
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let obj=req.body;
        var response = await service.createUser(obj);
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

function verifyToken(req, res, next) {
    const token = req.header(tokenHeaderKey);
    if (typeof token != 'undefined') {
        req.token = token;
        jwt.verify(req.token, jwtSecretKey, (err, authData) => {
            if (err)
                res.send({ err })
            else
                next();
        });
    }
    else
        res.status(401).send({ result: "Unauthorized" })
}

module.exports = router;