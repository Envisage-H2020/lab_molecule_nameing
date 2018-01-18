/*jslint white: true, browser: true, undef: true, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, strict: true, newcap: true, immed: true, maxerr: 14 */
/*global window: false, REDIPS: true */

/* enable strict mode */							
"use strict";	

var redips = {};
var redipsInit;
var rd = REDIPS.drag;

var nameStructure = new Array();
var currentMolecule = 0;
var molName = "";
var molSections = [ '--', 'meth','eth','prop','but','pent','hex','hept','oct','non','dec','undec','dodec', 'an','en','yn','dien','diyn', 'e','oic acid','al','one','ol','amine','ether','oate','chloro','bromo','iodo','fluoro','hydroxy','amino','alkoxy','nitrile', 'methyl','ethyl','propyl','butyl','dimethyl','diethyl','isobutyl', '2','3','4','5','6','7','8' ];
var molNameCtr = 0;
var answerKey = ['--','methane', 'methanol', 'ethanol', 'ethene', 'ethanoic acid', 'butane', 'propanone', 'methylamine', 'chloromethane', '2-hexyne', 'methylpropanal', 'ethylmethylether', 'ethylbutanoate', 'propennitrile', '3-buten-2-ol', '4-methyl-2-pentanone', '3-butenal', 'isobutylpropanoate', '3-butynoic acid'];

var molString = ""
var numberSelected = 0;
var numberCorrect = 0;

var helpStatus = 0;

