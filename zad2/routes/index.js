const fs = require('fs');
const querystring = require('querystring');
const { renderHomePage } = require('../views/home');
const { renderPage: renderAddCarPage } = require('../views/add-car');
const { renderPage: renderCarPage } = require('../views/car');

function handleHome(response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(renderHomePage());
    response.end();
}

function handleAddCar(method, request, response) {
    if (method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(renderAddCarPage());
        response.end();
    } else if (method === 'POST') {
        let formData = '';

        request.on('data', (chunk) => {
            formData += chunk.toString();
        });

        request.on('end', () => {
            const parsedData = querystring.parse(formData);


            fs.writeFile('formData.json', JSON.stringify(parsedData), (err) => {
                if (err) {
                    console.error(err);
                    response.writeHead(500);
                    response.end();
                } else {
                    response.writeHead(302, { 'Location': '/car' });
                    response.end();
                }
            });
        });
    }
}

function handleCar(response) {
    fs.readFile('formData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            response.writeHead(500);
            response.end();
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(renderCarPage(data));
            response.end();
        }
    });
}

function handlePageNotFound(response) {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write('404 Page Not Found');
    response.end();
}

module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound
};