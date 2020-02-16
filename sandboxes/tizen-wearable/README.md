# Tizen Sandbox
A collection of inspiring tizen projects.

## Setup:
*basic info is covered [here](https://developer.tizen.org/ko/development/training/web-application/getting-started/creating-your-first-tizen-wearable-web-application?langredirect=1), including how to install tizen studio and configure watch apps*

- ensure your watch is connected and registered in tizen device manager
- to add tizen to your `path` variable add `tizen-studio/tools/ide/bin` to your path
- in tizen studio `file -> / open -> / {this-repo}` to load the current projects
- ~change directory into a project folder and run `tizen build-app`~
- ~get the package id from line 3 of [`config.xml`](https://github.com/holistic-web/tizen-sandbox/blob/master/BasicUI/config.xml#L3)~
- ~run `tizen run -p PACKAGE-ID`  to run the app on your watch~

*cli seems to be experiencing issues, for now use the tizen `build signed backage` and `install app` from Tizen Studio and Device Manager*

## Projects:

### [Basic UI](https://github.com/holistic-web/tizen-sandbox/tree/master/BasicUI)
_Links are outdated, files can be found within the `/BasicUI` folder._

<img src="https://i.imgur.com/oRyLe2D.jpg" width="300"  />

Loads a maps image of your current location.
- custom icon by replacing [`icon.png`](https://github.com/holistic-web/tizen-sandbox/blob/master/BasicUI/icon.png)
- loads image from google maps api (**Add your api key in [index.html](https://github.com/holistic-web/tizen-sandbox/blob/master/BasicUI/index.html#L16)! Api key can be found [here](https://console.cloud.google.com/google/maps-apis/onboard?services=maps-backend.googleapis.com,static-maps-backend.googleapis.com,street-view-image-backend.googleapis.com,maps-android-backend.googleapis.com,maps-ios-backend.googleapis.com,streetviewpublish.googleapis.com,maps-embed-backend.googleapis.com&consoleUI=CLOUD)**)

### Location Test
*to be started*

### News Briefing Widget
*to be started*

### Spinning Arrow
*to be started*
