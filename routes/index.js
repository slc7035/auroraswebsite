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
async function parseSpreadsheetData(spreadsheet) {
  await Promise.nfcall(spreadsheet.useServiceAccountAuth, credentials)
  const services_data = (await Promise.nfcall(spreadsheet.getRows, 1, 1))[0]
  services = {};
  for (let i = 0; i < services_data.length; ++i) {
    services_data[i].category = services_data[i].category || 'Services';
    let service = {
      name: services_data[i].name,
      price: services_data[i].price,
      extra: services_data[i].extra
    };
    services[services_data[i].category] = services[services_data[i].category] || [];
    services[services_data[i].category].push(service);
  }
  console.log('Successfully fetched services data!');
  const stylists_data = (await Promise.nfcall(spreadsheet.getRows, 2, 1))[0]
  stylists = [];
  for (let i = 0; i < stylists_data.length; ++i) {
    let stylist = {
      name: stylists_data[i].name,
      bio: stylists_data[i].bio
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
}

async function getSpreadsheetData() {
  const data = JSON.parse(await Promise.nfcall(fs.readFile, path.resolve(__dirname, '../config/app.json'), 'utf8'))
  const spreadsheet = new GoogleSpreadsheet(data.servicesSpreadsheetKey);
  parseSpreadsheetData(spreadsheet);
}

async function init() {
  console.log('Refreshing service information');
  try {
    const data = JSON.parse(await Promise.nfcall(fs.readFile, path.resolve(__dirname, '../config/google-credentials.json'), 'utf-8'))
    credentials = {
      "client_email": data.client_email,
      "private_key": data.private_key
    };
  } catch (err) {
    if (err && (!process.env.CLIENT_EMAIL || !process.env.PRIVATE_KEY)) {
      return console.error(err);
    } else if (err && process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY) {
      credentials = {
        "client_email": process.env.CLIENT_EMAIL,
        "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, "\n")
      };
    }
  }
  try {
    await getSpreadsheetData()
  } catch (e) {
    console.error('***Error loading initial spreadsheet***');
    return console.error(err);
  }
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
