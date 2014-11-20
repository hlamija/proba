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
	var configuration = new Configuration();
	var ConfigurationView = Backbone.View.extend({
		
		events: {
			'click #ok': 'createConf',
			'click #cancel': 'cancelConf',
			'click #preview': 'showJSON'
		},
		
		remove: function() {
			$(this.el).empty().detach();
			return this;
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
				configuration.set({name: nameValue, description: descriptionValue, version: versionValue});
				
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
			var preview_conf = new Configuration({name: document.getElementById("name").value, description: document.getElementById("description").value, version: document.getElementById("version").value});
			document.getElementById("for_preview").innerHTML =JSON.stringify(preview_conf);
			document.getElementById("for_preview").disabled = true;
		},
		
		initialize: function(options){
			this.template = options.template;
		},
		
		render: function(){
			var content = $(this.template).html();
			$(this.el).html(content);
			return this;
		}
	});