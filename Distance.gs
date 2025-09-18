function getDrivingDistance() {

  //var origin = "Kolkata, India";
  // var destination = "Delhi, India";
  var origin = "22.5236298,88.3503683";
  var destination = "22.5574077,88.368032";
  
  // Use Google Maps Directions
  var directions = Maps.newDirectionFinder()
    .setOrigin(origin)
    .setDestination(destination)
    .setMode(Maps.DirectionFinder.Mode.DRIVING)
    .getDirections();
  
  var route = directions.routes[0];
  var distance = route.legs[0].distance.text;   // "1,500 km"
  var duration = route.legs[0].duration.text;   // "24 hours"
  
  Logger.log("Distance: " + distance);
  Logger.log("Duration: " + duration);
}

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

function testHaversine() {
  var lat1 = 22.5726, lon1 = 88.3639; // Kolkata
  var lat2 = 28.7041, lon2 = 77.1025; // Delhi

  var distanceKm = haversineDistance(lat1, lon1, lat2, lon2).toFixed(2);
  Logger.log("Distance: " + distanceKm + " km");
}


