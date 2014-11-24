var Configuration = Backbone.Model.extend({
		
		//url: 'C:/Users/Lamija/Desktop/configuration-mgmt/data/data.json',
		
		defaults: function() {
			return {
				name: '',
				description: '',
				version: ''
				//parameter: ''
			};
		}
		
	});