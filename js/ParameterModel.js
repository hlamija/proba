var Parameter = Backbone.Model.extend({
	defaults: function() {
		return {
			name: 			'',
			description: 	'',
			value: 			''
		};
	}	
});