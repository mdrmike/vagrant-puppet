/***
 * This javascript file contains function which is called when the Add/Edit form is submitted for validating the field values.
 * @author     		MediTab Software Inc. 
 * @copyright  		1997-2005 The MediTab Software Inc.
 * @license    		http://www.php.net/license/3_0.txt  PHP License 3.0
 * @version   	 	Release: 1.0
 * @PHP version  	5.x
*/

// initilize veriable
var divStyle

var blnLoad		=	true;
arrString			=	new Array();

strString			=	'hid_lead_contact_id,hid_contact_location_id,chk_is_default,Rslt_title,TaRtxt_first_name,Tatxt_last_name,slt_gender,slt_designation,txt_other_designation,Tatxt_phone1,Tatxt_phone2,Tatxt_fax1,Tatxt_phone,Tatxt_extension,Emtxt_email,Tatxt_home_phone,Tatxt_other_phone,Emtxt_other_email,Taara_contact_remark,other_designation,selected="selected",checked,row_contact,Rslt_lead_location_id,slt_sales_contact_type';
strCompetitor		=	'slt_pos_vs_comp,Tatxt_propsect,Taara_note,Tatxt_edge,slt_product_reviewed,Taslt_competitor_id,hid_competitor_id';

strLeadOpportunity	=	'hid_lead_opportunity_id,selected="selected",slt_opportunity_id,hid_assign_to_id,Tatxt_assign_to,slt_opportunity_stage,Intxt_probability,slt_purchase_type,Dttxt_expected_closed_date,slt_upfront_deposit,slt_monthlies';

arrString					=	strString.split(",");
arrLeadOpportunity			=	strLeadOpportunity.split(",");
arrLeadCompetitor			=	strCompetitor.split(",");
//define selected Country Name
var	strDefineCountryName			=	"United States";

// if the browser is NetScape then 
if(navigator.appName=='Netscape')

	divStyle	=	'table-row';
	
else  //if the browser is IE then 

	divStyle	=	'inline';
	
function removeOption(objCombo,strValue)
{
	for (intOpt=objCombo.options.length-1;intOpt>=0;intOpt--)
	{
		if(objCombo.options[intOpt].value == strValue)
			objCombo.remove(intOpt);
	}
}	
/** This method is called when the form is submitted for javascript validations
*/
function submit_form(objFrm)
{
	if(checkValid(objFrm.name)==false) //general javascript validations for each field
	{
		return false; 
	}
	
	//if some extra validation required
	if(window.extraValid) //check whether the function for extra validation exist or not
	{
		if(extraValid()==false) //if the function returns false then return false
		{
			return false;	
		}
	}
	else //if function doesnot exist return true
	{
		if(document.getElementById("project")!=undefined)
		{
			if(document.getElementById("project").value==0)
			{	
				document.frm_add_record.action="./../../MEM/employee/index.php";
			}
		}

		return true;
	}
	
	//alert("1");
	/********disable submit button for each add/edit form and also change title of submit button after disable
		//change text Processing.. instead of Save  */
		
	/*var objForm=document.getElementById(objFrm.name);			
	var intFormNameLen=document.getElementById(objFrm.name).elements.length;	
	var intLenSt;
	
	for(intLenSt=0;intLenSt<intFormNameLen-1;intLenSt++)
	{		
		if(objForm.elements[intLenSt].name != undefined)
		{
			if(objForm.elements[intLenSt].type =='submit' && objForm.elements[intLenSt].name.substring(0,3) != 'Sr_')
			{
				alert(objForm.elements[intLenSt].name);
				
				//getElement(objForm.elements[intLenSt].name).disabled = true ;
				//getElement(objForm.elements[intLenSt].name).value  = "Processing..." ;
				
				strFormElementName	= objForm.elements[intLenSt].name ;
				objForm.strFormElementName.disabled = true ;
				objForm.strFormElementName.value  = "Processing..." ;
				
			}
		}
	}	
	document.getElementById(objFrm.name).submit();
	*/
	/******** end **********************************************************/
}

