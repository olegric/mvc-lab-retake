const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const router = express.Router();

let cars = [];
let nextId = 1;

router.get('/car', (req, res) => {
    fs.readFile(path.join(__dirname, '../views/car.html'), 'utf8', (err, html) => {
        if (err) {
            res.status(500).send("Error loading page");
            return;
        }
        
        const $ = cheerio.load(html);
        if (cars.length > 0) {
            const lastCar = cars[cars.length - 1];
            $('div.car').html(`
                <h2>Last added car</h2>
                <div><span class="bold">Make:</span> ${lastCar.make}</div>
                <div><span class="bold">Model:</span> ${lastCar.model}</div>
                <div><span class="bold">Year:</span> ${lastCar.year}</div>
                <div><span class="bold">Color:</span> ${lastCar.color}</div>
            `);
        } else {
            $('div.car').text("No cars have been found.");
        }
        res.send($.html());
    });
});

router.get('/car/add', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/add-car.html'));
});


router.get('/car/list', (req, res) => {
    fs.readFile(path.join(__dirname, '../views/cars-list.html'), 'utf8', (err, html) => {
        if (err) {
            res.status(500).send("Error loading page");
            return;
        }

        const $ = cheerio.load(html);
        if (cars.length > 0) {
            $('div.cars').html('<h2>Cars</h2><ul></ul>');
            cars.forEach(car => {
                $('ul').append(`
                    <li>
                        <p><span class="bold">Make:</span> ${car.make}</p>
                        <p><span class="bold">Model:</span> ${car.model}</p>
                        <p><span class="bold">Year:</span> ${car.year}</p>
                        <p><span class="bold">Color:</span> ${car.color}</p>
                    </li>
                `);
            });
        } else {
            $('div.cars').text("No cars have been found.");
        }
        res.send($.html());
    });
});


router.post('/car/add', (req, res) => {
    const { make, model, year, color } = req.body;
    const newCar = { id: nextId++, make, model, year, color };
    cars.push(newCar);
    res.redirect('/car');
});

module.exports = router;
