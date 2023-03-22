const User = require('../models/User-model');
const utils = require('./utils');

const jwt = require('jsonwebtoken');
const jwtSecretKey = 'My-Key';

exports.getuser = async function () {
    return new Promise(async function (resolve, reject) {
        try {
            const users = await User.find();
            resolve(users)
        } catch (err) {
            reject(err)
        }
    })
}

exports.login = async function (obj) {
    return new Promise(async function (resolve, reject) {
        try {
            const user = await User.find({ email: obj.email });
            if (user && user[0] && user[0]._doc.email === obj.email && user[0]._doc.password === obj.password) {
                const token = jwt.sign({ email: user[0].email },
                    jwtSecretKey, { expiresIn: '24h' });
                resolve({
                    token: token,
                    expiresIn: 86400,
                    email: user[0]._doc.email,
                });
            }
            else
                reject(utils.createErrorResponse(401,'Invalid username or password'))
                // res.status(401).send({ message: 'Invalid username or password' });
        } catch (err) {
            // res.json(err);
            reject(utils.createErrorResponse(500,'Internal Server Error'))
        }
    })
}

exports.createUser = async function (obj) {
    return new Promise(async function (resolve, reject) {
        try {
            
            const users = await User.create(obj);
            resolve(users)
        } catch (err) {
            reject(err)
        }
    })
}
