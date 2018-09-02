var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render("distance");
});

router.post("/", function(req, res, next) {

  var distance = haversineFormula(
    req.body.firstLongitude,
    req.body.firstLatitude,
    req.body.secondLongitude,
    req.body.secondLatitude
  );
  res.render("distance", { distanceBetween: distance });
});

function haversineFormula(
  firstLongitude,
  firstLatitude,
  secondLongitude,
  secondLatitude
) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  var Longitude1 = firstLongitude;
  var Latitude1 = firstLatitude;
  var Longitude2 = secondLongitude;
  var Latitude2 = secondLatitude;

  //radius of earth
  var radius = 6378;

  var differenceInLatitude = Latitude2 - Latitude1;
  var deltaLatitude = toRad(differenceInLatitude);

  var differenceInLongitude = Longitude2 - Longitude1;
  var deltaLongitude = toRad(differenceInLongitude);

  var a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(toRad(Latitude1)) *
      Math.cos(toRad(Latitude2)) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = radius * c;

  return distance;
}

module.exports = router;
