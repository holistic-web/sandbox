# Codelab

This section follows the tutorial at: https://codelabs.developers.google.com/codelabs/apps-script-intro

## Breakdown
This tutorial asks you to:
1. create a new blank google sheet file
2. enter an address into cell `A1`
3. in the menu, click tools -> script editor
4. enter the following code into the `Code.gs` file:
	```
	function sendMap() {
		var sheet = SpreadsheetApp.getActiveSheet();
		var address = sheet.getRange('A1').getValue();
		var map = Maps.newStaticMap().addMarker(address);
		GmailApp.sendEmail('friend@example.com', 'Map', 'See below.', {attachments:[map]});
	}
	```
5. in the menu, click run -> run function -> sendMap

This will send an email of a static maps photo to a `friend@example.com`. Edit the email and see the results!