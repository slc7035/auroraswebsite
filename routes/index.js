'use strict';
const { express, Router } = require('express');
const path = require('path');
const fs = require('fs');
const GoogleSpreadsheet = require('google-spreadsheet');
const router = Router();
require('promise-helpers');

const TITLE = process.env.TITLE ? process.env.TITLE : 'Auroras Barber and Beauty Shop';
let credentials = {};
let services = {};
let stylists = [];

/**
 * Takes a spreadsheet and turns it into a JSON object
 *
 *@param spreadsheet {GoogleSpreadsheet} - The spreadsheet in which we want to JSONify
 *@return Object - JSON representation of google spreadsheet
 */
function parseSpreadsheetData(spreadsheet) {
  let  spreadsheetJSON = {};

  return Promise.nfcall(spreadsheet.useServiceAccountAuth, credentials)
  .then(() => {
    return Promise.nfcall(spreadsheet.getRows, 1, 1)
      .then((row_data) => {
        row_data = row_data[0];
        for (let  i=0; i < row_data.length; ++i) {
          if (!services[row_data[i].category])
            services[row_data[i].category] = [];
          services[row_data[i].category].push({
            name: row_data[i].name,
            price: row_data[i].price,
            extra: row_data[i].extra
          });
        }
        console.log('Successfully fetched services data!');
      })
      .catch((err) => {
        console.error('Error loading the services from google sheets');
        console.error(err);
      })
      .then(() => {
        return Promise.nfcall(spreadsheet.getRows, 2, 1)
          .then((row_data) => {
            row_data = row_data[0];
            for (let  i=0; i < row_data.length; ++i) {
              let  stylist = {
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
            console.log('Successfully fetched stylist data!');
          });
      })
      .catch((err) => {
        console.error('Error loading the stylist google sheets');
        console.error(err);
      });

  });
}

function getSpreadsheetData() {
  return Promise.nfcall(fs.readFile, path.resolve(__dirname, '../config/app.json'), 'utf8')
    .then((data) => {
      data = JSON.parse(data);
      let  spreadsheet = new GoogleSpreadsheet(data.servicesSpreadsheetKey);
      return parseSpreadsheetData(spreadsheet);
    });
}

function init() {
  return Promise.nfcall(fs.readFile, path.resolve(__dirname, '../config/google-credentials.json'), 'utf-8')
    .then((data) => {
      data = JSON.parse(data);
      credentials = {
        "client_email": data.client_email,
        "private_key": data.private_key
      };
    })
    .catch((err) => {
      if (err && (!process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY))
        console.error(err);
      else if (err && process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY)
        credentials = {
          "client_email": process.env.CLIENT_EMAIL,
          "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
        };
    })
    .then(() => {
      return getSpreadsheetData()
        .catch((err) => {
          console.error('***Error loading initial spreadsheet***');
          console.error(err);
        });
    });
}

init();

/* GET home page. */
router.get(['/','/services','/stylists'], function(req, res, next) {
  // Refresh the cache
  init();

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
});

module.exports = router;
