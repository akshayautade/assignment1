const Project = require('../models/Project-model');
const utils = require('./utils');

exports.getProject = async function (options) {
    return new Promise(async function (resolve, reject) {
        try {
            let totalRecords = await Project.find().count()
            const project = await Project.find({}, {}, options); // coll.find(criteria,projection,options)
            let obj = {
                totalRecords: totalRecords,
                project: project
            }
            resolve(obj)
        } catch (err) {
            reject(err)
        }
    })
}

exports.getAllCount = async function () {
    return new Promise(async function (resolve, reject) {
        try {
            let registeredArr = [{
                $match: {
                    "status": "Registered"
                }
            }, {
                $group: {
                    _id: "$status",
                    count: {
                        $sum: 1
                    }
                }
            }]
            var totalRegistered = await Project.aggregate(registeredArr)
            let statusArr = [{
                $match: { "projectStatus": { "$exists": true, "$ne": null } }
            }, {
                $group: {
                    _id: "$projectStatus",
                    count: {
                        $sum: 1
                    }
                }
            }]
            let count = await Project.aggregate(statusArr)
            count.push(totalRegistered[0])
            resolve(count)
        } catch (err) {
            reject(err)
        }
    })
}
exports.deptWiseCount = async function () {
    return new Promise(async function (resolve, reject) {
        try {

            let closedArr = [
                {
                    $match: { "projectStatus": "Closed" }
                },
                {
                    $group: {
                        _id:  "$dept" ,
                        count: { $sum: 1 }
                    }
                }
            ]
            let registeredArr = [
                {
                    $match: { "status": "Registered" }
                },
                {
                    $group: {
                        _id:  "$dept" ,
                        count: { $sum: 1 }
                    }
                }
            ]
            let closed = await Project.aggregate(closedArr)
            let registered = await Project.aggregate(registeredArr)

            let arr=[]
            closed.forEach(dept=>{
                let obj={
                    deptName:'',
                    closed:0,
                    registered:0
                }
                obj.deptName=dept._id
                obj.closed=dept.count
                registered.forEach(dept2=>{
                    if(dept._id===dept2._id)
                    obj.registered =dept2.count
                })
                arr.push(obj)
            })


            resolve(arr)
        } catch (err) {
            reject(err)
        }
    })
}

exports.closureDelayCount = async function () {
    return new Promise(async function (resolve, reject) {
        try {
            let count = 0
            let today = new Date();

            let runningArr = [{
                $match: {
                    "projectStatus": "Running"
                }
            }]
            let runningProjects = await Project.aggregate(runningArr);

            runningProjects.map(res => {
                let endDate = new Date(res.endDate);
                if (today > endDate)
                    count++
            })
            resolve({ count: count })
        } catch (err) {
            reject(err)
        }
    })
}

exports.createProject = async function (obj) {
    return new Promise(async function (resolve, reject) {
        try {

            const project = await Project.create(obj);
            resolve(project)
        } catch (err) {
            reject(err)
        }
    })
}

exports.getSingleProject = async function (doc) {
    return new Promise(async function (resolve, reject) {
        const projectId = doc._id;
        try {
            const project = await Project.findById(projectId);
            resolve(project);
        } catch (err) {
            reject(err);
        }
    });
}

exports.deleteProject = async function (doc) {
    return new Promise(async function (resolve, reject) {
        const projectId = doc._id;
        try {
            const project = await User.findById(projectId)
            if (project) {
                const res = await Project.remove({ "_id": projectId }, doc);
                resolve(res);
            }
        } catch (err) {
            reject(err);
        }
    })
}

exports.updateProject = async function (id, doc) {
    return new Promise(async function (resolve, reject) {
        const projectId = id;
        try {
            const project = await Project.updateOne({ "_id": projectId }, doc);
            resolve(project);
        } catch (err) {
            reject(err);
        }
    })
}
