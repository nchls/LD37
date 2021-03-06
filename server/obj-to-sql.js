var _ = require('lodash');

var room = require('../models/room');
var player = require('../models/player');
var playerroom = require('../models/playerroom');
var wave = require('../models/wave');
var deployment = require('../models/deployment');

init = function() {
	var output = '';
	
	_.forEach([room, player, playerroom, wave, deployment], function(model) {
		output += getSQL(model) + '\n';
	})

	console.log(output);
},

getSQL = function(model) {
	var output = '',
		columns = [];

	columns.push('"id" serial primary key');
	_.forEach(model.schema, function(field, fieldName) {
		var validation = field.dbValidation || field.validation || {};

		var columnDef = ['"' + fieldName + '"', field.type];

		if (validation.maxLength) {
			columnDef.push('(' + validation.maxLength +')');
		}

		if (field.type === 'numeric' && validation.maxDigits && validation.decimalPlaces) {
			columnDef.push('(' + (validation.maxDigits + validation.decimalPlaces) + ', ' + validation.decimalPlaces + ')');
		}

		if (field.foreignModel !== undefined) {
			columnDef.push('references "' + field.foreignModel + '"');
		}

		if (!validation.canBeNull) {
			columnDef.push('not null');
		}

		if (field.default !== undefined) {
			columnDef.push('default ' + getDefault(field));
		}

		columns.push(columnDef.join(' '));
	});

	output += 'create table "' + model.name + '" (\n\t';
	output += columns.join(',\n\t') + '\n';
	output += ');'

	return output;
},

getDefault = function(field) {
	if (field.type === 'boolean') {
		if (field.default) {
			return 'TRUE';
		} else {
			return 'FALSE';
		}
	} else if (field.type.startsWith('timestamp')) {
		if (field.default === 'now') {
			return "(now() at time zone 'America/New_York')";
		}
	}
	return field.default;
};

init();



