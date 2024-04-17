const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const carsRouter = require('./routes/cars');
const homeRouter = require('./routes/home');

app.use('/cars', carsRouter);
app.use('/', homeRouter);
app.use((req, res, next) => {
    res.status(404).send('404 Page Not Found');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});