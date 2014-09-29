function stripVowelAccent(str)
{
	var rExps=[ /[\xC0-\xC2]/g, /[\xE0-\xE2]/g,
		/[\xC8-\xCA]/g, /[\xE8-\xEB]/g,
		/[\xCC-\xCE]/g, /[\xEC-\xEE]/g,
		/[\xD2-\xD4]/g, /[\xF2-\xF4]/g,
		/[\xD9-\xDB]/g, /[\xF9-\xFB]/g ];

	var repChar=['A','a','E','e','I','i','O','o','U','u'];

	for(var i=0; i<rExps.length; ++i)
		str=str.replace(rExps[i],repChar[i]);

	return str;
}

/* for additional modifications of this base code. */
function highlightWord(node,word) {
	//word	=	' '+word+' ';
	// Iterate into this nodes childNodes
	if (node.hasChildNodes) {
		var hi_cn;
		for (hi_cn=0;hi_cn<node.childNodes.length;hi_cn++) {
			highlightWord(node.childNodes[hi_cn],word);
		}
	}

	// And do this node itself
	if (node.nodeType == 3) { // text node
		tempNodeVal = stripVowelAccent(node.nodeValue.toLowerCase());
		
		tempWordVal = stripVowelAccent(word.toLowerCase());
	
		if (tempNodeVal.indexOf(tempWordVal) != -1) {
			pn = node.parentNode;
			if (pn.className != "searchword") {
				// word has not already been highlighted!
				nv = node.nodeValue;
				var re=new RegExp('\\b'+tempWordVal+'\\b','g');				
				//alert(tempNodeVal +'----------'+tempWordVal+'--------'+tempNodeVal.match(re));
				if(tempNodeVal.match(re))
				{				
					ni = tempNodeVal.indexOf(tempWordVal);
					// Create a load of replacement nodes
					before = document.createTextNode(nv.substr(0,ni));
					docWordVal = nv.substr(ni,word.length);
					after = document.createTextNode(nv.substr(ni+word.length));
					hiwordtext = document.createTextNode(docWordVal);
					hiword = document.createElement("span");
					hiword.className = "searchword";
					hiword.appendChild(hiwordtext);
					pn.insertBefore(before,node);
					pn.insertBefore(hiword,node);
					pn.insertBefore(after,node);
					pn.removeChild(node);
				}
			}
		}
	}
}
function highlightSwitch()
{
	
	if($("#btn_highlight").data('switch_state') != true)
	{
		localSearchHighlight($("#Tatxt_find").val());
		$("#btn_highlight").data('switch_state',true)
	}
	else
	{
		unhighlight(document.getElementsByTagName('body')[0]);
		$("#btn_highlight").data('switch_state',false)
	}
}
function unhighlight(node) {
	// Iterate into this nodes childNodes
	if (node.hasChildNodes) {
		var hi_cn;
		for (hi_cn=0;hi_cn<node.childNodes.length;hi_cn++) {
			unhighlight(node.childNodes[hi_cn]);
		}
	}

	// And do this node itself
	if (node.nodeType == 3) { // text node
		pn = node.parentNode;
		if( pn.className == "searchword" ) {
			prevSib = pn.previousSibling;
			nextSib = pn.nextSibling;
			nextSib.nodeValue = prevSib.nodeValue + node.nodeValue + nextSib.nodeValue;
			prevSib.nodeValue = '';
			node.nodeValue = '';
		}
	}
}

function localSearchHighlight(searchStr) {
	//searchStr	=	searchStr+'\\b';
	//alert(searchStr);
	if (!document.createElement) return;
        if (searchStr == '') return;
	// Trim leading and trailing spaces after unescaping
	searchstr = unescape(searchStr).replace(/^\s+|\s+$/g, "");
	if( searchStr == '' ) return;
	phrases = searchStr.replace(/\+/g,' ').split(/\"/);
	// Use this next line if you would like to force the script to always
	// search for phrases. See below as well!!!
	//phrases = new Array(); phrases[0] = ''; phrases[1] = searchStr.replace(/\+/g,' ');
	for(p=0;p<phrases.length;p++) {
	        phrases[p] = unescape(phrases[p]).replace(/^\s+|\s+$/g, "");
		if( phrases[p] == '' ) continue;
		if( p % 2 == 0 ) words = phrases[p].replace(/([+,()]|%(29|28)|\W+(AND|OR)\W+)/g,' ').split(/\s+/);
		else { words=Array(1); words[0] = phrases[p]; }
               	for (w=0;w<words.length;w++) {
			if( words[w] == '' ) continue;
			highlightWord(document.getElementsByTagName("body")[0],words[w]);
        	}
	}
}
