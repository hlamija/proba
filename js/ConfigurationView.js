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
		this.$('#for_new_conf, #buttons, #link').empty();
			
		var container = document.getElementById('for_new_conf');
		editor = new JSONEditor(container, options);
		var json = {"name":"","description":"","version":""};
		editor.set(json);
			
		$('<button type="button" class="btn btn-danger btn-sm cancel_button">Cancel</button>\
		   <button type="button" class="btn btn-primary btn-sm" id="save_new_conf">Save</button>').appendTo('#buttons');
	},
		
	saveNewConf: function() {
		saveConf('#link');
	},
		
	cancelConf: function() {
		this.render();
	},
		
	importAndUpdateConf: function() {
		this.$('#for_buttons, #for_update, #download_update').empty();
			
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
			editor = new JSONEditor(container, options);
			
			if (extension === 'json') {
				reader.onloadend = function(evt) {
					if (evt.target.readyState == FileReader.DONE) {
						var fileContent = evt.target.result;
						configuration = new Configuration(JSON.parse(fileContent));	
						
						var json = configuration.toJSON();
						editor.set(json);
						
						$('<button type="button" class="btn btn-danger btn-sm cancel_button">Cancel</button>\
						   <button type="button" class="btn btn-primary btn-sm" id="save_updated_conf">Save</button>').appendTo('#for_buttons');
					}
				};
			}
			else if (extension === 'xml') {
				reader.onloadend = function(evt) {
					if (evt.target.readyState == FileReader.DONE) {
						var fileContent = evt.target.result;
						var configjson = xml2json.fromStr(fileContent, 'string');
						var sconfigjson = JSON.stringify(configjson);
						configuration = new Configuration(JSON.parse(sconfigjson));	
						
						var json = configuration.toJSON();
						editor.set(json);
						
						$('<button type="button" class="btn btn-danger btn-sm cancel_button">Cancel</button>\
						   <button type="button" class="btn btn-primary btn-sm" id="save_updated_conf">Save</button>').appendTo('#for_buttons');
					}
				};
			}
			reader.readAsBinaryString(file);
		}
		else {
			alert('Type of file must be .xml or .json');
		}
	},
		
	saveUpdatedConf: function() {
		saveConf('#download_update');
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

function download(id, conf) {
	var dataj = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(conf, null, 2));
	$('<a href="data:' + dataj + '" download="configuration.json">download JSON file</a>').appendTo(id); 
			
	var object = editor.get();
	var xml = createXML(object);
	var datax = "text/xml;charset=utf-8," + encodeURIComponent(xml);
	$('<br><a href="data:' + datax + '" download="configuration.xml">download XML file</a>').appendTo(id);
}

function saveConf(id) {
	this.$(id).empty();
	var newJSON = editor.get();
	
	configuration = new Configuration(newJSON, {validate: true});	
	if (JSON.stringify(configuration) === '{}'){ 
		alert('Updated configuration doesn\'t meet the requirements. Please, enter the correct form of the configuration.');
	} 
	else { 
		download(id, configuration);
	}
}