function zoomIn(url,labelName,control_name,width,height)
{
	try
	{
		contType=document.getElementById(control_name).type;
	}
	catch(e)
	{
		alert(control_name+" does not exists");
		return false;	
	}
	if(contType == "text" || contType == "textarea")
		height = 335;
	else
		height = 200;
	popup(url+'&contName='+control_name+'&labelName='+labelName,width,height);

}

/**
  * This function is to submit search form
*/
function submit_search_form()
{
	if(document.frm_search_record.TaRtxt_search.value=='')
	{
		alert("Please enter value.");
		return false;
	}
	else
	{
		document.frm_search_record.file.value			=	"med_advance_search";		
		document.frm_search_record.submit();
		return false;
	}
}

/* This function is used to check number of rows to display with general setting parameter */

function checkRowLimit(intHiddenControl,intMaxRowLimit)
{
	// Check for numeric value
	if(!(checkInteger(intHiddenControl,"","")))
	{
		alert("Please enter valid rows");
		setStyle(intHiddenControl);
		eval(strStyle);
		eval(strFocus);
		intHiddenControl.focus();
		return false;
		
	}
   
	if( parseInt(intHiddenControl.value) > parseInt(intMaxRowLimit))
	{
		alertMessage = "Number of rows should not be greater than "+intMaxRowLimit;  
		alert(alertMessage);
		setStyle(intHiddenControl);
		eval(strStyle);
		eval(strFocus);
		intHiddenControl.focus();
		return false;
	}
}

/* This function is used to zoom combo */
function zoomCombo(strComboName,elmImage,intMin,intMax)
{
	var combo		 = document.getElementById(strComboName);
	var imgZoomIn	 = "s_zoom_down.gif";
	var imgZoomOut	 = "s_zoom_up.gif";
	var imgImage	 = elmImage.src;
	
	if(combo.size >= intMax)
	{
		elmImage.src = imgImage.replace(imgZoomOut,imgZoomIn);
		combo.size	 = intMin;
	}
	else
	{
		elmImage.src = imgImage.replace(imgZoomIn,imgZoomOut);
		combo.size	 = intMax;
	}
		
	return false;
}

//This function will give selected values from multi combo (used in tool-tip)
function getSelectedComboValue(strControlId,strToolTipId,intTempDelay)
{
	var strSelectedId 	= 	document.getElementById(strControlId);
	var strSelected		=	"";
	
	if(intTempDelay )
		intDelay= intTempDelay;
	else
		intDelay= DELAY;
	
	for(var intSelectedId=0;intSelectedId<strSelectedId.options.length;intSelectedId++)
	{	
		if(strSelectedId.options[intSelectedId].selected == true)
		{	
			strSelected = strSelected + strSelectedId.options[intSelectedId].text+"<br>";
		}
	}
	strSelected = strSelected.substring(0,strSelected.length-1);
	strSelected = strSelected.replace(/All,/gi,'')
//	return overlib(strSelected,CAPTION,'Selected Values', DELAY, 200, STICKY, MOUSEOFF, 1000, WIDTH, 400, CLOSETEXT, '<img border=0 src=./images/close-inline.gif>', CLOSETITLE, 'Click to Close', CLOSECLICK, FGCLASS, 'olFgClass', CGCLASS, 'olCgClass', BGCLASS, 'olBgClass', TEXTFONTCLASS, 'olFontClass', CAPTIONFONTCLASS, 'olCapFontClass', CLOSEFONTCLASS, 'olCloseFontClass')
	return overlib(strSelected,CAPTION,'Selected Values', intDelay, 400, STICKY, MOUSEOFF, 1000, WIDTH, 250, CLOSETEXT, '<img border=0 src=./images/close-inline.gif>', CLOSETITLE, 'Click to Close', CLOSECLICK, FGCLASS, 'olFgClass', CGCLASS, 'olCgClass', BGCLASS, 'olBgClass', TEXTFONTCLASS, 'olFontClass', CAPTIONFONTCLASS, 'olCapFontClass', CLOSEFONTCLASS, 'olCloseFontClass',strControlId);
}

