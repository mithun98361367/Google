
function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
      .setTitle('Attendance System')
      .addMetaTag('viewport', 'width=device-width , initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function clockIn(employee,systemid,gps){
  var response = Maps.newGeocoder().setRegion('IND').setLanguage('en-IN').reverseGeocode(gps[0],gps[1]);
  var location = response.results[0].formatted_address;
  var lat = gps[0];
  var lng = gps[1];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("in_out");
  var lastRow = mainSheet.getLastRow();
  var new_date = new Date();
  var return_date = getDate(new_date);
  var msg = 'SUCCESS';
  var return_array = [];

 // Get today's date without time
  var today = new Date();
  today.setHours(0, 0, 0, 0);




  for (var j = 2; j <= lastRow; j++){

    var cellDate = mainSheet.getRange(j,2).getValue();
    cellDate.setHours(0, 0, 0, 0); // remove time
    if(employee ==  mainSheet.getRange(j, 1).getValue() && cellDate.getTime() === today.getTime()){
    msg = '<br>Sorry, you have allready ClockIn!';
      return_array.push([msg, return_date, employee]);
      return return_array;
    }
  }

  // for distance calculation
  var lat1 = lat, lon1 = lng; // Kolkata
  var lat2 = 22.5726, lon2 = 88.3639; // Kolkata

  var distanceKm = haversineDistance(lat1, lon1, lat2, lon2).toFixed(2);
  Logger.log("Distance: " + distanceKm + " km");

  var userSheet = ss.getSheetByName("User");
  var ulastRow = userSheet.getLastRow();

for (var k = 2; k <= ulastRow; k++){

    var loc = userSheet.getRange(k,2).getValue();
    
    if(employee ==  userSheet.getRange(k, 1).getValue() && "3eae;4ae2a-fdb0-423d-91f7-d5b74fea8e02" == userSheet.getRange(k, 5).getValue()){
    msg = '<br>Sorry, location!';
      return_array.push([msg, loc, employee]);
      return return_array;
    }
  }



  mainSheet.getRange(lastRow+1,1).setValue(employee)
  .setFontSize(10);

   mainSheet.getRange(lastRow+1,2).setValue(new_date)
   // Format as date only
.setNumberFormat("dd/MM/yyyy"); // or "dd/MM/yyyy", "MM/dd/yyyy" , yyyy-MM-dd as needed
  mainSheet.getRange(lastRow+1,3).setValue(new_date)
  .setNumberFormat("hh:mm:ss AM/PM"); // or "HH:mm:ss" for 24-hour
  //.setHorizontalAlignment("left")
  //.setFontSize(10);
   mainSheet.getRange(lastRow+1,4).setValue(location)
   mainSheet.getRange(lastRow+1,5).setValue(lat)
   mainSheet.getRange(lastRow+1,6).setValue(lng)
   mainSheet.getRange(lastRow+1,12).setValue(systemid)
   mainSheet.getRange(lastRow+1,13).setValue(distanceKm)
  .setFontSize(10);
  return_array.push([msg, return_date, employee]);
  return return_array;
  }
function clockOut(employee,gps) {
  var response = Maps.newGeocoder().setRegion('IND').setLanguage('en-IN').reverseGeocode(gps[0],gps[1]);
  var location = response.results[0].formatted_address;
  var lat = gps[0];
  var lng = gps[1];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("in_out");
  var lastRow = mainSheet.getLastRow();
  var foundRecord = false;
  var new_date = new Date();
  var return_date = getDate(new_date);
  var msg = 'SUCCESS';
  var return_array = [];

 // Get today's date without time
  var today = new Date();
  today.setHours(0, 0, 0, 0);


  for (var j = 2; j <= lastRow; j++){
    var cellDate = mainSheet.getRange(j,2).getValue();
    cellDate.setHours(0, 0, 0, 0); // remove time
      if(employee ==  mainSheet.getRange(j,1).getValue()  && cellDate.getTime() == today.getTime() && mainSheet.getRange(j,7).getValue() == ''){ 
        mainSheet.getRange(j,7)
        .setValue(new_date)
        .setNumberFormat("hh:mm:ss AM/PM")
        .setHorizontalAlignment("left")
        .setFontSize(10);
        mainSheet.getRange(j,8).setValue(location)
        mainSheet.getRange(j,9).setValue(lat)
        mainSheet.getRange(j,10).setValue(lng)
        .setFontSize(10);
        var totalTime = (mainSheet.getRange(j,7).getValue() - mainSheet.getRange(j,3).getValue()) /(60*60*1000);
        mainSheet.getRange(j,11).setValue(totalTime.toFixed(2))
        .setNumberFormat("#0.00")
        .setHorizontalAlignment("left")
        .setFontSize(12);  
        foundRecord = true;     
      }}
       if(foundRecord == false){
      return_array.push(['<br>Sorry, you have not ClockIn yet.', '', employee]);
      return return_array;}
     // TotalHours();
      return_array.push([msg, return_date, employee]);
      return return_array;}

    function TotalHours(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();          
    var mainSheet = ss.getSheetByName("MAIN");
    var lastRow = mainSheet.getLastRow();
    var totals = [];
    for (var j = 2; j <= lastRow; j++){
    var rate = mainSheet.getRange(j, 6).getValue();
    var name = mainSheet.getRange(j, 1).getValue();
    var foundRecord = false;
    for(var i = 0; i < totals.length; i++){
       if(name == totals[i][0] && rate != ''){         
         totals[i][1] =  totals[i][1] + rate;
         foundRecord = true;}}
    if(foundRecord == false && rate != ''){
      totals.push([name, rate]);
    }}
  mainSheet.getRange("H2:I").clear();
  for(var i = 0; i < totals.length; i++){
    mainSheet.getRange(2+i,7).setValue(totals[i][0]).setFontSize(12);
    mainSheet.getRange(2+i,8).setValue(totals[i][1]).setFontSize(12);  
  } 
}
function addZero(i){
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function getDate(return_array){
  var currentDate = return_array;
  var currentMonth = currentDate.getMonth()+1;
  var currentYear = currentDate.getFullYear()+0;
  var currentHours = currentDate.getHours();
  var currentMinutes = addZero(currentDate.getMinutes());
  var currentSeconds = addZero(currentDate.getSeconds());
  var dateOutput =  'date ' + currentDate.getDate()+ '/' + currentMonth.toString().toString() + '/' + 
          currentYear.toString() + ' ' + currentHours.toString() + ':' +
          currentMinutes.toString() + ':' + currentSeconds.toString() + ' .';
  return dateOutput;
}

// for distance calculation
function haversineDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Earth radius in km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(deg) {
  return deg * Math.PI / 180;
}
