<template>
	<!-- Add the marker-camera to give the scene a point of reference to render on -->
	<a-scene
		embedded=""
		arjs="sourceType: webcam;"
		physics="debug: false; friction: 10; restitution: 0.0; gravity: -1.5;"
		rotation="125 0 0">

		<!-- define any assets we might need to reuse -->
		<a-assets>
			<a-mixin
				id="ball"
				geometry="primitive: sphere; radius: 1"
				material="color: #fff; side: double"
				physics-body="mass: 5; boundingBox: 2 2 2"></a-mixin>
		</a-assets>

		<!-- Add the ground -->
		<a-plane
			id="ground"
			rotation="90 90 0"
			scale="1 1 1"
			position="0 0 -7.5"
			geometry="height:5; width: 15"
			material="side: double"
			color="#F9B764"
			static-body="sphereRadius: NaN"></a-plane>

		<!-- Add the skittles -->
		<a-entity
			id="Skittle-1"
			dynamic-body="sphereRadius: NaN; mass: 1.5"
			position="0 1 -12"
			material="color:#000"
			mixin="null"
			geometry="radius:0.5;height:2;primitive:cylinder"></a-entity>

		<a-entity
			id="Skittle-2"
			dynamic-body="sphereRadius: NaN; mass: 1.5"
			position="1.5 1 -14"
			material="color:#000"
			mixin="null"
			geometry="primitive:cylinder;height:2;radius:0.5"></a-entity>

		<a-entity
			id="Skittle-3"
			dynamic-body="sphereRadius: NaN; mass: 1.5"
			position="-1.847 1 -14"
			material="color:#000"
			mixin="null"
			geometry="primitive:cylinder;height:2;radius:0.5"></a-entity>

		<a-entity
			id="Skittle-4"
			dynamic-body="sphereRadius: NaN; mass: 1.5"
			position="0 1 -14"
			material="color:#000"
			mixin="null"
			geometry="primitive:cylinder;height:2;radius:0.5"></a-entity>

		<!-- finally add the player -->
		<a-entity
			id="player"
			dynamic-body="sphereRadius: NaN; mass: 50"
			mixin="ball"
			quaternion="0 0 0 1"
			position = "0 2 -0.55"
			velocity=""
			scale="1 1 1"></a-entity>

	</a-scene>
</template>

<script>
const aframe = require('aframe');
const aframeAR = require('aframe-ar');
const three = require('three.js');


export default {
	name: 'HelloWorld',
	props: {
		msg: String
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
		margin: 40px 0 0;
}
ul {
		list-style-type: none;
		padding: 0;
}
li {
		display: inline-block;
		margin: 0 10px;
}
a {
		color: #42b983;
}
</style>
