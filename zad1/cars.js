const cars = [
    { id: 1, make: "Toyota", model: "Yaris", year: 2009, color: "white" },
    { id: 2, make: "Volvo", model: "60", year: 2005, color: "orange" },
    { id: 3, make: "Ford", model: "Mondeo", year: 2012, color: "purple" },
    { id: 4, make: "BMW", model: "X7", year: 2012, color: "silver" },
    { id: 5, make: "Opel", model: "40", year: 2017, color: "grey" }
];


function getCars() {
    return cars;
}


function getCarInformation(id) {
    const car = cars.find(car => car.id === id);
    if (car) {
        const { make, model, year, color } = car;
        return `Make: ${make}, Model: ${model}, Year: ${year}, Color: ${color}.`;
    } else {
        return "Car doesn't exist";
    }
}


function getCarAge(id) {
    const car = cars.find(car => car.id === id);
    if (car) {
        const currentYear = new Date().getFullYear();
        const carAge = currentYear - car.year;
        return `Car is ${carAge} years old.`;
    } else {
        return "Car doesn't exist";
    }
}


module.exports = {
    getCars,
    getCarInformation,
    getCarAge
};