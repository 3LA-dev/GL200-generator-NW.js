// ::::::::::::::::::::::::::::::: Theme materializecss
$(document).ready(function () {
	$('.collapsible').collapsible({
		accordion: false
	});
	$('select').material_select();
});

//::::::::::::::::::::::::::::::::: Node_Modules
var net = require('net');
var moment = require('moment');
global.createSocket = false;
// ::::::::::::::::::::::::::::::::  Data GPS Default
global.datGL200 = {
	host: '127.0.0.1',
	port: '8090',
	protocolVersion: '02010B',
	uniqueID: '135790246811220',
	deviceName: 'LoremGL200',
	batteryPercentage: 80,
	GPSUTCtime: moment().format('YYYYMMDDHHmmss'),
	Speed: "127.5",
	Longitude: "-98.707299",
	Latitude: "20.102827",
	Altitude: "00340.5",
	GPSaccuracy: 30,
	Azimuth: 150,
	MCC: "0334",
	MNC: "0020",
	LAC: "FFFF",
	CellID: "1234",
	OdoMileage: "4294967.5"
};
//:::::::::::::::::::::::::::::::::: Conect Socket TCP
function conectSocket() {
	if (global.createSocket) {
		global.socket.destroy();
		global.createSocket = false;
		$(".consol").append(">> Disconnect: Host: " + global.datGL200.host + " Port: " + global.datGL200.port + "<br>");
	} else {
		global.createSocket = true;
		var hostSocket = $('#hostSocket').val();
		var portSocket = $('#portSocket').val();
		if (hostSocket != "")
			global.datGL200.host = hostSocket;
		//global.datGL200.host = hostSocket || ;
		if (portSocket != "")
			global.datGL200.port = portSocket;
		global.socket = net.connect({
			host: global.datGL200.host,
			port: global.datGL200.port
		}, function () {
			$(".consol").append(">> Conect: Host: " + global.datGL200.host + " Port: " + global.datGL200.port + "<br>");
			$('#hostSocket').attr("placeholder", global.datGL200.host);
			$('#portSocket').attr("placeholder", global.datGL200.port);
			gtpna();
		});
	}
};

//:::::::::::::::::::::::::::::::::::: Send +RESP:GTPNA
function gtpna() {
	var uniqID = $('#IMEI').val();
	var deviceName = $('#deviceName').val();
	var protocolVersion = $('#protocolVersion').val();
	var timeSend = moment().format('YYYYMMDDHHmmss');
	var countNumber = 1001;
	if (uniqID != '')
		global.datGL200.uniqueID = uniqID;
	if (deviceName != '')
		global.datGL200.deviceName = deviceName;
	if (protocolVersion != '')
		global.datGL200.protocolVersion = protocolVersion;
	var tramaGTPNA = [];
	tramaGTPNA.push('+RESP:GTPNA');
	tramaGTPNA.push(global.datGL200.protocolVersion);
	tramaGTPNA.push(global.datGL200.uniqueID);
	tramaGTPNA.push(global.datGL200.deviceName);
	tramaGTPNA.push(timeSend);
	tramaGTPNA.push(countNumber + '$');
	global.socket.write('' + tramaGTPNA);
	$(".consol").append(">> " + tramaGTPNA + '<br>');
	$('#IMEI').attr("placeholder", global.datGL200.uniqueID);
	$('#deviceName').attr("placeholder", global.datGL200.deviceName);
	$('#protocolVersion').attr("placeholder", global.datGL200.protocolVersion);
};

//:::::::::::::::::::::::::::::::::::::: Get All Input and Generate Trama
function getAllInput() {
	global.tramaBaseReport = [];
	global.tramaBaseReport.push($('#protocolVersion').val() || global.datGL200.protocolVersion);
	global.tramaBaseReport.push($('#IMEI').val() || global.datGL200.uniqueID);
	global.tramaBaseReport.push($('#deviceName').val() || global.datGL200.deviceName);
	global.tramaBaseReport.push("0"); // Report ID/Append mask <=4 0 – FFFF +RESP:GTGEO/+RESP:GTFRI
	global.tramaBaseReport.push("0"); // Report Type 0 | 1  +RESP:GTGEO/+RESP:GTSPD/+RESP:GTNMR 
	global.tramaBaseReport.push("1"); // Confidential Number of points in one report message. <=2 0-15 +RESP:GTFRI
	global.tramaBaseReport.push($('#GPSaccuracy').val() || global.datGL200.GPSaccuracy);
	global.tramaBaseReport.push($('#Speed').val() || global.datGL200.Speed);
	global.tramaBaseReport.push($('#Azimuth').val() || global.datGL200.Azimuth);
	global.tramaBaseReport.push($('#Altitude').val() || global.datGL200.Altitude);
	global.tramaBaseReport.push($('#Longitude').val() || global.datGL200.Longitude);
	global.tramaBaseReport.push($('#Latitude').val() || global.datGL200.Latitude);
	global.tramaBaseReport.push($('#GPSUTCtime').val() || global.datGL200.GPSUTCtime);
	global.tramaBaseReport.push($('#MCC').val() || global.datGL200.MCC);
	global.tramaBaseReport.push($('#MNC').val() || global.datGL200.MNC);
	global.tramaBaseReport.push($('#LAC').val() || global.datGL200.LAC);
	global.tramaBaseReport.push($('#CellID').val() || global.datGL200.CellID);
	global.tramaBaseReport.push($('#OdoMileage').val() || global.datGL200.OdoMileage);
	global.tramaBaseReport.push($('#batterypercentage').val() || global.datGL200.batterypercentage);
	global.tramaBaseReport.push('0'); // I/O status <=4 0-FFFF A hexadecimal value to indicate the I/O status.
	global.tramaBaseReport.push(moment().format('YYYYMMDDHHmmss')); //Send Time
	global.tramaBaseReport.push('FFFF$'); //Count Number + Tail
};

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Send Report
function sendReport() {
	var inputReport = $('#selectReport').val();
	getAllInput();
	global.tramaBaseReport[4] = inputReport[inputReport.length - 1];
	var tramaSend = "+RESP:" + inputReport.substring(0, inputReport.length - 1) + "," + global.tramaBaseReport
	global.socket.write('' + tramaSend);
	$(".consol").append(">>" + tramaSend + '<br>');
};

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Console Input
function consoleInput() {
	var tramaInput = $('#tramaInput').val();
	global.socket.write('' + tramaInput);
	$(".consol").append(">>" + tramaInput + '<br>');
	$('#tramaInput').val('');
};