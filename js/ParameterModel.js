var Parameter = Backbone.Model.extend({
	
	defaults: function() {
		return {
			name: 			'',
			value: 			'' || new Parameters(),
			description: 	''
		};
	}
		
});