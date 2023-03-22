const express = require('express')
const router = express.Router()
const service = require('../services/project.service');



router.get('/count', async (req, res, next) => {
    try {
        var response = await service.getAllCount();
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})
router.get('/closureDelayCount', async (req, res, next) => {
    try {
        var response = await service.closureDelayCount();
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})
router.get('/deptWiseCount', async (req, res, next) => {
    try {
        var response = await service.deptWiseCount();
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.get('/', async (req, res, next) => {
    try {
        let doc = req.query;
        let page;
        if (doc && doc.page) {
            page = doc.page;
        }
        let sort ={}// { createdDate: 'desc' };
        sort[doc.sortBy] = 'asc';
        let options = { sort: sort, skip: page ? +page * 10 - 10 : 0, limit: 10 };
        var response = await service.getProject(options);
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})
router.get("/:projectId", async (req, res) => {
    try {
        var response = service.getSingleProject();
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let obj=req.body;
        var response = await service.createProject(obj);
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.delete("/:projectId", async (req, res) => {
    try {
        let obj=req.body;
        var response = await service.deleteProject(obj);
        res.json(response)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.put("/:projectId", async (req, res) => {
    try {
        let projectId = req.params.projectId;
        let obj=req.body;
        var response = await service.updateProject(projectId,obj);
        res.json(response)
    }
    catch (err) {
        res.sendStatus(err.error.code);
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