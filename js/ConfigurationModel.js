var Configuration = Backbone.Model.extend({

	defaults: function() {
		return {
			name: 			'',
			description: 	'',
			version: 		'',
			parameters: 	new Parameters()
		};
	}
		
});