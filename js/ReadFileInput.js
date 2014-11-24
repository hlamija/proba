function readFile() {
		
	var files = document.getElementById('fileInput').files;
	
	if (!files.length) {
		alert('Please select a file!');
		return;
	}
		
	var file = files[0];
	var reader = new FileReader();

	reader.onloadend = function(evt) {
		if (evt.target.readyState == FileReader.DONE) {
			var fileContent = evt.target.result;
			document.getElementById('previewFile').textContent = fileContent;
			
			var populatedConfiguration = new Configuration(JSON.parse(fileContent));
			console.log("name: " + populatedConfiguration.get("name"));
			console.log("description: " + populatedConfiguration.get("description"));
			console.log("version: " + populatedConfiguration.get("version"));
		}
	};
		
	reader.readAsBinaryString(file);
}
  
$(document).ready(function(){
	$('#readFile').click(function() {
		readFile();
	});
});