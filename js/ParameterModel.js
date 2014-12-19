var Parameter = Backbone.Model.extend({
	defaults: function() {
		return {
			name: 			'',
			value: 			'' || new Parameters(),
			description: 	''
		};
	},
	
	validate: function(attr, options) {
		var nameRegEx = /^[A-Za-z]+$/;
		var errors = {};
		errors.check = true;
		
		if (attr.name == '') {
			errors.name = 'Please, enter the name of the configuration.';
			errors.check = false;
		}else if (!nameRegEx.test(attr.name)) {
			errors.name = 'Please, enter correct name of the configuration.';
			errors.check = false;
		}
		
		if (attr.description == '') {
			errors.description = 'Please, enter description of the configuration.';
			errors.check = false;
		}
		if (attr.value == '' || attr.value == null) {
			errors.value = 'Please, enter value of the configuration.';
			errors.check = false;
		}
		
		if (_.keys(errors).length > 1 && errors.check === false) {
			return errors;
		}
	}
		
});