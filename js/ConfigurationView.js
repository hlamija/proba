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
		editor = new JSONEditor(container, options);
		var json = {"name":"","description":"","version":""};
		editor.set(json);
			
		$('<button type="button" class="btn btn-danger btn-sm cancel_button">Cancel</button>\
		   <button type="button" class="btn btn-primary btn-sm" id="save_new_conf">Save</button>').appendTo('#buttons');
	},
		
	saveNewConf: function() {
		this.$('#link').empty();
			
		var newJSON = editor.get();
		configuration = new Configuration(newJSON, {validate: true});
		if (JSON.stringify(configuration) === '{}'){ 
			alert('Written configuration doesn\'t meet the requirements. Please, enter the correct form of the configuration.');
		} else {
			var dataj = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration, null, 2));
			$('<a href="data:' + dataj + '" download="configuration.json">download JSON file</a>').appendTo('#link');
				
			var object = editor.get();
			var xml = createXML(object);
			var datax = "text/xml;charset=utf-8," + encodeURIComponent(xml);
			$('<br><a href="data:' + datax + '" download="configuration.xml" id="create_xml">download XML file</a>').appendTo('#link');
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
			
		var fileName = file.name;
		var extension = fileName.substr((fileName.lastIndexOf('.') + 1));
		
		if (extension === 'xml' || extension === 'json') {
			var reader = new FileReader();
			
			var container = document.getElementById('for_update');
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

			if (extension === 'json') {
				reader.onloadend = function(evt) {
					if (evt.target.readyState == FileReader.DONE) {
						
						var fileContent = evt.target.result;
						configuration = new Configuration(JSON.parse(fileContent));
						
						editor = new JSONEditor(container, options);
						var json = configuration.toJSON();
						editor.set(json);
							
						$('<button type="button" class="btn btn-danger btn-sm cancel_button">Cancel</button>\
						   <button type="button" class="btn btn-primary btn-sm" id="save_updated_conf">Save</button>').appendTo('#for_buttons');	
					}
				};
			}
			
			if (extension === 'xml') {
				reader.onloadend = function(e) {
					var rawData = reader.result;
					var strjson = xml2json.fromStr(rawData, 'string');
					//alert(strjson);
					
					//configuration = new Configuration(JSON.parse(strjson));	
					editor = new JSONEditor(container, options);
					//var json = configuration.toJSON();
					editor.set(strjson);
				};
			}
			
			reader.readAsBinaryString(file);
		}
		else {
			alert('Type of file must be .xml or .json!');
		}
	},
		
	saveUpdatedConf: function() {
		this.$('#download_update').empty();
		var newJSON = editor.get();
		configuration = new Configuration(newJSON, {validate: true});
			
		if (JSON.stringify(configuration) === '{}'){ 
			alert('Updated configuration doesn\'t meet the requirements. Please, enter the correct form of the configuration.');
		} 
		else { 
			var dataj = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration, null, 2));
			$('<a href="data:' + dataj + '" download="configuration.json">download JSON file</a>').appendTo('#download_update'); 
			
			var object = editor.get();
			var xml = createXML(object);
			var datax = "text/xml;charset=utf-8," + encodeURIComponent(xml);
			$('<br><a href="data:' + datax + '" download="configuration.xml">download XML file</a>').appendTo('#download_update');
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