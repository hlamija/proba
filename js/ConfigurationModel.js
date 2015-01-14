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
		/*var nameRegEx = /^[A-Za-z]+$/;
		var errors = {};
		var obj = attr;
		
		//Configuration
		if (attr.name === '') {
			errors.nameConf = '\nPlease, enter the name of the configuration.';
		}else if (!nameRegEx.test(attr.name)) {
			errors.nameConf = '\nPlease, enter correct name of the configuration.';
		}
		
		if (attr.description === '') {
			errors.descriptionConf = '\nPlease, enter description of the configuration.';
		}
		
		if (attr.version === '') {
			errors.versionConf = '\nPlease, enter version of the configuration.';
		}
		
		//Parameters
		if (attr.parameters.name === '') {
			errors.nameParam = '\nPlease, enter the name of the parameter.';
		}
		
		if (typeof attr.parameters.value === 'string' && attr.parameters.value === '') {
			errors.valueParam = '\nPlease, enter value of the parameter.'
		}
		else if (typeof attr.parameters.value === 'object') {
			var obj = attr.parameters.value;
			if (obj['name'] === '') { 
				errors.nameVal = 'Name can\'t be empty.\n'; 
			}else if (!nameRegEx.test(obj['name'])) { 
				errors.nameVal = 'Name isn\'t correct.\n'; 
			}
			if (obj['description'] === '') { 
				errors.descriptionVal = 'Description isn\'t correct.\n'; 
			}
			if (obj['value'] === '') { 
				errors.valueVal = 'Value can\'t be empty.\n'; 
			}
		}
		
		if (attr.parameters.description === '') {
			errors.descriptionParam = '\nPlease, enter description of the parameter.';
		}
		
		if (_.keys(errors).length > 0) {
			return errors;
		}*/
	}
});