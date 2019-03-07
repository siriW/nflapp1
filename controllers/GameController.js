const Game = require('../models/Game');

module.exports = {

    get: (params) => {
        return new Promise((resolve, reject) => {
            Game.find(params)
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
            Game.findById(id)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(new Error('Game ' + id +' not found'))
                })
        })
    },

    post: (params) => {
        return new Promise((resolve, reject) => {
            Game.create(params)
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
            Game.findByIdAndUpdate(id, params, {new:true})
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
            Game.findByIdAndRemove(id)
                .then(() => {
                    resolve({id: id})
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

};