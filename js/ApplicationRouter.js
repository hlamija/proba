var ApplicationRouter = Backbone.Router.extend({
		
	initialize: function(el) {
		this.el = el;
		
		this.newConfigView = new ConfigurationView({template: '#newConfigurationTemplate'});
		this.importConfigView = new ConfigurationView({template: '#importConfigurationTemplate'});
	},
		
	routes: {
		"": 				"showNewConfig",
		"new_config": 		"showNewConfig",
		"import_config": 	"showImportConfig"
	},
		
	currentView: null,
		
	switchView: function(view) {
		if (this.currentView) {
			this.currentView.remove();
		}
		this.el.html(view.el);
		view.render();
		this.currentView = view;
	},
	
	showNewConfig: function() {
		this.switchView(this.newConfigView);
	},
		
	showImportConfig: function() {
		this.switchView(this.importConfigView);
	}
		
});
	
	
	
	