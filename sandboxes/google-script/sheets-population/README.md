# Sheets Population
See [Code.js](/Code.js) for documentation on the current implementation

## Concept
- Easier reading and input (google forms)
- Auto fill account codes on sheet. Store account codes and order titles as key values.
- Save account codes for next time when user inputted

## Deployment
To publish changes to this app:
1. raise an issue / otherwise communicate with collaborators
2. install the clasp cli
3. from this folder run: `clasp push`

## Architecture
Order titles that have been seen before and have an account code provided are stored in a seperate sheet of key value pairs, named 'Store'.

If you have access, the sheet is [here](https://docs.google.com/spreadsheets/d/1OR8KySK4_EW1tIBgeOOsM-BL0OgncrnIJLxtgP3XxPY/edit#gid=1336382658).

The script is both stored in this repo and as part of the sheet. To go to the scripts editor, press Tools > Script Editor. Remember to keep the git repo
in sync with the version in google drive!

## Known issues
_none!_

## Roadmap
- take in data as some type of form as opposed to a spreadsheet.
- store data elsewhere to a second sheet