let currentIndex = {
		y: 2017,
		mo: 11,
		d: 22,
		h: 12,
		m: 5,
		s: 13
	},
	errorCount = 0,
	contentA,
	contentB,
	previousDirection;

function pad(num) {
	return (num < 10) ? '0' + num : '' + num;
}

function load() {
	let url = 'htop';
	url += pad(currentIndex.y);
	url += pad(currentIndex.mo);
	url += pad(currentIndex.d);
	url += '_';
	url += pad(currentIndex.h);
	url += pad(currentIndex.m);
	url += pad(currentIndex.s);
	url += '.html';

	fetch(url).then((result) => {
		if (result.status === 200) {
			errorCount = 0;
			document.getElementById('name').innerText = url;
			contentA.src = url;

			window.location.href = '#' + url;
		} else {
			errorCount += 1;
			if (errorCount < 200) {
				step(previousDirection);
			}
		}
	});
}

const months = [31,28,31,30,31,30,31,31,30,31,30,31];

function step(direction) {
	previousDirection = direction;
	currentIndex.s += direction;

	if (currentIndex.s > 59) {
		currentIndex.m += 1;
		currentIndex.s = 0;
	} else if (currentIndex.s < 0) {
		currentIndex.m -= 1;
		currentIndex.s = 59;
	}

	if (currentIndex.m > 59) {
		currentIndex.h += 1;
		currentIndex.m = 0;
	} else if (currentIndex.m < 0) {
		currentIndex.h -= 1;
		currentIndex.m = 59;
	}

	if (currentIndex.h > 23) {
		currentIndex.d += 1;
		currentIndex.h = 0;
	} else if (currentIndex.h < 0) {
		currentIndex.d -= 1;
		currentIndex.h = 23;
	}

	if (currentIndex.d > months[currentIndex.mo - 1]) {
		currentIndex.mo += 1;
		currentIndex.d = 1;
	} else if (currentIndex.d < 1) {
		currentIndex.mo -= 1;
		currentIndex.d = months[currentIndex.mo - 1];
	}

	if (currentIndex.mo > 12) {
		currentIndex.y += 1;
		currentIndex.mo = 1;
	} else if (currentIndex.mo < 1) {
		currentIndex.y -= 1;
		currentIndex.mo = 12;
	}

	load();
}

function init() {
	document.getElementById('previous').addEventListener('click', () => {
		step(-1);
	});
	document.getElementById('next').addEventListener('click', () => {
		step(1);
	});

	if (window.location.href.indexOf('#') > -1) {
		let urlIndex = window.location.href.substring(window.location.href.indexOf('#') + 1).split(''); //htop20171122_120518.html

		if (urlIndex.length === 24) {
			urlIndex.splice(0, 4); // remove htop
			currentIndex.y = Number(urlIndex.splice(0, 4).join(''));
			currentIndex.mo = Number(urlIndex.splice(0, 2).join(''));
			currentIndex.d = Number(urlIndex.splice(0, 2).join(''));
			urlIndex.splice(0, 1); // remove undesrcore
			currentIndex.h = Number(urlIndex.splice(0, 2).join(''));
			currentIndex.m = Number(urlIndex.splice(0, 2).join(''));
			currentIndex.s = Number(urlIndex.splice(0, 2).join(''));
			console.log(currentIndex);
		}
	}

	contentA =  document.getElementById('contentA');
	contentB =  document.getElementById('contentB');
	load();
}

init();
