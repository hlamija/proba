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
		var msg = '';
		
		if (attr.name == '') {
			msg += 'Please, enter the name of the configuration.';
		}else if (!nameRegEx.test(attr.name)) {
			msg += 'Please, enter correct name of the configuration.';
		}
		
		if (attr.description == '') {
			msg += 'Please, enter description of the configuration.';
		}
		if (attr.value == '' || attr.value == null) {
			msg += 'Please, enter value of the configuration.';
		}
		
		return msg;
	}
		
});