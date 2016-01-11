// ::::::::::::::::::::::::::::::: Theme materializecss
$(document).ready(function () {
	$('.collapsible').collapsible({
		accordion: false
	});
});
//::::::::::::::::::::::::::::::::: Node_Modules
var net = require('net');
var moment = require('moment');
// ::::::::::::::::::::::::::::::::  Data GPS Default
global.datGL200 = {
	host: '127.0.0.1',
	port: '8090',
	protocolVersion: '02010B',
	uniqueID: '135790246811220',
	deviceName: 'LoremGL200'
};
//:::::::::::::::::::::::::::::::::: Conect Socket TCP
function conectSocket() {
	var hostSocket = $('#hostSocket').val();
	var portSocket = $('#portSocket').val();
	if (hostSocket != "")
		global.datGL200.host = hostSocket;
	if (portSocket != "")
		global.datGL200.port = portSocket;
	global.socket = net.connect({
		host: global.datGL200.host,
		port: global.datGL200.port
	}, function () {
		$(".consol").append(">> Conect: Host: " + global.datGL200.host + " Port: " + global.datGL200.port + "<br>");
		$('#hostSocket').attr("placeholder", global.datGL200.host);
		$('#portSocket').attr("placeholder", global.datGL200.port);
	});
}

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
}