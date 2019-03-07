var express = require('express');
const request = require('request');

var router = express.Router();
const controllers = require('../controllers');

// GET, POST, PUT, DELETE
router.get('/:resource', (req, res) => {
	const resource = req.params.resource;
	const controller = controllers[resource];
	const filters = req.query;

	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		});
		return
	}

	controller.get(filters)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
});

router.get('/:resource/:id', (req, res) => {
	const resource = req.params.resource;
	const id = req.params.id;

	const controller = controllers[resource];
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		});

		return
	}

	controller.getById(id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
});

// POST - create new entities:
router.post('/:resource', (req, res) => {
	const resource = req.params.resource;
	const controller = controllers[resource];
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		});

		return
	}

	controller.post(req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
});

// PUT - updating resources
router.put('/:resource/:id', (req, res) => {
	const resource = req.params.resource;
	const controller = controllers[resource];
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		});

		return
	}

	controller.put(req.params.id, req.body)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
});

// DELETE
router.delete('/:resource/:id', (req, res) => {
	const resource = req.params.resource;
	const controller = controllers[resource];
	if (controller == null){
		res.json({
			confirmation: 'fail',
			message: 'Invalid Resource'
		});

		return
	}

	controller.delete(req.params.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
});



// GET, POST, PUT, DELETE
router.get('/ingest/:season', (req, res) => {
	const season = req.params.season;

	if (typeof season != "number") {
		res.json({
			confirmation: 'fail',
			message: 'Invalid Season'
		});
		return
	}

	request('https://api.ngs.nfl.com/league/schedule?season='+season, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		console.log(body.url);
		console.log(body.explanation);

		controller.post(body.data)
			.then(data => {
				res.json({
					confirmation: 'success',
					data: data
				})
			})
			.catch(err => {
				res.json({
					confirmation: 'fail',
					message: err.message
				})
			})

	});

});


module.exports = router;


//
// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
//
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
// var User = require('../models/User');
//
// // CREATES A NEW USER
// router.post('/', function (req, res) {
// 	User.create({
// 			name : req.body.name,
// 			email : req.body.email,
// 			password : req.body.password
// 		},
// 		function (err, user) {
// 			if (err) return res.status(500).send("There was a problem adding the information to the database.");
// 			res.status(200).send(user);
// 		});
// });
//
// // RETURNS ALL THE USERS IN THE DATABASE
// router.get('/', function (req, res) {
// 	User.find({}, function (err, users) {
// 		if (err) return res.status(500).send("There was a problem finding the users.");
// 		res.status(200).send(users);
// 	});
// });
//
// // GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', function (req, res) {
// 	User.findById(req.params.id, function (err, user) {
// 		if (err) return res.status(500).send("There was a problem finding the user.");
// 		if (!user) return res.status(404).send("No user found.");
// 		res.status(200).send(user);
// 	});
// });
//
// // DELETES A USER FROM THE DATABASE
// router.delete('/:id', function (req, res) {
// 	User.findByIdAndRemove(req.params.id, function (err, user) {
// 		if (err) return res.status(500).send("There was a problem deleting the user.");
// 		res.status(200).send("User: "+ user.name +" was deleted.");
// 	});
// });
//
// // UPDATES A SINGLE USER IN THE DATABASE
// router.put('/:id', function (req, res) {
// 	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
// 		if (err) return res.status(500).send("There was a problem updating the user.");
// 		res.status(200).send(user);
// 	});
// });
//
//
// module.exports = router;