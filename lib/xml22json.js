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
		setJsonObj(xmlDoc);
		conf.set('parameters', params);
		return conf;
	}
	
	function setJsonObj(xml) {
		var js_obj = {};
		var jsoncic = {};
		var p = new Parameter();
		if (xml.nodeType == 1 && xml.hasAttributes()) {
			jsoncic['name'] = xml.tagName; 
			for (var i = 0; i < xml.attributes.length; i++) {
				var attribute = xml.attributes.item(i);
				jsoncic[attribute.nodeName] = attribute.value;
				if (xml.parentNode.nodeName === '#document') {
					conf.set(jsoncic);
				}
				else if (xml.parentNode.nodeName === 'parameters'){
					p.set(jsoncic);
					params.add(p);
					if (xml.childNodes[0].nodeType == 3 && xml.childNodes[0].data.indexOf(' ') == -1) {
						jsoncic['value'] = xml.childNodes[0].data;
						var old = params.pop();
						old.set(jsoncic);
						params.add(old);
					}
				}
				else {
					if (xml.childNodes[0].nodeType == 3 && xml.childNodes[0].data.indexOf(' ') == -1) {
						jsoncic['value'] = xml.childNodes[0].data;
						p.set(jsoncic);
					}
					else {
						p.set(jsoncic);
					}
					var previous = params.pop();
					if (xml.previousSibling == null) {
						complexValue = [];
					} 
					complexValue.push(p);
					alert(JSON.stringify(complexValue) + 'length: ' + complexValue.length);
					previous.set('value', complexValue);
					params.add(previous);
				}
			}
		}
		if (xml.hasChildNodes()) {
			for (var i = 0; i < xml.childNodes.length; i++) {
				setJsonObj(xml.childNodes.item(i));
			}
		}
	}
};

var xml2json = new XMLtoJSON();