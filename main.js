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
							arduinoPort = null;
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

	if (arduinoPort) {
		buffer[0] = 1;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.post('/next', function(req, res) {
	let buffer = new Buffer(1);

	if (arduinoPort) {
		buffer[0] = 2;
		arduinoPort.write(buffer);
	}

		res.sendStatus(200);
});

app.post('/pose/hinge', function(req, res) {
	console.log('Hinge');

	if (arduinoPort) {
		let buffer = new Buffer(1);
		buffer[0] = 10;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.post('/pose/pull', function(req, res) {
	console.log('Pull');

	if (arduinoPort) {
		let buffer = new Buffer(1);
		buffer[0] = 12;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.post('/pose/squat', function(req, res) {
	console.log('Squat');

	if (arduinoPort) {
		let buffer = new Buffer(1);
		buffer[0] = 14;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.post('/pose/push', function(req, res) {
	console.log('Push');

	if (arduinoPort) {
		let buffer = new Buffer(1);
		buffer[0] = 13;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.post('/pose/lunge', function(req, res) {
	console.log('Lunge');

	if (arduinoPort) {
		let buffer = new Buffer(1);
		buffer[0] = 11;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.post('/pose/rotate', function(req, res) {
	console.log('Rotate');

	if (arduinoPort) {
		let buffer = new Buffer(1);
		buffer[0] = 15;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.post('/calibrate', function(req, res) {
	console.log('Calibrate');

	if (arduinoPort) {
		let buffer = new Buffer(1);
		buffer[0] = 3;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.post('/debug', function(req, res) {
	console.log('Debug');

	if (arduinoPort) {
		let buffer = new Buffer(1);
		buffer[0] = 9;
		arduinoPort.write(buffer);
	}

	res.sendStatus(200);
});

app.listen(8080, function() {
	setInterval(findArduino, 1000);

	console.log('Serving at localhost:8080');
});