var mainTable = "";
var mainTableTop = "<table id='table2' border='0' BORDERCOLOR='a01919'> <colgroup> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> </colgroup>  <tr> <td colspan='12' height='30' id='topLine' style='background-color:#a01919;color:white' class='mark'><b>GoLab Molecule Naming Lab for molecule number "+currentMolecule+"</b></td> </tr> <tr> <td colspan='6' class='mark'><b>Controls</b></td> <td colspan='6' rowspan='5' class='mark'><img id='curMol' src='images/molStruct/s1.png' width='100%'></td> </tr> <tr> <td colspan='2' class='mark'><button onclick='reset()'>Clear and start again</button></td> <td colspan='2' class='mark'><button onclick='doCheck()'>Check your answer</button></td> <td colspan='2' class='mark'><button id='helpfunc' onclick='doHelp()'>Show help and instructions</button></td> </tr> <tr> <td colspan='4' class='mark'>Select another molecule</td> <td colspan='2' class='mark'><form><select id='moleculeSelect2' name='moleculeSelect2' onchange='selectSeries2()'> <option value='0'>--none--</option> <option value='1'>Molecule 01</option> <option value='2'>Molecule 02</option> <option value='3'>Molecule 03</option> <option value='4'>Molecule 04</option> <option value='5'>Molecule 05</option> <option value='6'>Molecule 06</option> <option value='7'>Molecule 07</option> <option value='8'>Molecule 08</option> <option value='9'>Molecule 09</option> <option value='10'>Molecule 10</option> <option value='11'>Molecule 11</option> <option value='12'>Molecule 12</option> <option value='13'>Molecule 13</option> <option value='14'>Molecule 14</option> <option value='15'>Molecule 15</option> <option value='16'>Molecule 16</option><option value='17'>Molecule 17</option><option value='18'>Molecule 18</option><option value='19'>Molecule 19</option></select> </form></td> </tr> <tr> <td colspan='6' class='mark'><b>Messages</b></td> </tr> <tr height='30'> <td id='responseTxt' colspan='6' class='mark'></td> </tr> <tr> <td colspan='12' height='30' style='background-color:#a01919;color:white' class='mark'>Use your mouse to drag name sections from the grid below to the bottom row to construct the name of the molecule shown in the diagram above.</td> </tr> <tr height='24'> <td colspan='3' style='text-align:left; class='mark'><b>Number of Carbons</b></td> </tr> <tr height='30'> <td colspan='1' class='single'><div id='d01' class='drag clone'><img src='images/selButtons/c1.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d02' class='drag clone'><img src='images/selButtons/c2.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d03' class='drag clone'><img src='images/selButtons/c3.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d04' class='drag clone'><img src='images/selButtons/c4.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d05' class='drag clone'><img src='images/selButtons/c5.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d06' class='drag clone'><img src='images/selButtons/c6.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d07' class='drag clone'><img src='images/selButtons/c7.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d08' class='drag clone'><img src='images/selButtons/c8.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d09' class='drag clone'><img src='images/selButtons/c9.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d10' class='drag clone'><img src='images/selButtons/c10.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d11' class='drag clone'><img src='images/selButtons/c11.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d12' class='drag clone'><img src='images/selButtons/c12.png' width='100%'></div></td> </tr> <tr height='24'> <td colspan='3' style='text-align:left;' class='mark'><b>Bonds</b></td> </tr> <tr height='30'> <td colspan='1' class='single'><div id='d13' class='drag clone'><img src='images/selButtons/b1.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d14' class='drag clone'><img src='images/selButtons/b2.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d15' class='drag clone'><img src='images/selButtons/b3.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d16' class='drag clone'><img src='images/selButtons/b4.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d17' class='drag clone'><img src='images/selButtons/b5.png' width='100%'></div></td> <td colspan='7' class='mark'></td> </tr> <tr height='24'> <td colspan='3' style='text-align:left;' class='mark'><b>Functional Groups</b></td> </tr> <tr height='30'> <td colspan='1' class='single'><div id='d18' class='drag clone'><img src='images/selButtons/f1.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d19' class='drag clone'><img src='images/selButtons/f2.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d20' class='drag clone'><img src='images/selButtons/f3.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d21' class='drag clone'><img src='images/selButtons/f4.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d22' class='drag clone'><img src='images/selButtons/f5.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d23' class='drag clone'><img src='images/selButtons/f6.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d24' class='drag clone'><img src='images/selButtons/f7.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d25' class='drag clone'><img src='images/selButtons/f8.png' width='100%'></div></td> <td colspan='4' class='mark'></td> </tr> <tr height='30'> <td colspan='1' class='single'><div id='d26' class='drag clone'><img src='images/selButtons/f9.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d27' class='drag clone'><img src='images/selButtons/f10.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d28' class='drag clone'><img src='images/selButtons/f11.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d29' class='drag clone'><img src='images/selButtons/f12.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d30' class='drag clone'><img src='images/selButtons/f13.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d31' class='drag clone'><img src='images/selButtons/f14.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d32' class='drag clone'><img src='images/selButtons/f15.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d33' class='drag clone'><img src='images/selButtons/f16.png' width='100%'></div></td> <td colspan='4' class='mark'></td> </tr> <tr height='24'> <td colspan='3' style='text-align:left;' class='mark'><b>Side Chains</b></td> </tr> <tr height='30'> <td colspan='1' class='single'><div id='d34' class='drag clone'><img src='images/selButtons/s1.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d35' class='drag clone'><img src='images/selButtons/s2.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d36' class='drag clone'><img src='images/selButtons/s3.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d37' class='drag clone'><img src='images/selButtons/s4.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d38' class='drag clone'><img src='images/selButtons/s5.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d39' class='drag clone'><img src='images/selButtons/s6.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d40' class='drag clone'><img src='images/selButtons/s7.png' width='100%'></div></td> <td colspan='5' class='mark'></td> </tr> <tr height='24'> <td colspan='3' style='text-align:left;' class='mark'><b>Numbers</b></td> </tr> <tr height='30'> <td colspan='1' class='single'><div id='d41' class='drag clone'><img src='images/selButtons/n1.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d42' class='drag clone'><img src='images/selButtons/n2.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d43' class='drag clone'><img src='images/selButtons/n3.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d44' class='drag clone'><img src='images/selButtons/n4.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d45' class='drag clone'><img src='images/selButtons/n5.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d46' class='drag clone'><img src='images/selButtons/n6.png' width='100%'></div></td> <td colspan='1' class='single'><div id='d47' class='drag clone'><img src='images/selButtons/n7.png' width='100%'></div></td> <td colspan='5' class='mark'></td> </tr> <tr> <td colspan='12' height='30' style='background-color:#a01919;color:white' class='mark'>Drop your name sections in the row below. You can move reposition them with the mouse, or remove them using the trash area.</td></tr>";
var mainTableBottom = "<tr height='36'> <td class='trash' title='Trash' colspan='1'><b>Trash</b></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> <td colspan='1' class='single'></td> </tr> </table>";
var helpTable =  "<table id='table2' border='0' BORDERCOLOR='a01919'> <colgroup> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> <col width='100'/> </colgroup>  <tr> <td colspan='12' height='30' id='topLine' style='background-color:#a01919;color:white'><b>GoLab Molecule Naming Lab for molecule number "+currentMolecule+"</b></td> </tr> <tr> <td colspan='6'><b>Controls</b></td> <td colspan='6' rowspan='5'><img id='curMol' src='images/molStruct/s1.png' width='100%'></td> </tr>  <tr> <td colspan='2'><button onclick='reset()'>Clear and start again</button></td> <td colspan='2'><button onclick='doCheck()'>Check your answer</button></td> <td colspan='2'><button id='helpfunc' onclick='doHelp()'>Show help and instructions</button></td> </tr>  <tr> <td colspan='4'>Select another molecule</td> <td colspan='2'><form><select id='moleculeSelect2' name='moleculeSelect2' onchange='selectSeries2()'> <option value='0'>--none--</option> <option value='1'>Molecule 01</option> <option value='2'>Molecule 02</option> <option value='3'>Molecule 03</option> <option value='4'>Molecule 04</option> <option value='5'>Molecule 05</option> <option value='6'>Molecule 06</option> <option value='7'>Molecule 07</option> <option value='8'>Molecule 08</option> <option value='9'>Molecule 09</option> <option value='10'>Molecule 10</option> <option value='11'>Molecule 11</option> <option value='12'>Molecule 12</option> <option value='13'>Molecule 13</option> <option value='14'>Molecule 14</option> <option value='15'>Molecule 15</option> <option value='16'>Molecule 16</option><option value='17'>Molecule 17</option><option value='18'>Molecule 18</option><option value='19'>Molecule 19</option></select> </form></td> </tr>  <tr> <td colspan='6'><b>Messages</b></td> </tr> <tr height='30'> <td id='responseTxt' colspan='6'></td> </tr> <tr> <td colspan='12' height='30' style='background-color:#a01919;color:white'>Help Help and Instructions</td> </tr> <tr height='30'> <td colspan='12' style='text-align:left;'>Some help and instructions are shown below. If you would like to launch these in a separate browser window use this button. <button onclick='showHelpHTML()'>Launch separate help window</button></td> </tr>   <tr> <td colspan='12' height='30' style='background-color:#a01919;color:white'>Help on how to name a molecule easily</td> </tr> <tr> <td colspan='12' style='text-align:left;'> The aim of this online lab is to correctly name up to 19 different molecules. Once you have selected a particular molecule (which you can do at any time) it's diagram will be displayed in the top right of the display area.<ul> <li>Identify the functional group.</li> <li>Locate the longest carbon chain in the compound and name it.</li> <ul> <li>Note: A functional groups is always part of the parent chain.</li> </ul> <li>Check if there is one or more double or triple bond(s) in your parent chain and name them.</li> <li>Add the suffix of the functional group.</li> <li>Check if you need to define the position of the functional groups and/or a bond and/or a side chain.<li> <ul> <li>Note: The numbers that define the positions of the principal functional group and substituents are called locants. The locants are assigned such that the principal functional group gets the lowest possible locant.</li> </ul> <li>If the compound contains a functional group and a triple or double bond, the locant of the bond is added before the name of the compound while the locant of the functional groups is added before the suffix of the name (third part of the name). If there is no double or triple bond, the locant for the functional group goes before the name of the main parent chain.</li> <li>Acids and aldehydes are always on the first carbon of the parent chain so there is no need for numbering.</li> </ul></td> </tr> <tr> <td colspan='12' height='30' style='background-color:#a01919;color:white'>Instructions on how to use the lab</td> </tr> <tr> <td colspan='12' style='text-align:left;'>To create the name of the molecule you use the coloured name 'segments' shown in the main display. <ul> <li>Use your mouse to drag name segments to the bottom row of the display.</li><ul> <li>The name segments can be dropped anywhere onto the bottom row.</li> <li>Name segments can be repositioned simply by dragging with the mouse.</li> <li>If you have dropped a name segment you no longer need simply drag it to the 'Trash' area at the far left of the bottom row</li></ul>  <li>When you are ready check your name using the 'Check your answer' button in the 'Controls' section at the top of the display.</li><ul> <li>If your name is correct you will be shown a 3D animation of the selected molecule, and given the option of selecting another.</li><li>The 'Messages' section will inform you if your name is incorrect.</li></ul> <li>If you wish to start again use the 'Clear and start again' button in the 'Controls' section.</li> <li>When you have finished reading these instruction and help notes use the 'Close help and instructions' button in the 'Controls' section to return to the main screen.</li> <li>You can return to this screen at any time.</li> </ul>    </td> </tr> </table>";  



