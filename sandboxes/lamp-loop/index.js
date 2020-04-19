require('dotenv').config();
const { v3: nodeHueApi } = require('node-hue-api');
const config = require('./config');

const sleep = waitTimeInMs => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const main = async () => {
	const bridgeApi = await nodeHueApi.api.createLocal(config.bridge.ipAddress).connect(
		config.bridge.user,
		config.bridge.key
	);
	const bridgeConfig = await bridgeApi.configuration.getConfiguration();
	console.log(`> Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);

	console.log(`> Preparing loop animation for ${config.animation.lightIds}...`);
	const lightStates = [];
	const requestPromises = config.animation.lightIds.map(async (lightId, i) => {
		lightStates[i] = await bridgeApi.lights.getLightState(lightId);
	});
	await Promise.all(requestPromises);

	console.log(`> Running loop animation for lights: ${config.animation.lightIds}...`);
	while (true) {
		for (let frameIndex=0; frameIndex<config.animation.lightIds.length; frameIndex++) {

			for (let lightIndex=0; lightIndex<config.animation.lightIds.length; lightIndex++) {

				const lightId = config.animation.lightIds[lightIndex];
				let state = lightStates[frameIndex + lightIndex];
				if (!state) state = lightStates[(frameIndex + lightIndex) - lightStates.length];
				await bridgeApi.lights.setLightState(lightId, state);

			}
			await sleep(config.animation.delay);

		}
	}
};

main();