var express = require("express");
var router = express.Router();
var csv = require("fast-csv");
var fs = require("fs");
var stream = fs.createReadStream("./timezone.csv");

var app = express();

var timeArray = [];


// read the csv and store the items in an array 
csv
  .fromStream(stream, { headers: ["id", "timestamp_utc", "lng", "lat"] })
  .on("data", function(data) {
    timeArray.push(data);
  })
  .on("end", function() {
  });

//return all items
router.get("/", function(req, res, next) {
  res.json(timeArray);
});

//check if id is not undefined then returns the element of the array that meets the condition 
router.get("/:id", function(req, res, next) {
  responseTimes =
    req.params.id !== undefined
      ? timeArray.filter(function(obj) {
          return obj.id == req.params.id;
        })
      : timeArray;
  res.json(responseTimes);
});

module.exports = router;

