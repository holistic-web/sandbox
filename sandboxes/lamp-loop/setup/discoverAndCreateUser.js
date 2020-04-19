const { v3: hueApi } = require('node-hue-api');
const config = require('../config');
const discoverBridge = require('./discoverBridge');

module.exports = async () => {
	const ipAddress = await discoverBridge();

	// Create an unauthenticated instance of the Hue API so that we can create a new user
	const unauthenticatedApi = await hueApi.api.createLocal(ipAddress).connect();

	let createdUser;
	try {
		createdUser = await unauthenticatedApi.users.createUser(config.appName, config.deviceName);
		console.log('*******************************************************************************\n');
		console.log('User has been created on the Hue Bridge. The following username can be used to\n' +
					'authenticate with the Bridge and provide full local access to the Hue Bridge.\n' +
					'YOU SHOULD TREAT THIS LIKE A PASSWORD\n');
		console.log(`Hue Bridge User: ${createdUser.username}`);
		console.log(`Hue Bridge User Client Key: ${createdUser.clientkey}`);
		console.log('*******************************************************************************\n');

		// Create a new API instance that is authenticated with the new user we created
		const authenticatedApi = await hueApi.api.createLocal(ipAddress).connect(createdUser.username);

		// Do something with the authenticated user/api
		const bridgeConfig = await authenticatedApi.configuration.getConfiguration();
		console.log(`Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);

	} catch(err) {
		if (err.getHueErrorType() === 101) {
			console.error('The Link button on the bridge was not pressed. Please press the Link button and try again.');
		} else {
			console.error(`Unexpected Error: ${err.message}`);
		}
	}
};
