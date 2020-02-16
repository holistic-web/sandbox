# Tutorial 1 - Setting up aframe

https://webxrtutorials.com/aframe/setting-up-aframe/

## Steps

1. Setup index.html with the following head tag to include aframe from a cdn
	```
	<head>
		<meta charset="UTF-8">
		<title>A-Frame Tutorial 1</title>
		<script src="https://aframe.io/releases/0.9.0/aframe.min.js"></script>
	</head>
	```

2. Add a photo suitable to be used as a background and add this code to the body
	```
	<a-scene>
		<a-sky src="/assets/background.jpg"></a-sky>
	</a-scene>
	```

You should now be able to see a 3d farmland

## Docs
- <a-sky> primitive: https://aframe.io/docs/0.9.0/primitives/a-sky.html
