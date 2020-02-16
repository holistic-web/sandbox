# Vue Experiment

This is an experiment to use aframe and aframe ar in a vue project.

This will allow us to build out future AR projects with a more component based architecture.

It is recommended to look over these two tutorials before going in here:
- [Web XR](https://github.com/holistic-web/ar-sandbox/blob/master/web-xr) - a-frame and 3d graphics in web
- [AR.js](https://github.com/holistic-web/ar-sandbox/blob/master/ar-js) - AR space station tracker in js

## What we've learned:

### A Frame as a module
A vue component can be created using aframe with something as simple as:
```
<template>
	<div class="home">
		<a-scene>
			<a-sky :src="require('../assets/background.jpg')"></a-sky>
		</a-scene>
	</div>
</template>

<script>
require('aframe');

export default {

};
</script>
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
