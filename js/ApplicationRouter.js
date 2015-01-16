var ApplicationRouter = Backbone.Router.extend({
	initialize: function(el) {
		this.el = el;
		this.newConfigView = new ConfigurationView({template: '#newConfigurationTemplate'});
		this.importConfigView = new ConfigurationView({template: '#importConfigurationTemplate'});
	},
		
	routes: {
		'': 				'showNewConfig',
		'new_config': 		'showNewConfig',
		'import_config': 	'showImportConfig'
	},
		
	currentView: null,
		
	switchView: function(view) {
		var r = true;
		if (this.currentView && editor != null) {
			r = confirm('If you have made recent changes, you may lose them by navigating away. \
							Your configuration has not been saved.\n\nAre you sure you want to leave this page?');
			if (r == true) {
				this.currentView.remove();
				editor = null;
			}
		}
		else if (this.currentView) {
			this.currentView.remove();
		}
		if (r == true) {
			this.el.html(view.el);
			view.render();
			this.currentView = view;
		}
	},
	
	showNewConfig: function() {
		this.switchView(this.newConfigView);
	},
		
	showImportConfig: function() {
		this.switchView(this.importConfigView);
	}
		
});