var saveTable = [];

var molPanels = new Array();
function preloadImages(){
	for(var x=1;x<=19;x++){
		molPanels[x] = new Image();
		molPanels[x].src = "images/molStruct/s"+x+".png"
	}
}

function randChangeGIF(ind){
	var gifIDX = (Math.floor(Math.random() * 18)+1)
	var gifSRC = 'images/anims/a'+gifIDX+'.gif'
	if(ind==1){
		$("#intGif1").attr("src",gifSRC);
	}else{
		$("#intGif2").attr("src",gifSRC);
	}
}

redipsInit = function () {	
	// initialization
	rd.init();
	// set hover color
	rd.hover.colorTd = '#9BB3DA';
	// this function (event handler) is called after element is dropped
	rd.event.dropped = function () {
    window.dataLayer.push({"event": "drop", "event_id": answerKey[currentMolecule] });

	};
	
	rd.style.borderEnabled = '';

	
	rd.event.clicked = function () {
		var itemID = rd.obj.id;
	};
};

if (window.addEventListener) {
	window.addEventListener('load', redipsInit, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redipsInit);
}

function stageOne(){
    window.dataLayer.push({"event": "start", "event_id": "stage_1"});

	if(currentMolecule > 0){
		mainTable = mainTableTop+mainTableBottom;
		var mainDisplay = mainTable;
		$('#drag').html(mainDisplay);
		$('#topLine').html("<b>GoLab Molecule Naming Lab for molecule number "+currentMolecule+"</b>");
		$("#curMol").attr("src",molPanels[currentMolecule].src);
		$("#moleculeSelect2").val(currentMolecule);
		rd.init();
	}
}

