function getIndianDateTime() {

var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("in_out");
  var lastRow = mainSheet.getLastRow();

  // Get current time
  var now1 = new Date();

 // Extract only time values (hours, minutes, seconds)
  var timeOnly = new Date(0, 0, 0, now1.getHours(), now1.getMinutes(), now1.getSeconds());


  // Get the current date and time
  const now = new Date();

  // Convert to Indian Standard Time (IST)
  const options = { timeZone: 'Asia/Kolkata', hour12: true };
  const indianDateTime = now.toLocaleString('en-IN', options);

 mainSheet.getRange(lastRow+1,1).setValue('Admin')
 mainSheet.getRange(lastRow+1,2).setValue(indianDateTime)
   // Format as date only
.setNumberFormat("dd/MM/yyyy"); // or "dd/MM/yyyy", "MM/dd/yyyy" , yyyy-MM-dd as needed
  mainSheet.getRange(lastRow+1,3).setValue(indianDateTime)
  .setNumberFormat("hh:mm:ss AM/PM"); // or "HH:mm:ss" for 24-hour
  //.setNumberFormat("dd/MM/yyyy - HH:mm:ss")


  // Log or display the result
  Logger.log(indianDateTime); // Logs the IST date and time
  return indianDateTime; // You can use this in your script
}
function checkTodayDate() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var userid = sheet.getRange("A2:A").getValues(); // column with dates
  var data = sheet.getRange("B2:B").getValues(); // column with dates
  
  // Get today's date without time
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  for (var i = 0; i < data.length; i++) {
    var cellDate = data[i][0];
    var celluserid = userid[i][0];
    if (cellDate instanceof Date) {
      cellDate.setHours(0, 0, 0, 0); // remove time
      if (cellDate.getTime() === today.getTime() && celluserid == 'Admin') {
        Logger.log("Row " + (i + 2) + " matches today's date: " + cellDate + celluserid);
        var foundRecord = true;
      }
   else{
    var foundRecord = false;
   }
  

    }
  }

  if(foundRecord == false){

var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("in_out");
  var lastRow = mainSheet.getLastRow();

  // Get current time
  var now1 = new Date();

 // Extract only time values (hours, minutes, seconds)
  var timeOnly = new Date(0, 0, 0, now1.getHours(), now1.getMinutes(), now1.getSeconds());


  // Get the current date and time
  const now = new Date();

  // Convert to Indian Standard Time (IST)
  const options = { timeZone: 'Asia/Kolkata', hour12: true };
  const indianDateTime = now.toLocaleString('en-IN', options);

 mainSheet.getRange(lastRow+1,1).setValue('Admin')
 mainSheet.getRange(lastRow+1,2).setValue(indianDateTime)
   // Format as date only
.setNumberFormat("dd/MM/yyyy"); // or "dd/MM/yyyy", "MM/dd/yyyy" , yyyy-MM-dd as needed
  mainSheet.getRange(lastRow+1,3).setValue(indianDateTime)
  .setNumberFormat("hh:mm:ss AM/PM"); // or "HH:mm:ss" for 24-hour
  //.setNumberFormat("dd/MM/yyyy - HH:mm:ss")


  // Log or display the result
  Logger.log(indianDateTime); // Logs the IST date and time
  return indianDateTime; // You can use this in your script


      Logger.log("False ");
      }

}
