window.onload = function() {
	// TODO:: Do your initialization job

	// add eventListener for tizenhwkey
	document.addEventListener("tizenhwkey", function(e) {
		if (e.keyName == "back")
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (ignore) {}
	});

	// box = document.querySelector("#textbox");


	// // Example web request:
	// var client = new XMLHttpRequest();
	// client.open('GET', 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyBplLjdQLX9rRadnDR7iVfYyE8L5JE0klU');
	// client.onloadstart = (data) => {
	// 	box.innerHTML = 'loading';
	// }
	// client.onload = (data) => {
	// 	box.innerHTML = JSON.stringify(client.responseText);
	// }
	// client.send();
};
