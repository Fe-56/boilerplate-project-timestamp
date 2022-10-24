// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const rawDate = req.params.date;
  let unix;
  let utc;
  if (rawDate == null){ // if an empty parameter is passed
    unix = Date.now();
    utc = new Date(unix).toUTCString();
  }
  else{
    unix = Date.parse(rawDate);
    if (isNaN(unix)){
      if (isValidDate(Number(rawDate))){ // if rawDate is a number and a valid date
        unix = Number(rawDate);
        utc = new Date(unix).toUTCString();
      }
      else{ // invalid rawDate
        res.json({error: "Invalid Date"});
      }
    }
    else{ // if rawDate is in a valid date format: yyyy-mm-dd, etc.
      utc = new Date(rawDate).toUTCString();
    }
  }
  res.json({unix: unix,
     utc: utc});
  });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function isValidDate(d) {
  let temp = new Date(d);
  return temp instanceof Date && !isNaN(temp);
}