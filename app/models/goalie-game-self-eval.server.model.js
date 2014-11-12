'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Goalie game self eval Schema
 */
var GoalieGameSelfEvalSchema = new Schema({
	name 		: 		{type: String, trim: true},
	opponent 	: 		{type: String, required: 'required', trim: true},
	location 	: 		{type: String, required: 'required', trim: true},
	when 		: 		{type: Date, default: Date.now, required: 'required'},
	winloss		: 		{type: String, enum: ['win', 'loss'], required: 'required'},
	myrating	: 		{type: Number, min: 0, max: 10, required: 'required'},
	gaa 		: 		{type: Number, min: 0, max: 9, required: 'required'},
	shots 		: 		{type: Number, min: 0, max: 72},
	ga1			: 		{type: String},
	ga1fix		: 		{type: String},
	ga2			: 		{type: String},
	ga2fix		: 		{type: String},
	ga3			: 		{type: String},
	ga3fix		: 		{type: String},
	ga4			: 		{type: String},
	ga4fix		: 		{type: String},
	ga5			: 		{type: String},
	ga5fix		: 		{type: String},
	ga6			: 		{type: String},
	ga6fix		: 		{type: String},
	ga7			: 		{type: String},
	ga7fix		: 		{type: String},
	toworkon	: 		{type: String},
	created: {type: Date, default: Date.now},
	user: {type: Schema.ObjectId,ref: 'User'}
});

mongoose.model('GoalieGameSelfEval', GoalieGameSelfEvalSchema);