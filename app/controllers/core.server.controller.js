'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};

// exports.hackernews = function () {
	

// 	request('https://news.ycombinator.com', function (error, response, html) {
// 	  if (!error && response.statusCode === 200) {
// 	    console.log(html);
// 	  }
// 	});



// };