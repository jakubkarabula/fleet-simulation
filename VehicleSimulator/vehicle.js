const { v4: uuidv4 } = require('uuid');
const { points, edges } = require('./mapPoints')
const fetch = require('node-fetch')

const updateTime = 1000
const step = 1

const drive = ([x, y], [targetX, targetY]) => {
    const newX = (x === targetX) ? x : (x > targetX ? x - step : x + step)
    const newY = (y === targetY) ? y : (y > targetY ? y - step : y + step)

    return [ newX, newY ]
}

const chooseTarget = (positionIndex) => {    
    const adjecentPoints = edges.filter(edge => edge[0] === positionIndex || edge[1] === positionIndex)

    const route = adjecentPoints[Math.floor(Math.random() * adjecentPoints.length)]
    
    const targetIndex = route.filter(point => point !== positionIndex)[0]

    return [points[targetIndex], targetIndex]
}

const baseUrl = process.env.DOCKER_ENV === 'true' ? 'fleet' : 'localhost'

exports.Vehicle = function () {
    const vin = uuidv4()
    const positionIndex = Math.floor(Math.random() * points.length)

    let position = points[positionIndex];
    let [target, targetIndex] = chooseTarget(positionIndex)

    const intervalId = setInterval(() => {
        if (position[0] !== target[0] || position[1] !== target[1]) {
            position = drive(position, target)
            
            fetch(`http://${baseUrl}:8080/update?vin=${vin}&long=${position[0]}&lat=${position[1]}`)
        } else {
            [target, targetIndex] = chooseTarget(targetIndex)
        }
    }, updateTime)

    const stop = () => {
        clearInterval(intervalId)
    }

    return {
        stop,
        vin
    }
}