function AddNode(no)
{
	
	intMaxFiles	=	parseInt(document.frm_list_record.nodecount.value);
	if(parseInt(document.frm_list_record.maxnode.value)>=intMaxFiles)
	{
		var newdiv = document.createElement('div');
		newdiv.setAttribute('id','filall_additional_file'+no);
		var mydiv = GetElement("div_files");
		newdiv.innerHTML = NewNode(no);
		mydiv.appendChild(newdiv);
	}
	else
	{
		alert("Maximum of "+(intMaxFiles-1)+" files can be added.");
	}

}
function NewNode(no)
{
//	var newNode = '<input type="file" class="comn-input" name="filall_additional_file['+no+']" id="filall_additional_file['+no+']"  readonly="readonly">&nbsp;<input type="button" name="x" value=" X " onclick="RemoveNode(\'filall_additional_file'+no+'\')">';
	var newNode = '<input type="file" class="comn-input" name="filall_additional_file[]" id="filall_additional_file[]"  >&nbsp;<font style="font-size: 9px;" color="#0000ff"><a onclick="RemoveNode(\'filall_additional_file'+no+'\')" style="cursor:pointer">Remove</a></font>';
	
	//Make an Increment to the hidden counter variable - as child node added
	document.frm_list_record.nodecount.value = parseInt(document.frm_list_record.nodecount.value)+1;
	document.frm_list_record.nodeindex.value = parseInt(document.frm_list_record.nodeindex.value)+1;
	return newNode;
}
function RemoveNode(node)
{
	//First of all lets get the main div which contains all created new child div
	var parentDiv = GetElement("div_files");
	//Now get the clield node which needs to be removed
	var childDiv = GetElement(node);
	//and at last time for final action -- Kill the child
	parentDiv.removeChild(childDiv);
	//Make an Decrement to the hidden counter variable -- as child node removed
	document.frm_list_record.nodecount.value = parseInt(document.frm_list_record.nodecount.value)-1;
	//never decrement "document.main.nodeindex.value" as it will create name conflict and is there for other purpose
}

//Browser Comptible GetElement Method
//Will work for all : Generalized ReUsable Function
function GetElement(element)
{
	var divx;
	if (document.getElementById) 
	{
		divx = document.getElementById(element);
	}
	else if (document.all) 
	{
		divx = document.all[element];
	}
	else if (document.layers) 
	{
		divx = document.layers[element];
	}
	return divx;
}

// set missing selected in edit mode at the time of page load only
function setMultipleSelected(objTargetElement,arrSelectValues)
{
	objTargetElement.disabled = "";
	
	for(var i = 0; i < objTargetElement.length; i++) 
	{
		for(var j = 0; j < arrSelectValues.length; j++)
			objTargetElement.options[i].selected = false;
	}
	
	for(var i = 0; i < objTargetElement.length; i++) 
	{
		for(var j = 0; j < arrSelectValues.length; j++)
			if(objTargetElement.options[i].value == arrSelectValues[j])
				objTargetElement.options[i].selected = true;
	}
	
	if(arrSelectValues == 0)
		objTargetElement.disabled = "disabled";	
}


function checkUndefinedValue(intValue)
{
	if(intValue == undefined)
	{
		return "";
	}
	else
	{
		return intValue;
	}
}

/* This function  fill combo value with blank value */

function fillComboBox(strControlName,arrFillValue,strSelValue,strSeperator)
{
	strHTMLComboControl	=	document.getElementById(strControlName);
	
	if(strHTMLComboControl)
	{
		//remove all option from  competitor combo box
		strHTMLComboControl.options.length 	=	0;
		
		//adding one element with the blank value 
		addOption(strHTMLComboControl, "", "", "");
	}
	else
	{
		return false;
	}
	
	// create a loop for fill the combo box depend on the sales opportunity value
	for(var intCnt = 0; intCnt < arrFillValue.length; intCnt++)
	{
		if(strSeperator == "" && strSeperator != 'undefined')
		{
			strSeperator	=	":";
		}

		//split the value with delemiter : for getting value and text for the combo
		var arrComboValue		=	arrFillValue[intCnt].split(strSeperator);
		
		if(strHTMLComboControl)
		{
			blnIsSelected		=	"";
			
			if(strSelValue == arrComboValue[0])
			{
				blnIsSelected	=	strSelValue;
			}
			
			addOption(strHTMLComboControl, checkUndefinedValue(arrComboValue[0]), checkUndefinedValue(arrComboValue[1]),blnIsSelected);
		}
	}
}
function addOption(objCombo, value, text, blnIsSelected)
{
	var objOpt 		= 	document.createElement("OPTION");
	
	objOpt.text 	= 	text;
	
	objOpt.value 	= 	value;
	
	if(blnIsSelected && blnIsSelected != undefined)
	
		objOpt.selected = true;
		
	objCombo.options.add(objOpt);
}


