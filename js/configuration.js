$(function() {
(function() {

	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};
	
	window.template = function(id) {
		return _.template( $('#' + id).html());
	};
	
	//Configuration Model
	App.Models.Configuration = Backbone.Model.extend({
		defaults: function() {
			return {
				name: '',
				description: '',
				version: ''
				//parameter: ''
			};
		},
		
		validate: function(attrs) {
			
		}
	});
	
	//Configuration View
	App.Views.ConfigurationView = Backbone.View.extend({
		
		template: template('configurationTemplate'),
		
		events: {
			'click #ok': 'createConf',
			'click #cancel': 'cancelConf',
			'click #preview': 'showJSON'
		},
		
		cancelConf: function() {
			this.render();
		},
		
		createConf: function() {
			
			this.model.set({name: document.getElementById("name").value, description: document.getElementById("description").value, version: document.getElementById("version").value});
			
			document.getElementById("for_preview").innerHTML = JSON.stringify(configuration);
			document.getElementById("for_preview").disabled = true;
			
			var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration));
			$('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#for_download_link');
			
			document.getElementById("ok").disabled = true;
			document.getElementById("preview").disabled = true;
			document.getElementById("name").disabled = true;
			document.getElementById("description").disabled = true;
			document.getElementById("version").disabled = true;
		},
		
		showJSON: function() {
			var preview_conf = new App.Models.Configuration({name: document.getElementById("name").value, description: document.getElementById("description").value, version: document.getElementById("version").value});
			document.getElementById("for_preview").innerHTML =JSON.stringify(preview_conf);
			document.getElementById("for_preview").disabled = true;
		},
		
		initialize: function(){
			this.render();
			this.model.on('change', this.render, this);
		},
		
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
	
	var configuration = new App.Models.Configuration();
	var configurationView = new App.Views.ConfigurationView({model: configuration});
	configurationView.el;
	$(document.body).html(configurationView.el);

})();
});
