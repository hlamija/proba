function XMLtoJSON() {
	this.fromStr = function (xml, rstr) {
		if (window.DOMParser) {
			var getxml = new DOMParser();
			var xmlDoc = getxml.parseFromString(xml, "text/xml");
		}
		else {
			var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
		}
		var json_str = jsontoStr(setJsonObj(xmlDoc));
		//return (typeof(rstr) == 'undefined') ? JSON.parse(json_str) : json_str;
		return JSON.parse(json_str);
	}

	var setJsonObj = function(xml) {
		var js_obj = {};
		
		if (xml.nodeType == 1 && xml.hasAttributes()) { //nodeType is ELEMENT_NODE
			for (var i = 0; i < xml.attributes.length; i++) {
				var attribute = xml.attributes.item(i);
				js_obj[attribute.nodeName] = attribute.value;
			}
		}
		else if (xml.nodeType == 3) {  //nodeType is TEXT_NODE	
			js_obj = xml.data;
			if (xml.data.indexOf(" ") == -1) alert (js_obj);
		}
		
		if (xml.hasChildNodes()) {
			for (var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(js_obj[nodeName]) == "undefined") {
					js_obj[nodeName] = setJsonObj(item);
				} 
				else {
					if (typeof(js_obj[nodeName].push) == "undefined") {
						var old = js_obj[nodeName];
						js_obj[nodeName] = [];
						js_obj[nodeName].push(old);
					}
					js_obj[nodeName].push(setJsonObj(item));
				}
			}
		}
    return js_obj;
  }

  var jsontoStr = function(js_obj) {
	var rejsn = JSON.stringify(js_obj, undefined, 2).replace(/(\\t|\\r|\\n)/g, '').replace(/"",[\n\t\r\s]+""[,]*/g, '').replace(/(\n[\t\s\r]*\n)/g, '').replace(/[\s\t]{2,}""[,]{0,1}/g, '').replace(/"[\s\t]{1,}"[,]{0,1}/g, '').replace(/\[[\t\s]*\]/g, '""');
    return (rejsn.indexOf('"parsererror": {') == -1) ? rejsn : 'Invalid XML format';
  }
};

var xml2json = new XMLtoJSON();