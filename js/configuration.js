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
			
			hideErrorMsgs();
			
			var nameRegex = /^[A-Za-z]+$/;
			
			var nameValue = document.getElementById("name").value;
			var descriptionValue = document.getElementById("description").value;
			var versionValue = document.getElementById("version").value;
			
			if (descriptionValue != ''  && versionValue != '' && nameRegex.test(nameValue)) {
				this.model.set({name: nameValue, description: descriptionValue, version: versionValue});
				
				document.getElementById("for_preview").innerHTML = JSON.stringify(configuration);
				document.getElementById("for_preview").disabled = true;
				
				var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration));
				$('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#for_download_link');
				
				disableAll();
				
			}
			else {
				if (nameValue == '') {
					document.getElementById("error_msg_name1").style.display = 'inline';
				}else if(!nameRegex.test(nameValue)) {
					document.getElementById("error_msg_name2").style.display = 'inline';
				}
				
				if (descriptionValue == '') {
					document.getElementById("error_msg_description").style.display = 'inline';
				}
				if (versionValue == '') {
					document.getElementById("error_msg_version").style.display = 'inline';
				}
			}
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
	
	var disableAll = function() {
		document.getElementById("ok").disabled = true;
		document.getElementById("preview").disabled = true;
		document.getElementById("name").disabled = true;
		document.getElementById("description").disabled = true;
		document.getElementById("version").disabled = true;
	};
	
	var hideErrorMsgs = function() {
		document.getElementById("error_msg_name1").style.display = 'none';
		document.getElementById("error_msg_name2").style.display = 'none';
		document.getElementById("error_msg_description").style.display = 'none';
		document.getElementById("error_msg_version").style.display = 'none';
	};
	
	var configuration = new App.Models.Configuration();
	var configurationView = new App.Views.ConfigurationView({model: configuration});
	configurationView.el;
	$(document.body).html(configurationView.el);

})();
});