/* function is used for the set the Gender based on Name title
	@ param 	strName			string 		Name title value (Mr.,Ms.,Mrs.,Dr., etc)
	@ param		strTrgControl	string		set male/female value
*/

// 	e.g. if Name title is Mr. then set gender as Male

function setGender(strName,strTrgControl)
{
	//if  Name title is Mr. Then	
	if(strName == "Mr.")
	{
		//set gender as Male	
		$("#"+strTrgControl).val("Male")
	}
	//if Name title is Ms. and Mrs.
	else if(strName == "Ms." || strName == "Mrs.")	
	{
		// set genser as Female
		$("#"+strTrgControl).val("Female")
	}
	else
	{
		//set gender as null
		$("#"+strTrgControl).val("")
	}
}

/*
	function convert phone no to US Format phone
*/

function setUSPhoneFormat(strPhoneNo)
{
	//define and initialize veriable
	var strFormatedPhoneNo	=	"";
	
	//if phone no is not null and not contain charecter then
	if(strPhoneNo != "" && !strPhoneNo.search(/[^a-zA-Z]+/))
	{
		//set phone format like (999)-999-9999	
		strFormatedPhoneNo	=		"("+strPhoneNo.substr(0,3)+")-"+strPhoneNo.substr(3,3)+"-"+strPhoneNo.substr(6,4)
	}
	
	//return phone number
	return strFormatedPhoneNo;	
}


//this function is used for  cheke phone no validation

