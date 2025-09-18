function insertOnlyTime() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = sheet.getActiveCell();

  // Get current time
  var now = new Date();

  // Extract only time values (hours, minutes, seconds)
  var timeOnly = new Date(0, 0, 0, now.getHours(), now.getMinutes(), now.getSeconds());

  // Set the value in the selected cell
  cell.setValue(timeOnly);

  // Format as only time
  cell.setNumberFormat("hh:mm:ss AM/PM"); // or "HH:mm:ss" for 24-hour
}

function insertOnlyDate() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cell = sheet.getActiveCell();

  // Get today's date
  var today = new Date();

  // Remove the time part (set hours, minutes, seconds, ms to 0)
  today.setHours(0, 0, 0, 0);

  // Put only the date into the cell
  cell.setValue(today);

  // Format as date only
  cell.setNumberFormat("yyyy-MM-dd"); // or "dd/MM/yyyy", "MM/dd/yyyy" as needed
}


function showSheetDataInConsole() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get all data (A1 to last row & col)
  var data = sheet.getDataRange().getValues();
  
  // Print row by row in log console
  for (var i = 0; i < data.length; i++) {
    Logger.log(data[i]);   // shows the entire row as an array
  }
}


