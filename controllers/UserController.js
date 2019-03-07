const User = require('../models/User');

module.exports = {

    get: (params) => {
        return new Promise((resolve, reject) => {
            User.find(params)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            User.findById(id)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(new Error('User ' + id +' not found'))
                })
        })
    },

    post: (params) => {
        return new Promise((resolve, reject) => {
            User.create(params)
                .then(data => {
                    console.log('inserted!');
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    put: (id, params) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(id, params, {new:true})
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndRemove(id)
                .then(() => {
                    resolve({id: id})
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

};