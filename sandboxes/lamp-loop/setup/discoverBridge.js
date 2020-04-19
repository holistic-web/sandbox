const { v3: hueApi } = require('node-hue-api');

module.exports = async () => {
	const discoveryResults = await hueApi.discovery.nupnpSearch();

	if (discoveryResults.length === 0) {
		console.error('Failed to resolve any Hue Bridges');
		return null;
	} else {
		// Ignoring that you could have more than one Hue Bridge on a network as this is unlikely in 99.9% of users situations
		return discoveryResults[0].ipaddress;
	}
  }