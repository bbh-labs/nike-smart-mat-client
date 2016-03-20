'use strict';

const express = require('express');
const app = express();

const serialPort = require('serialport');
const SerialPort = require('serialport').SerialPort;
var arduinoPort = null;

function findArduino() {
	if (!arduinoPort) {
		serialPort.list(function(err, ports) {
			ports.forEach(function(port) {
				if (port && port.manufacturer && port.manufacturer.indexOf('Arduino') >= 0) {
					arduinoPort = new SerialPort(port.comName, { baudrate: 9600, disconnectedCallback: disconnectedCallback });
					arduinoPort.open(function(error) {
						if (error) {
							console.error('Failed to open serial port:', error);
						} else {
							console.log('Arduino connected');
						}
					});
				}
			});
		});
	}
}

function disconnectedCallback() {
	if (arduinoPort) {
		console.log('Arduino disconnected');
		arduinoPort = null;
	}
}

app.use(express.static('public'));

app.post('/previous', function(req, res) {
	let buffer = new Buffer(1);
	buffer[0] = 1;
	arduinoPort.write(buffer);
	res.sendStatus(200);
});

app.post('/next', function(req, res) {
	let buffer = new Buffer(1);
	buffer[0] = 2;
	arduinoPort.write(buffer);
	res.sendStatus(200);
});

app.listen(8080, function() {
	setInterval(findArduino, 1000);

	console.log('Serving at localhost:8080');
});
