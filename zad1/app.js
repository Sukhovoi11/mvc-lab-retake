const http = require('http');
const { getHTMLDocumentStart, getHTMLDocumentEnd } = require('./htmlGenerator');
const { getCars, getCarInformation, getCarAge } = require('./cars');

const PORT = 3000;


const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');


    const carsList = getCars();


    res.write(getHTMLDocumentStart());
    res.write('<body>');


    carsList.forEach(car => {
        res.write(`<h2>Car ID: ${car.id}</h2>`);
        res.write(`<p>${getCarInformation(car.id)}</p>`);
        res.write(`<p>${getCarAge(car.id)}</p>`);
        res.write('<hr>');
    });


    res.write('</body>');
    res.write(getHTMLDocumentEnd());
    res.end();
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});