function PhoneValidation(strControlTitle,strMessage)
{
	//initialize veriable	
	var strErrorMessage	=	"";
	
	//validation for the number
	if((getElement(strControlTitle)) && (getElement(strControlTitle).value!= "") &&  (getElement(strControlTitle).value.search("^[0-9]{10}$")))
	{
		getElement(strControlTitle).focus();
		setStyle(getElement(strControlTitle))
		eval(strStyle);
		
		//if strMessage is not null then
		if(strMessage != "")
			strErrorMessage	=	"\nPlease enter Valid "+strMessage+" No.";
		else
			strErrorMessage	=	"\nPlease enter Valid Field value.";
	}
	else
	{
		resetStyle(getElement(strControlTitle));
	}
	
	if(strErrorMessage !=	"")
		return strErrorMessage;
	else
		return "";	
}
function showMapLocation(intUserId,intAddressId)
{
	window.open ("index.php?file=med_show_map_location&address_id="+ intAddressId+"&user_id="+intUserId,"mywindow","location=1,status=1,scrollbars=true,width=1105,height=700"); 
}
function openCtrWin(theURL,winName,winWidth,winHeight,otherFeatures) {

  var x = 0;

  var y = 0;

  x = (screen.availWidth - winWidth) / 2;

  y = (screen.availHeight - winHeight) / 2;

  if ( otherFeatures != "" ) {

    otherFeatures = "," + otherFeatures;

  }

  var features = "screenX=" + x + ",screenY=" + y + ",width=" + winWidth + ",height=" + winHeight + ",top=" + y + ",left=" + x + "'" + otherFeatures;

  var newWin = window.open(theURL,winName,features);

  newWin.focus();

}
function addDynamicRowToTable(strTableId,strTransactionRow,strHiddenCountControl,strTableType,strDeleteButtonId,strBottomLineId)
{	
	//alert("strTableId : "+ strTableId+"\n,strTransactionRow : "+strTransactionRow+"\nstrHiddenCountControl: "+strHiddenCountControl+"\nstrTableType : "+strTableType+"\nstrDeleteButtonId : "+strDeleteButtonId+"\nstrBottomLineId : "+strBottomLineId+"")
	var intTotalTableRow	;
	
	var strTable		= 	document.getElementById(strTableId);
	
	//get total no of row in a table
	intTotalTableRow	=	(strTable.rows.length) - 1 ;
	
	//passing this total no of row get the row office Object
	intLastTableRow		=	$("[id^='"+strTransactionRow+"']").get(intTotalTableRow);

	// get Inner HTML of the whole TR
	var strRowHTML		=	$("[id^='"+strTransactionRow+"']").get(intTotalTableRow).innerHTML;
	
	//get the total no
	intTotalTableRow	= 	(intLastTableRow.id).replace(/(\w+\_+)/,"");
	
	strRowHTML		=	strRowHTML.replace('<!--', "") ;
	strRowHTML		=	strRowHTML.replace('-->', "" ) ;

	//get number of rows of the table
	var intRow		=	strTable.getElementsByTagName("TR").length;

	// create a one TR
	var newRow		=	document.createElement("TR");
	
	var newTD		=	document.createElement("TD");

	intNewRowId		=	parseInt(+intTotalTableRow) + 1;
	
	strRowHTML		=	strRowHTML.replace(new RegExp('_'+intTotalTableRow+'','gi'),'_'+intNewRowId);
	
	//set attributes of the created TD
	newRow.setAttribute("id",strTransactionRow+intNewRowId);
	
	newTD.innerHTML	=	strRowHTML;
	
	newRow.appendChild(newTD);
	
	strTable.getElementsByTagName("tbody")[0].appendChild(newRow); 

	blankHTMLControlValue(intNewRowId,strTableType);
	
	intTotalHiddenRow	=	$("#"+strHiddenCountControl).val();
	intTotalHiddenRow++;
	$("#"+strHiddenCountControl).val(intTotalHiddenRow);
	
	if(strTableType == "LOCATION" || strTableType == "OFFICE" )
	{
		$("#hid_address_id_"+intNewRowId).val("");
		
		intPhoneNo	=	$("#Tatxt_phone_"+intRowId).val().replace(/\(/,"").replace(/\)/,"").replace(/\-/,"").replace(/\-/,"");
		intFaxNo	=	$("#Tatxt_fax_"+intRowId).val().replace(/\(/,"").replace(/\)/,"").replace(/\-/,"").replace(/\-/,"");
	
		//set masking on phone and fax no.
		$("#Tatxt_phone_"+intRowId).unmask("(999)-999-9999").mask("(999)-999-9999").removeAttr("maxlength").val(setUSPhoneFormat(intPhoneNo));
		$("#Tatxt_fax_"+intRowId).unmask("(999)-999-9999").mask("(999)-999-9999").removeAttr("maxlength").val(setUSPhoneFormat(intFaxNo));		
	}
	
	setShowHideRemoveButton(intTotalHiddenRow,strTableId,strDeleteButtonId,strBottomLineId);
}


/*
	function is usec for set blank Value for new generate HTML  control
*/

function blankHTMLControlValue(intRowId,strTableType)
{
	//declare and initialize veriable
	var strReplaceString	=	"";

	arrValues	=	new Array();
	
	if(strTableType == "CONTACT" && arrString)
		arrValues	=	arrString;
	else if((strTableType == "OFFICE" || strTableType == "LOCATION") && arrOfficeString)
		arrValues	=	arrOfficeString;
	else if(strTableType == "OPPORTUNITY" && arrLeadOpportunity)
		arrValues	=	arrLeadOpportunity;
	if(strTableType == "COMPETITOR" && arrLeadCompetitor)
		arrValues	=	arrLeadCompetitor;	
		
	//use for loop for get one by one control
	for(intCnt = 0; intCnt <= arrValues.length; intCnt++)
	{
		//if control is selected then 
		if(arrValues[intCnt] !=	'selected="selected"')
		{
			//get the new control  name
			strReplaceString	=	arrValues[intCnt]+"_"+intRowId;
			
			//if control is exist in DOM
			if(document.getElementById(strReplaceString))
			{
				//and control is not undefiend
				if(arrValues[intCnt] == 'undefined')
				{
					// set control value -1 and NULL	
					document.getElementById(strReplaceString).value	= "-1";
					
					document.getElementById(strReplaceString).value	= "";
				}
				else	// if HTML control  is checkbox
				{
					
					strChkString = arrValues[intCnt].substr(0,3);
					
					if(strChkString == "chk" )
					{
						// set unchecked value for control
						document.getElementById(strReplaceString).checked	= false;
					}
					else
					{	// else set NULL value for control
						document.getElementById(strReplaceString).value	= "";
					}
				}
			}
		}
	}
}


