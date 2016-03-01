var express = require('express');
var path = require('path');
var GoogleSpreadsheet = require('google-spreadsheet');
var fs = require('fs');
var router = express.Router();
var credentials = {};
var services = {};

/**
 * Takes a spreadsheet and turns it into a JSON object
 *
 *@param spreadsheet {GoogleSpreadsheet} - The spreadsheet in which we want to JSONify
 *@return Object - JSON representation of google spreadsheet
 */
function parseSpreadsheetData(spreadsheet, callback) {
  var spreadsheetJSON = {};

  spreadsheet.useServiceAccountAuth(credentials, function(err) {
    if (err) callback(err);
    spreadsheet.getRows(1, function(err, row_data) {
      if (err) callback(err);
      for (var i=0; i < row_data.length; ++i) {
        if (!services[row_data[i].category]) services[row_data[i].category] = [];
        services[row_data[i].category].push({
          name: row_data[i].name,
          price: row_data[i].price,
          extra: row_data[i].extra
        });
      }
      callback(null);
    });
  });
}

function getServicesData(callback) {
  fs.readFile(path.resolve(__dirname, '../config/app.json'), 'utf8', function(err, data) {
    if (err) callback(err);
    data = JSON.parse(data);
    var spreadsheet = new GoogleSpreadsheet(data.servicesSpreadsheetKey);
    parseSpreadsheetData(spreadsheet, callback);
  });
}

function init() {
  fs.readFile(path.resolve(__dirname, '../config/google-credentials.json'), 'utf-8', function(err, data) {
    if (err && (!process.ENV.CLIENT_EMAIL || !process.ENV.PRIVATE_KEY))
      console.log(err);
    else if (err && process.ENV.CLIENT_EMAIL && process.ENV.PRIVATE_KEY)
      credentials = {
        "client_email": process.ENV.CLIENT_EMAIL,
        "private_key": process.ENV.PRIVATE_KEY
      };
    else {
      data = JSON.parse(data);
      credentials = {
        "client_email": data.client_email,
        "private_key": data.private_key
      };
    }
    getServicesData(function(err, spreadsheet) {
      if (err) {
        console.err('***Error loading initial spreadsheet***');
        console.err(err);
      }
    });
  });
}

init();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (services.length === 0) {
    //use default services data
    services = fs.readFile(path.resolve(__dirname, '../config/services.json'), 'utf-8', function(err, data) {
      var renderContent = {};
      if (err)
        renderContent = {
          error: err,
          message: 'Could not load any services'
        };
      else
        renderContent = {
          title: 'Auroras Barber and Beauty Shop',
          services: JSON.stringify(services)
        };
      res.render('index', renderContent);
    });
  } else {
    res.render('index', { title: 'Auroras Barber and Beauty Shop', services: JSON.stringify(services)});
  }
});

module.exports = router;
