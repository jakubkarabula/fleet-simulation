const { Vehicle } = require('./vehicle')

const numberOfCars = 20

const vehicles = []

for (let index = 0; index < numberOfCars; index++) {
    vehicles.push(Vehicle())
}
