var express = require('express');
const request = require('request');

let GameModel = require('../models/Game');

var router = express.Router();
const controllers = require('../controllers');


// GET, POST, PUT, DELETE
router.get('/', (req, res) => {
	let play_weeks_set = [];
	let bye_weeks = [];

	const season = req.query.season;
	const team = req.query.team;

	console.log(req.query);

	const controller = controllers["game"];

	if (req.query == null) {
		res.json({
			confirmation: 'fail',
			message: 'Invalid Params'
		});
		return
	}

	play_weeks = [];
	play_weeks_set = [];

	GameModel
		.find({season: season})
		.then(doc => {
			for(var item of doc) {
				play_weeks.push(item.week);
			}
			play_weeks_set = new Set(play_weeks);
			console.log("all: ", play_weeks_set);

			GameModel.find({ $or:[{season: season, 'homeTeam.abbr' : team }, {season: season,'visitorTeam.abbr' : team}]})
				.then(doc => {
					var array = [];
					for(var item of doc) {
						array.push(item.week);
					}
					var teamPlayedWeeks_set = new Set(array);
					console.log("team:", teamPlayedWeeks_set);

					for(var week of play_weeks_set) {
						console.log(week, !teamPlayedWeeks_set.has(week));
						if(!teamPlayedWeeks_set.has(week)){
							bye_weeks.push(week);
						}
					}

					console.log("bye_weeks: ", bye_weeks);

					res.json({
						confirmation: 'success',
						bye_weeks: bye_weeks
					})
				})
				.catch(err => {
					res.json({
						confirmation: 'fail',
						message: err.message
					})
				});

		})
		.catch(err => {
			console.log(err) });
});


module.exports = router;
