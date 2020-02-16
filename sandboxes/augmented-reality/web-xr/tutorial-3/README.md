# Tutorial 2 - Iterating over boxes

https://webxrtutorials.com/aframe/iterating-over-boxes/

## Steps
1. add the following script below the `</a-scene>` tag to programatically add more boxes
	```
	 <script type="text/javascript">
		const scene = document.querySelector("a-scene"); // Finds the a-scene element.
		const box = document.createElement("a-box"); // Creates an a-box element.
		box.setAttribute("position", "-2 2 -3"); // Adds attributes to the box.
		scene.appendChild(box); // Adds the box to the scene.
	</script>
	```

2. now remove the original `<a-box>` tag and replace the `<script>` tag with
	```
	<script type="text/javascript">
		const scene = document.querySelector("a-scene"); // Finds the a-scene element.
		const max = 10; // The number of boxes we want.
		for (let i = 0; i < max; i++) { // Iterates from 0 to 9.
			const box = document.createElement("a-box"); // Creates an a-box element on each loop.
			box.setAttribute("color", "#23A6C7"); // Color attribute.
			box.setAttribute("rotation", "10 45 30"); // Rotation attribute.
			box.setAttribute("position", `${i} 1 -3`); // Position attribute with x as variable.

			scene.appendChild(box); // Adds the box to the scene.
		}
	</script>
	```

3. we will now make a circle of cubes, again replace the script tag with
	```
	<script type="text/javascript">
		const scene = document.querySelector("a-scene"); // Finds the a-scene element.
		const max = 10; // The number of boxes we want.
		const radius = 6; // The radius of the box circle.
		const increase = Math.PI * 2 / max; // The distance between boxes in radians.
		let angle = 0; // The starting angle.

		for (let i = 0; i < max; i++) { // Iterates from 0 to 9.
			const box = document.createElement("a-box"); // Creates an a-box element on each loop.
			const x = radius * Math.cos(angle); // Calculates the cosine of the angle.
			const z = radius * Math.sin(angle); // Calculates the sine of the angle.

			box.setAttribute("color", "#23A6C7"); // Color attribute.
			box.setAttribute("rotation", "10 45 30"); // Rotation attribute.
			box.setAttribute("position", `${x} 1 ${z}`); // Position attribute with x and z as variables.

			scene.appendChild(box); // Adds the box to the scene.

			angle += increase; // Increases the angle of the next box.
		}
	</script>
	```


## Docs
- MDN - Loops and iteration: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
- MDN - Math: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
- MDN - Math.PI: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
- MDN - Math.cos(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
- MDN - Math.sin(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin