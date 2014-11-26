	var ConfigurationView = Backbone.View.extend({
		
		events: {
			'click #ok': 'createConf',
			'click #cancel': 'cancelConf',
			'click #preview': 'showJSON',
			'click #readFile': 'readFile',
			'click #update_conf': 'updateConf'
		},
		
		updateConf: function() {
			
		},
		
		readFile: function() {
		
			var file = this.$('#fileInput')[0].files[0];
			var textArea = this.$('#previewFile');
			
			if (!file) {
				alert('Please select a file!');
				return;
			}
				
			var reader = new FileReader();

			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) {
					
					var fileContent = evt.target.result;
					textArea.html(fileContent);
					importedConfiguration = new Configuration(JSON.parse(fileContent));
					
					$('<div class="col-sm-offset-2 col-sm-10">\
							<button type="button" class="btn btn-default btn-sm" id="update_conf">Update</button>').appendTo('#for_button');
				}
			};
				
			reader.readAsBinaryString(file);
		},
		
		cancelConf: function() {
			this.render();
		},
		
		createConf: function() {
			
			var nameRegEx = /^[A-Za-z]+$/;
			
			this.$('p.hiddenMsg').hide();
			
			$textArea = this.$('#for_preview_JSON');
			
			var nameValue = this.$('#name').val();
			var descriptionValue = this.$('#description').val();
			var versionValue = this.$('#version').val();
			
			if (descriptionValue != '' && versionValue != '' && nameRegEx.test(nameValue)) {
				
				configuration.set({
					name: nameValue, 
					description: descriptionValue, 
					version: versionValue
				});
				
				$textArea.html(JSON.stringify(configuration));
				
				var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration));
				$('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#for_download_link_JSON');
				
				this.$('input.form-control, #ok, #preview, #for_preview_JSON').prop('disabled', true);
				
			}else {
				
				if (nameValue == '') {
					this.$('#error_msg_name1').show();
				}else if(!nameRegEx.test(nameValue)) {
					this.$('#error_msg_name2').show();
				}
				
				if (descriptionValue == '') {
					this.$('#error_msg_description').show();
				}
				if (versionValue == '') {
					this.$('#error_msg_version').show();
				}
			}
		},
		
		showJSON: function() {
			
			$nameEl = this.$('#name');
			$descriptionEl = this.$('#description');
			$versionEl = this.$('#version');
			$textArea = this.$('#for_preview_JSON');
			
			var preview_conf = new Configuration({
				name: $nameEl.val(), 
				description: $descriptionEl.val(), 
				version: $versionEl.val()
			});
			
			$textArea.html(JSON.stringify(preview_conf));
			$textArea.prop('disabled', true);
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