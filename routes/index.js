// Full Documentation - https://www.turbo360.co/docs
var express = require('express');
var router = express.Router();

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {
	res.json({text: 'This is the dynamic data. Open index.js from the routes directory to see.'})
});


module.exports = router;
