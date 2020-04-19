window.onload = function () {
	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName === "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
		}
	});
	try {
		getLocation();
		getData();
	} catch (err) {
		writeError(err);
	}

}

function writeError(errorText) {
	document.getElementById('error').innerHTML = errorText
}

const xhr = new XMLHttpRequest();

async function getData() {
	const url = 'https://asdsa-48c2f.firebaseio.com/tizen.json';
	let response = await fetch(url);
	response = await response.json();
	document.getElementById('data').innerHTML = JSON.stringify(response);
}

async function getLocation() {
	const position = await getCurrentPosition();
	document.getElementById('locationInfo').innerHTML = 'Latitude: ' + position.coords.latitude + '<br/>Longitude: ' + position.coords.longitude;

}

function getCurrentPosition(options = {}) {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};



function successCallback(position) {
}

function errorCallback(error) {
	var errorInfo = document.getElementById('locationInfo');
	switch (error.code) {
		case error.PERMISSION_DENIED:
			errorInfo.innerHTML = 'User denied the request for Geolocation.';
			break;
		case error.POSITION_UNAVAILABLE:
			errorInfo.innerHTML = 'Location information is unavailable.';
			break;
		case error.TIMEOUT:
			errorInfo.innerHTML = 'The request to get user location timed out.';
			break;
		case error.UNKNOWN_ERROR:
			errorInfo.innerHTML = 'An unknown error occurred.';
			break;
	}
}