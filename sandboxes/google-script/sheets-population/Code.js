/**
 * This code provides helper tools for filling out account codes to match with titles. It will (when activated through the menu)
 * fill in any titles that are duplicates of titles that already have an account code in with that same account code.
 *
 * # Usage
 * Simply open the sheet to allow it to gather information on already filled titles and account codes. To trigger autocomplete
 * go to the menu under "Intelligent Fill" and click "Run Autocomplete". You can also re-analyse the document (for instance
 * after making changes) with the "Re-analyse" menu item.
 *
 * # Requirements
 * - a spreedsheet with data in the first sheet
 * - the title must be in column G
 * - the account code must be in column J
 *
 * # Storage
 * Data is stored in a second sheet, named 'Store'. It stores the data for each title with a correspondering
 * account code as a key / value pair.
 */

/* when the spreadsheet is opened */
function onOpen() {
  renderMenu();
  analyseSheet();
}

/* draw the menu */
function renderMenu() {
  SpreadsheetApp.getUi()
    .createMenu('Intelligent Fill')
    .addItem('Run Autocomplete', 'runAutocomplete')
    .addItem('Re-analyse', 'analyseSheet')
    .addToUi();
}

/* auto fill data */
function runAutocomplete() {
  var titleColumnValues = getTitlesFromData();
  var accountCodeColumnValues = getAccountCodesFromData();
  var storedTitles = getTitlesFromStore();
  var storedAccountCodes = getAccountCodesFromStore();
  var dataSheet = getDataSheet();
  // for each title
  for (index in titleColumnValues) {
    var index = parseInt(index);
    var title = titleColumnValues[index];
    var matchingAccountCode =  accountCodeColumnValues[index];
    // if it exists and doesn't have an account code set
    if (title != '' && matchingAccountCode == '') {
      var indexInStore = storedTitles.indexOf(title);
      // if it is present in the store
      if (indexInStore != -1) {
        // write the stored value to the data sheet
        var accountCodeFromStore = storedAccountCodes[indexInStore];
        dataSheet.getRange('J' + (index + 2)).setValue(accountCodeFromStore);
      }
    }
  }
}

/* store data in a seperate sheet: 'Store' */
function analyseSheet() {
  var storedTitles = getTitlesFromStore();
  var titleColumnValues = getTitlesFromData();
  var accountCodeColumnValues = getAccountCodesFromData();
  var storeSheet = getStoreSheet();
  // for each title
  for (index in titleColumnValues) {
    var title = titleColumnValues[index];
    var matchingAccountCode =  accountCodeColumnValues[index];
    // if it has an account code set
    if (matchingAccountCode != '') {
      var indexInStore = storedTitles.indexOf(title);
      // if its been seen before
      if (indexInStore != -1) {
        // update with the latest value
        storeSheet.getRange('B' + (indexInStore + 1)).setValue(matchingAccountCode);
      } else {
        // othwerise, add to the store
        storeSheet.appendRow([title, matchingAccountCode]);
      }
    }
  }
}

/* get array of values for a column in a sheet */
function getValuesInColumnFromSheet(columnIndex, sheet) {
  if (sheet.getLastRow() == 0) return [];
  var valueArrays = sheet.getRange(1, columnIndex, sheet.getLastRow()).getValues();
  var values = valueArrays.map(function(value) { return value[0] });
  return values;
}

/* get the sheet with user data */
function getDataSheet() {
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  return dataSheet;
}

/* get the sheet with stored data */
function getStoreSheet() {
  var storeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Store');
  if (!storeSheet) storeSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Store');
  return storeSheet;
}

/* get the inputted account code values */
function getAccountCodesFromData() {
  var dataSheet = getDataSheet();
  var accountCodeColumnValues = getValuesInColumnFromSheet(10, dataSheet);
  accountCodeColumnValues.shift();
  return accountCodeColumnValues;
}

/* get the inputted title values */
function getTitlesFromData() {
  var dataSheet = getDataSheet();
  var titleColumnValues = getValuesInColumnFromSheet(7, dataSheet);
  titleColumnValues.shift();
  return titleColumnValues;
}

/* get the stored title values */
function getTitlesFromStore() {
  var storeSheet = getStoreSheet();
  var storedTitleValues = getValuesInColumnFromSheet(1, storeSheet);
  return storedTitleValues;
}

/* get the stored account code values */
function getAccountCodesFromStore() {
  var storeSheet = getStoreSheet();
  var storedAccountCodeValues = getValuesInColumnFromSheet(2, storeSheet);
  return storedAccountCodeValues;
}
