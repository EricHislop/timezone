var express = require("express");
var router = express.Router();
var csv = require("fast-csv");
var geoTz = require("geo-tz");
var moment = require("moment-timezone");
var fs = require("fs");

var csvDisplay = [];
var timeZone;
var timezoneAbbreviation;
var newDate;

csv
  .fromPath("./timezone.csv")
  .on("data", function(data) {
    if (data[0] !== "id") {
      //Getting the timezone from the latitude and longitude
      timeZone = geoTz(data[3], data[2]);
      //Getting the Abbreviation of the timezone
      timezoneAbbreviation = moment()
        .tz(timeZone)
        .zoneAbbr();
      //Formatting the timezone to the Required format
      newDate = moment
        .unix(data[1])
        .tz(timeZone)
        .format("DD/MM/YYYY HH:MM zz ZZ");
      //adding the data to arrays so it can be displayed in a table
      data.push(timezoneAbbreviation);
      data.push(newDate);
      csvDisplay.push(data);
    }
  })
  .on("end", function() {
    router.get("/", function(req, res, next) {
      res.render("csv", { data: csvDisplay });
    });
  });

module.exports = router;
