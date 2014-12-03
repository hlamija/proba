	var ConfigurationView = Backbone.View.extend({
		
		events: {
			'click #ok': 					'createConf',
			'click #cancel': 				'cancelConf',
			'click #readFile': 				'readFile',
			'click #create_parameter': 		'openCreateParam',
			'click #new_param': 			'createParam',
		//	'click #new_attr':				'createAttr',
			'change #select_from_table': 	'toggleTable'
		},
		
		toggleTable: function() {	
			if (this.$('#select_from_table').is(':checked')) {
				this.$('#table_in_modal').show();
				this.$('#value_param').val('');
				this.$('#value_param').prop('disabled', true);
				
			}else{
				this.$('#table_in_modal').hide();
				this.$('#value_param').prop('disabled', false);
			}
		},
		
		/*createAttr: function() {
			var nameAttr = this.$('#name_attr').val();
			var valueAttr = this.$('#value_attr').val();
			
			if (nameAttr != '' && valueAttr != ''){
				parameter.set(nameAttr, valueAttr);
				$('<label class="col-sm-5 control-label">' + nameAttr + '</label>\
				<p>' + valueAttr + '</p><br>').appendTo('#append_attr');
			}
			this.$('#name_attr, #value_attr').val('');
		},*/
	
		createParam: function() {
			
			var parameter = new Parameter();
			
			var nameRegEx = /^[A-Za-z]+$/;
			
			var nameValue = this.$('#name_param').val();
			var descriptionValue = this.$('#description_param').val();
			var valueValue = this.$('#value_param').val();
			$checkbox = this.$('#select_from_table');
			
			if (descriptionValue != '' && valueValue != '' && nameRegEx.test(nameValue) && !($checkbox.is(':checked'))) {
				
				parameter.set({
					name: nameValue, 
					value: valueValue,
					description: descriptionValue
				});		
				
				tempParamColl.add(parameter);
				
				var html1 = '<tr><td>' + parameter.get('name') + '</td><td>' + parameter.get('value') + '</td><td>'
									   + parameter.get('description') +  '</td><td><input type="checkbox" value="" class="checkboxes"></td></tr>';
				$('#for_parameters2 tr').first().after(html1);
				
				var html2 = '<tr><td>' + parameter.get('name') + '</td><td>' + parameter.get('value') + '</td><td>' 
				                       + parameter.get('description') +  '</td><td><input type="radio" name="select_parameter" class="optionsRadios"></td></tr>';
				$('#for_parameters1 tr').first().after(html2);
				
			}
			else if (descriptionValue != '' && nameRegEx.test(nameValue) && $checkbox.is(':checked')) {
				
				var complexValue = null;
				
				$('tr .optionsRadios:checked').each(function() {
					var num = $(this).closest('tr').index();
					complexValue = tempParamColl.at(tempParamColl.length - num);
				});
				
				parameter.set({
					name: nameValue,
					value: complexValue,
					description: descriptionValue
				});
				
				tempParamColl.add(parameter);
				
				var html1 = '<tr><td>' + parameter.get('name') + '</td><td>' + JSON.stringify(parameter.get('value')) + '</td><td>'
									   + parameter.get('description') +  '</td><td><input type="checkbox" value="" class="checkboxes"></td></tr>';
				$('#for_parameters2 tr').first().after(html1);
				
				var html2 = '<tr><td>' + parameter.get('name') + '</td><td>' + JSON.stringify(parameter.get('value')) + '</td><td>' 
				                       + parameter.get('description') +  '</td><td><input type="radio" name="select_parameter" class="optionsRadios"></td></tr>';
				$('#for_parameters1 tr').first().after(html2);
				
			}
			else {
				alert('Incorrect name, description or value.');
			}
			
			this.$('#name_param, #description_param, #value_param').val('');
			this.$('#for_new_param').modal('hide');
		},
		
		openCreateParam: function() {
			this.$('#for_new_param').modal('show');
			this.$('#table_in_modal').hide();
			this.$('#select_from_table').prop('checked', false);
			this.$('input[name=select_parameter]').prop('checked', false);
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
					importedConfiguration = new Configuration(JSON.parse(fileContent));
					textArea.html(JSON.stringify(importedConfiguration));
					
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
				
				$('tr .checkboxes:checked').each(function() {
					var num = $(this).closest('tr').index();
					parameterCollection.push(tempParamColl.at(tempParamColl.length - num));
				});
				
				configuration.set({
					name: nameValue, 
					description: descriptionValue, 
					version: versionValue,
					parameters: parameterCollection
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
		
		initialize: function(options){
			this.template = options.template;
		},
		
		render: function(){
			var content = $(this.template).html();
			$(this.el).html(content);
			return this;
		}
	});