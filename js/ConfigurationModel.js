var Configuration = Backbone.Model.extend({
	
	defaults: function() {
		return {
			name: 			'',
			description: 	'',
			version: 		'',
			parameters:     new Parameters()
		};
	},
	
	validate: function(attr) {
		var nameRegEx = /^[A-Za-z]+$/;
		var errors = {};
		
		if (attr.name === '' || attr.description === '' || attr.version === '' || (!nameRegEx.test(attr.name))) {
			errors.nameConf = 'error';
		}
		
		if (typeof attr.parameters !== 'undefined') {
			for (var i = 0; i < attr.parameters.length; i++) {
				checkParams(attr.parameters[i], errors);
			}
		}
		
		if (_.keys(errors).length > 0) {
			return errors;
		}
	}
});

function checkParams(obj, errors) {
	for (o in obj) {
		if (obj.hasOwnProperty(o)) {
			if (typeof obj[o] === 'object') {
				checkParams(obj[o], errors);
			}
			else {
				if ((o === 'name' || o === 'description' || o === 'value') && obj[o] === '') {
					errors.nameParam = 'error';
				}
			}
		}
	}
}