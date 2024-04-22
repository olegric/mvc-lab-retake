const fs = require('fs');
const queryString = require('querystring');

const home = require('../views/home');
const car = require('../views/car');
const addCar = require('../views/add-car');

function handleHome(response) {
  response.setHeader('Content-Type', 'text/html');
  response.write(home.renderPage());
  response.end();
}

function handleAddCar(method, request, response) {
  if (method === 'GET') {
    response.setHeader('Content-Type', 'text/html');
    response.write(addCar.renderPage());
    response.end();
  } else if (method === 'POST') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const postData = queryString.parse(body);
      fs.writeFile('formData.json', JSON.stringify(postData, null, 2), (err) => {
        if (err) throw err;
        response.statusCode = 302;
        response.setHeader('Location', '/car');
        response.end();
      });
    });
  }
}

function handleCar(response) {
  fs.readFile('formData.json', (err, data) => {
    if (err) {
      response.setHeader('Content-Type', 'text/html');
      response.write('<h1>Error reading car data</h1>');
      response.end();
    } else {
      response.setHeader('Content-Type', 'text/html');
      response.write(car.renderPage(data.toString()));
      response.end();
    }
  });
}

function handlePageNotFound(response) {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/html');
  response.write('404 Page Not Found');
  response.end();
}

module.exports = {
  handleHome,
  handleAddCar,
  handleCar,
  handlePageNotFound
};