// Maybe this function is not used
function selectSeries(){
	var atomObj = document.getElementById("moleculeSelect2"); 
	var atomToSelect = parseInt(atomObj.options[atomObj.selectedIndex].value);
    window.dataLayer.push({"event": "select.molecule", "event_id": answerKey[currentMolecule]});

	currentMolecule = atomToSelect;
	numberSelected++;
}

function selectSeries2(){
	var atomObj = document.getElementById("moleculeSelect2"); 
	var atomToSelect = parseInt(atomObj.options[atomObj.selectedIndex].value);
	currentMolecule = atomToSelect;
    window.dataLayer.push({"event": "select.molecule", "event_id": answerKey[currentMolecule]});

	numberSelected++;
	reset();
}

function reset(){
	clearBottom();
	molNameCtr = 0;
	nameStructure = [];
	molName = '';
	$('#curName').html(molName);
	$('#responseTxt').html("");
    window.dataLayer.push({"event": "reset", "event_id": answerKey[currentMolecule]});

	stageOne();
}


function doCheck(){
	getTableValues();
	var responseMsg = '';
	if(molNameCtr == 0){
        window.dataLayer.push({"event": "check", "event_id": answerKey[currentMolecule], "event_value": false});

		responseMsg = "You have not yet added any name elements.";
	}else{
		var answerStr = answerKey[currentMolecule];
		if(answerStr == molString){
			numberCorrect++;
            window.dataLayer.push({"event": "check", "event_id": answerKey[currentMolecule], "event_value": true});
			doShowAnim();
		}else{
            window.dataLayer.push({"event": "check", "event_id": answerKey[currentMolecule], "event_value": false});

			responseMsg = "<b>"+molString+"</b> is not the correct name.";


		}
	}
	$('#responseTxt').html(responseMsg);
}

