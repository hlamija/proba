var options = {
	editable: function (node) {
		if (node.field === 'name' || node.field === 'description' || node.field === 'version' || node.field === 'value' || node.field === 'parameters') {
			return {
				field: false,
				value: true
			};
		}
		else return true;
	},
	mode: 'tree'
};
var conf = new Configuration();
var params = new Parameters();
var complexValue = [];
var configuration = new Configuration();
var configurationView = new ConfigurationView({model: configuration});
var router = new ApplicationRouter($('#content'));
Backbone.history.start();