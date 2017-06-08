var express = require('express');
var path = require('path');
var GoogleSpreadsheet = require('google-spreadsheet');
var fs = require('fs');
var path = require('path');
var router = express.Router();

var TITLE = process.env.TITLE ? process.env.TITLE : 'Auroras Barber and Beauty Shop';
var credentials = {};
var services = {};
var stylists = [];

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
    spreadsheet.getRows(1, 1, function(err, row_data) {
      if (err) callback(err);
      for (var i=0; i < row_data.length; ++i) {
        if (!services[row_data[i].category]) services[row_data[i].category] = [];
        services[row_data[i].category].push({
          name: row_data[i].name,
          price: row_data[i].price,
          extra: row_data[i].extra
        });
      }
    });

    spreadsheet.getRows(2, 1, function(err, row_data) {
      if (err) callback(err);
      for (var i=0; i < row_data.length; ++i) {
				var stylist = {
          name: row_data[i].name,
          bio: row_data[i].bio
        };

				try {
					fs.accessSync(path.resolve(__dirname, '../public/images/' + stylist.name + '.jpg'), fs.F_OK);
					stylist.img = stylist.name;
				} catch (e) {
					stylist.img = 'default-stylist';
				}
        stylists.push(stylist);
      }
      callback();
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
    if (err && (!process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY))
      console.log(err);
    else if (err && process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY)
      credentials = {
        "client_email": process.env.CLIENT_EMAIL,
        "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
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
        console.error('***Error loading initial spreadsheet***');
        console.error(err);
      }
    });
  });
}

init();

/* GET home page. */
router.get('/*', function(req, res, next) {
  if (services.length === 0) {
    //use default services data
    services = fs.readFile(path.resolve(__dirname, '../config/services.json'), 'utf-8', function(err, data) {
      if (err) {
        res.render('error', {
          error: err,
          message: 'Could not load any services'
        });
      }
      else
        res.render('index', {title: TITLE, services: JSON.stringify(data), 'stylists': JSON.stringify(stylists)});
    });
  } else {
    res.render('index', { title: TITLE, services: JSON.stringify(services), 'stylists': JSON.stringify(stylists)});
  }
  init();
});

module.exports = router;