function doShowAnim(){
	// var mainDisplay = "<table id='table2' border='2' BORDERCOLOR='a01919'> <colgroup> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> </colgroup> <tr> <td colspan='8' height='30' style='background-color:#a01919;color:white'><b>GoLab Molecule Naming Lab for molecule number "+currentMolecule+"</b></td> </tr> <tr> <td colspan='5' id='finalMessage'><h2>Congratulations!!</h3> <br><br> You have correctly named the molecule <b>"+molName+"</b>. <br><br> In this session you have selected "+numberSelected+" and of these you have correctly identified "+numberCorrect+". <br><br> Select another molecule from the list below and see if you can correctly name it. <br><br> <form><select id='moleculeSelect2' name='moleculeSelect2' onchange='selectSeries2()'> <option value='0'>--none--</option> <option value='1'>Molecule 01</option> <option value='2'>Molecule 02</option> <option value='3'>Molecule 03</option> <option value='4'>Molecule 04</option> <option value='5'>Molecule 05</option> <option value='6'>Molecule 06</option> <option value='7'>Molecule 07</option> <option value='8'>Molecule 08</option> <option value='9'>Molecule 09</option> <option value='10'>Molecule 10</option> <option value='11'>Molecule 11</option> <option value='12'>Molecule 12</option> <option value='13'>Molecule 13</option> <option value='14'>Molecule 14</option> <option value='15'>Molecule 15</option> <option value='16'>Molecule 16</option> <option value='17'>Molecule 17</option> <option value='18'>Molecule 18</option> <option value='19'>Molecule 19</option> </select> </form> </td> <td rowspan='2' colspan='3'><img id='mol3D' src='images/anims/a"+currentMolecule+".gif' width='100%'></td> </tr>  <tr> <td colspan='5'><img id='curMol' src='images/molStruct/s"+currentMolecule+".png' width='100%'></td> </tr> </table>";
	var mainDisplay = "<table id='table2' border='2' BORDERCOLOR='a01919'> <colgroup> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> <col width='150'/> </colgroup> <tr> <td colspan='8' height='30' style='background-color:#a01919;color:white'><b>GoLab Molecule Naming Lab for molecule "+currentMolecule+"</b></td> </tr> <tr> <td colspan='5' id='finalMessage'><h2>Congratulations!!</h3> <br><br> You have correctly named the molecule <b>"+molString+"</b>. <br><br> In this session you have selected "+numberSelected+" and of these you have correctly identified "+numberCorrect+". <br><br> Select another molecule from the list below and see if you can correctly name it. <br><br> <form><select id='moleculeSelect2' name='moleculeSelect2' onchange='selectSeries2()'> <option value='0'>--none--</option> <option value='1'>Molecule 01</option> <option value='2'>Molecule 02</option> <option value='3'>Molecule 03</option> <option value='4'>Molecule 04</option> <option value='5'>Molecule 05</option> <option value='6'>Molecule 06</option> <option value='7'>Molecule 07</option> <option value='8'>Molecule 08</option> <option value='9'>Molecule 09</option> <option value='10'>Molecule 10</option> <option value='11'>Molecule 11</option> <option value='12'>Molecule 12</option> <option value='13'>Molecule 13</option> <option value='14'>Molecule 14</option> <option value='15'>Molecule 15</option> <option value='16'>Molecule 16</option> <option value='17'>Molecule 17</option> <option value='18'>Molecule 18</option> <option value='19'>Molecule 19</option> </select> </form> </td> <td rowspan='2' colspan='3'><img id='mol3D' src='images/anims/a"+currentMolecule+".gif' width='100%'></td> </tr>  <tr> <td colspan='5'><img id='curMol' src='images/molStruct/s"+currentMolecule+".png' width='100%'></td> </tr> </table>";
    window.dataLayer.push({"event": "start", "event_id": "stage_3"});

    $('#drag').html(mainDisplay);
	$("#moleculeSelect2").val(currentMolecule);
}

