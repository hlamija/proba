	var ConfigurationView = Backbone.View.extend({
		
		editor: null,
		
		events: {
			'click #new_conf':   		  'newConf',
			'click #save_new_conf':		  'saveNewConf',
			'click .cancel_button': 	  'cancelConf',
			'click #read_file': 		  'importAndUpdateConf',
			'click #save_updated_conf':   'saveUpdatedConf'
		},
		
		newConf: function() {
			this.$('#for_new_conf').empty();
			this.$('#buttons').empty();
			
			var container = document.getElementById('for_new_conf');
			var options = {
				editable: function (node) {
					if (node.field === 'name' || node.field === 'description' || node.field === 'version' || node.field === 'value') {
						return {
							field: false,
							value: true
						};
					}
					else return true;
				},
				mode: 'tree'
			};
			editor = new JSONEditor(container, options);
			var json = {"name":"","description":"","version":""};
			editor.set(json);
			
			$('<button type="button" class="btn btn-danger btn-sm cancel_button">Cancel</button>\
			   <button type="button" class="btn btn-primary btn-sm" id="save_new_conf">Save</button>').appendTo('#buttons');
		},
		
		saveNewConf: function() {
			this.$('#link').empty();
			
			var newJSON = editor.get();
			
			//Na ovaj nacin je omoguceno dodavanje nevalidnog parametra
			//Izvrsi se validacija samo za Configuration, ne i za Parameter koji se dodaje u Collection
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! POPRAVITI
			configuration = new Configuration(newJSON, {validate: true});
			
			if (JSON.stringify(configuration) === '{}'){ 
				alert('Written configuration doesn\'t meet the requirements. Please, enter the correct form of the configuration.');
			} else { 
				var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration, null, 2));
				$('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#link'); 
			}
		},
		
		cancelConf: function() {
			this.render();
		},
		
		importAndUpdateConf: function() {
			
			this.$('#for_buttons').empty();
			this.$('#for_update').empty();
			this.$('#download_update').empty();
			
			var file = this.$('#fileInput')[0].files[0];
			
			if (!file) {
				alert('Please select a file!');
				return;
			}
				
			var reader = new FileReader();

			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) {
					
					var fileContent = evt.target.result;
					importedConfiguration = new Configuration(JSON.parse(fileContent));
					
					var container = document.getElementById('for_update');
					var options = {
						editable: function (node) {
							if (node.field === 'name' || node.field === 'description' || node.field === 'version' || node.field === 'value') {
								return {
									field: false,
									value: true
								};
							}
							else return true;
						},
						mode: 'tree'
					};
					editor = new JSONEditor(container, options);
					var json = importedConfiguration.toJSON();
					editor.set(json);
					
					$('<button type="button" class="btn btn-danger btn-sm cancel_button">Cancel</button>\
					   <button type="button" class="btn btn-primary btn-sm" id="save_updated_conf">Save</button>').appendTo('#for_buttons');	
				}
			};
				
			reader.readAsBinaryString(file);
		},
		
		saveUpdatedConf: function() {
			this.$('#download_update').empty();
			
			var newJSON = editor.get();
			
			//Na ovaj nacin je omoguceno dodavanje nevalidnog parametra
			//Izvrsi se validacija samo za Configuration, ne i za Parameter koji se dodaje u Collection
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! POPRAVITI
			var updatedConfiguration = new Configuration(newJSON, {validate: true});
			
			if (JSON.stringify(updatedConfiguration) === '{}'){ 
				alert('Updated configuration doesn\'t meet the requirements. Please, enter the correct form of the configuration.');
			} else { 
				var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(updatedConfiguration, null, 2));
				$('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#download_update'); 
			}
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