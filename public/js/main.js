var calibrateButton = document.getElementById('calibrate');
calibrateButton.addEventListener('click', function(e) {
	var httpRequest = new XMLHttpRequest();
	if (!httpRequest) {
		alert('Cannot create an XML HTTP instance!');
		return false;
	}

	httpRequest.open('POST', '/calibrate');
	httpRequest.send();
});

var debugButton = document.getElementById('debug');
debugButton.addEventListener('click', function(e) {
	var httpRequest = new XMLHttpRequest();
	if (!httpRequest) {
		alert('Cannot create an XML HTTP instance!');
		return false;
	}

	httpRequest.open('POST', '/debug');
	httpRequest.send();
});

var ul = document.getElementById('menu'),
    start = document.getElementById('start'),
    clock = document.getElementById('timer'),
    isPaused = false;

ul.addEventListener('click', function(e) {
	if (e.target.tagName === 'LI') {
		var newsrc = e.target.getAttribute('data-src');
		var newtitle = e.target.getAttribute('data-title');
		document.getElementById('videoPlayer').setAttribute('src', newsrc)
		document.getElementById('title').innerHTML = newtitle;
		start.style.display = 'block';
		pause.style.display = 'none';
		resumeReset.style.display = 'none';
		reset();

		setPose(newtitle);
	}
});

var selector = '#menu li',
    elems = document.querySelectorAll(selector),
    makeActive;

makeActive = function () {
    for (var i = 0; i < elems.length; i++) {
		elems[i].classList.remove('active');
	}
	this.classList.add('active');
};

for (var i = 0; i < elems.length; i++) {
	elems[i].addEventListener('mousedown', makeActive);
}

/* NEW TIMER NOT BASED ON setInteval */

var resumeReset = document.getElementById('resumeReset'),
    pause = document.getElementById('pause'),
    start = document.getElementById('start');

resumeReset.style.display = 'none';
pause.style.display = 'none';

document.getElementById('startBtn').addEventListener('click', function(e) {
	start.style.display = 'none';
	pause.style.display = 'block';
	resumeReset.style.display = 'none';
	document.getElementById('counter').innerHTML = '0:00';
	startPause();
});
document.getElementById('pauseBtn').addEventListener('click', function(e) {
	start.style.display = 'none';
	pause.style.display = 'none';
	resumeReset.style.display = 'block';
	startPause();
});
document.getElementById('resumeBtn').addEventListener('click', function(e) {
	start.style.display = 'none';
	pause.style.display = 'block';
	resumeReset.style.display = 'none';
	startPause();
});
document.getElementById('resetBtn').addEventListener('click', function(e) {
	start.style.display = 'block';
	pause.style.display = 'none';
	resumeReset.style.display = 'none';
	reset();
});

var time = 0,
    secs = 0,
    mins = 0,
    running = false;

function startPause() {
	if (!running) {
		running = true;
		increment();
	} else {
		running = false;
	}
}

function reset() {
	clearTimeout(myTimeout);
	document.getElementById('counter').innerHTML = '&nbsp;';
	running = false;
	secs = 0;
	mins = 0;
	time = 0;
}

var myTimeout;

function increment() {
	if (running) {
		myTimeout = setTimeout(function() {
			//var mins = Math.floor(time / 10 / 60 );
			
			secs++;
			time++;
			
			if (secs % 60 === 0) {
				console.log(mins);
				mins++;
				secs = 0;
			}
			
			if(secs <= 9) {
				secs = '0' + secs;
			}
			
			document.getElementById('counter').innerHTML = mins + ':' + secs;
			increment();
		}, 1000);
	}
}

function setPose(pose) {
	console.log(pose);

	var httpRequest = new XMLHttpRequest();
	if (!httpRequest) {
		alert('Cannot create an XML HTTP instance!');
		return false;
	}

	httpRequest.open('POST', '/pose/' + pose.toLowerCase());
	httpRequest.send();
}