function doHelp(){
	var table = document.getElementById('table2');
	if(helpStatus == 0){
		
		// get current table vals
		for(var i=1; i<=11;i++){
			var cellContents = table.rows[19].cells[i].innerHTML;
			saveTable[i] = cellContents;
		}
        window.dataLayer.push({"event": "help", "event_id": answerKey[currentMolecule]});

		var mainDisplay = helpTable;
		$('#drag').html(mainDisplay);
		$("#curMol").attr("src",molPanels[currentMolecule].src);
		$('#helpfunc').html('Close help and instructions');
		$("#moleculeSelect2").val(currentMolecule);
		helpStatus = 1;
	}else{
		// restore table vals
		mainTableBottom = "<tr height='36'> <td class='trash' title='Trash' colspan='1'>Trash</td>";
		for(var i=1; i<=11;i++){
			mainTableBottom = mainTableBottom+"<td colspan='1' class='single'>"+saveTable[i]+"</td>";
		}
		mainTableBottom = mainTableBottom+" </tr> </table>";
		mainTable = mainTableTop+mainTableBottom;
		var mainDisplay = mainTable;
		$('#drag').html(mainDisplay);
		$("#curMol").attr("src",molPanels[currentMolecule].src);
		$('#helpfunc').html('Show help and instructions');
		$("#moleculeSelect2").val(currentMolecule);
		helpStatus = 0;	
	}
	$('#topLine').html("<b>GoLab Molecule Naming Lab for molecule number "+currentMolecule+"</b>");
	rd.init();
}

function getTableValues(){
	var table = document.getElementById('table2');
	molString = ""
	molNameCtr = 0;
	for(var i=1; i<=11;i++){
		var cellContents = table.rows[19].cells[i].innerHTML
		if(cellContents != ""){
			var getPos = cellContents.indexOf("id=");
			var checkItem = cellContents.substring(getPos+5,getPos+7);
			if(checkItem.substring(0,1) == '0'){
				checkItem = checkItem.substring(1,2);
			}
			var segmentStr = molSections[checkItem];
			if(checkItem >= 41){
				if(molNameCtr == 0){
					segmentStr = segmentStr.toString()+"-"
				}else{
					segmentStr = "-"+segmentStr.toString()+"-"
				}
			}
			molString = molString+segmentStr;
			molNameCtr++
		}
	}
}

function clearBottom(){
	mainTableBottom = "<tr height='36'> <td class='trash' title='Trash' colspan='1'>Trash</td>";
	for(var i=1; i<=11;i++){
		mainTableBottom = mainTableBottom+"<td colspan='1' class='single'></td>";
	}
	mainTableBottom = mainTableBottom+" </tr> </table>";
}

function showHelpHTML(){
    window.dataLayer.push({"event": "help", "event_id": molString});
	window.open("Help_Instructions.html","Help and Instructions");
}