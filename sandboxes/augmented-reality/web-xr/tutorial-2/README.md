# Tutorial 2 - Making a Box

https://webxrtutorials.com/aframe/making-a-box/

## Steps
1. add the following beneath the existing `<a-sky>` component
	```
	<a-box></a-box>
	```

2. place the box directly in front of us by replacing it with
	```
	<a-box position="0 1 -3"></a-box>
	```

3. add colour and rotation by replacing it with
	```
	<a-box position="0 1 -3" color="#23A6C7" rotation="10 45 30"></a-box>
	```

## Docs
- <a-box> primitive: https://aframe.io/docs/0.9.0/primitives/a-box.html
- A-Frame position: https://aframe.io/docs/0.9.0/components/position.html
- A-Frame rotation: https://aframe.io/docs/0.9.0/components/rotation.html