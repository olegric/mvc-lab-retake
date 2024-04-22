
const cars = [
    { id: 1, make: "Toyota", model: "Yaris", year: 2001, color: "white" },
    { id: 2, make: "Honda", model: "Civic", year: 2005, color: "black" },
    { id: 3, make: "Ford", model: "Focus", year: 2010, color: "blue" },
    { id: 4, make: "Tesla", model: "Model S", year: 2015, color: "red" },
    { id: 5, make: "Chevrolet", model: "Malibu", year: 2020, color: "grey" }
];

function getCars() {
    return cars;
}

function getCarInformation(id) {
    const car = cars.find(car => car.id === id);
    return car ? `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}, Color: ${car.color}.` : "Car doesn’t exist";
}

function getCarAge(id) {
    const car = cars.find(car => car.id === id);
    return car ? `Car is ${new Date().getFullYear() - car.year} years old.` : "Car doesn’t exist";
}

module.exports = { getCars, getCarInformation, getCarAge };
