var Configuration = Backbone.Model.extend({
	
	defaults: function() {
		return {
			name: 			'',
			description: 	'',
			version: 		''
		};
	},
	
	validate: function(attr) {
		var nameRegEx = /^[A-Za-z]+$/;
		var errors = {};
		errors.check = true;
		
		if (attr.name == '') {
			errors.name = 'Please, enter the name of the configuration.';
			errors.check = false;
			$('#error_msg_name1').show();
		}else if (!nameRegEx.test(attr.name)) {
			errors.name = 'Please, enter correct name of the configuration.';
			errors.check = false;
			$('#error_msg_name2').show();
		}
		
		if (attr.description == '') {
			errors.description = 'Please, enter description of the configuration.';
			errors.check = false;
			$('#error_msg_description').show();
		}
		if (attr.version == '') {
			errors.version = 'Please, enter version of the configuration.';
			errors.check = false;
			$('#error_msg_version').show();
		}
		
		if (_.keys(errors).length > 1 && errors.check === false) {
			return errors;
		}
	}
});