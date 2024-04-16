const http = require('http');
const url = require('url');
const routes = require('./routes');
const fs = require('fs');
const path = require('path');

const PORT = 3000;


const formDataPath = path.join(__dirname, 'formData.json');


fs.access(formDataPath, fs.constants.F_OK, (err) => {
    if (err) {

        fs.writeFile(formDataPath, '{}', (err) => {
            if (err) {
                console.error('Błąd podczas tworzenia pliku formData.json:', err);
            }
        });
    } else {
        console.log('Utworzono plik formData.json');
        startServer();
    }
});


function startServer() {
    const server = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);

        if (req.method === 'GET') {
            if (parsedUrl.pathname === '/') {
                routes.handleHome(res);
            } else if (parsedUrl.pathname === '/add-car') {
                routes.handleAddCar('GET', req, res);
            } else if (parsedUrl.pathname === '/car') {
                routes.handleCar(res);
            } else {
                routes.handlePageNotFound(res);
            }
        } else if (req.method === 'POST') {
            if (parsedUrl.pathname === '/add-car') {
                routes.handleAddCar('POST', req, res);
            } else {
                routes.handlePageNotFound(res);
            }
        }
    });

    server.listen(PORT, () => {
        console.log(`Server running on ${PORT}.`);
    });
}