//function setShowHideOfficeRemoveButton(intTotalRow)
function setShowHideRemoveButton(intTotalRow,strTableId,strDeleteButtonId,strBottomLineId)
{
//		alert(intTotalTableRow)
	$("[id^='"+strDeleteButtonId+"']").each(function(i){
										   
		intTableRow		= 	(this.id).replace(/(\w+\_+)/,"");
		
		if(intTotalRow > 1)
		{
		  $("#"+this.id).attr("style","visibility:visible");
		  $("#"+strBottomLineId+intTableRow).attr("style","visibility:visible");
		}
		else
		{
		  $("#"+this.id).attr("style","visibility:hidden");
  		  $("#"+strBottomLineId+intTableRow).attr("style","visibility:hidden");
		}
	});	
	
	
	intLineRowId	=	getLastTableRow(strTableId,strBottomLineId);
	
	$("#"+strBottomLineId+intLineRowId).attr("style","visibility:hidden");
} 
/* function is used for remove table row
created by : Namrata */
function removeRowByConditon(strTableId,strHiddenControl,strRowIndex,strCheckFieldNameBeforeDelete,callFunctionNameAfterDeleteRow,strDeleteButtonId,strBottomLineId,strTableType,strPageType,blnShowMessage)
{
	//get the table name
	var strTable		= 	document.getElementById(strTableId);
	strTableType		=	strTableType.toUpperCase();
	// get total no of row
	var intTotalRow		=	document.getElementById(strHiddenControl).value;
	
	// get the lenght of the table
	var len 			= 	strTable.rows.length;
	
	var intIndex		=	strRowIndex.substring(strRowIndex.length-1,strRowIndex.length);
	
	if(strCheckFieldNameBeforeDelete != "")
	{
		strElement	=	document.getElementById(strCheckFieldNameBeforeDelete);
		
		// if Office name text box is exists then and value is not null then
		if(strElement && strElement.value != "")
		{
			strDeleteRowMessage = $("#hid_delete_row_message").val()+"_test_mesage";
			//given the confirm message 
		
			if(confirm (strDeleteRowMessage) )
			{		
				
				if(strTableType == "LOCATION" )
				{
					intOfficeId	=	$("#hid_address_id_"+intIndex).val();
					
					if(intOfficeId != "" && intOfficeId != 0)
					{
						strUrl	=	"index.php?file=med_common_ajax&action=DELETE_OFFICE&id="+intOfficeId;
						getURLData(strUrl);	
					}					
				}				
				//remove one row
				deleteRow(strRowIndex,strTableId)
				intTotalRow--;
			}
		}
		else
		{
			deleteRow(strRowIndex,strTableId)
			intTotalRow--;
		}
	}	
	else	//else remove row without confirm messge
	{	
		deleteRow(strRowIndex,strTableId)
		intTotalRow--;
	}
	
	//at last set total no of row of the lead office
	document.getElementById(strHiddenControl).value	=	intTotalRow;

	if(callFunctionNameAfterDeleteRow != "")
	{
		//call function 
		eval(callFunctionNameAfterDeleteRow);		
	}
	
	eval(setShowHideRemoveButton(intTotalRow,strTableId,strDeleteButtonId,strBottomLineId));	
}
/*delete table row 
created by : Namrata */
function deleteRow(strRowId,strTable)
{
	var elem = document.getElementById(strRowId);	
	
	if(elem)
	 (elem.parentNode).removeChild(elem)	
}

