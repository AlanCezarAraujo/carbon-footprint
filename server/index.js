const express = require('express')
const cors = require('cors')
const { createLogger, format, transports } = require("winston");
const { calculateCarbonEmissionPerYearForTransportation } = require('./services/transportation-footprint')
const { calculateCarbonEmissionPerYearForHomeEnergy } = require('./services/home-energy-footprint')

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
}

const logger = createLogger({
    levels: logLevels,
    transports: [new transports.Console()],
})

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.get('/healthcheck', (request, response) => {
    response.send('All good...')
})

app.get('/api/carbon-footprint/transportation/:vehicleType', (request, response) => {
    const { fuelType, mpg, milesPerMonth, milesPerYear } = request.query
    const { vehicleType } = request.params

    if (vehicleType === 'car' || vehicleType === 'motorcycle') {
        if (!mpg) {
            const errorMessage = 'Missing required parameter: mpg'

            logger.error(errorMessage)
            return response.status(400).send(errorMessage)
        }

        if (!milesPerMonth) {
            const errorMessage = 'Missing required parameter: milesPerMonth'

            logger.error(errorMessage)
            return response.status(400).send(errorMessage)
        }
    }

    const carbonEmissionPerYear = calculateCarbonEmissionPerYearForTransportation({
        vehicleType,
        fuelType,
        mpg: +mpg || 0,
        milesPerMonth: milesPerMonth ? +milesPerMonth : null,
        milesPerYear: milesPerYear ? +milesPerYear : null,
    })

    logger.debug(`carbonEmissionPerYear: ${carbonEmissionPerYear}`)

    response.send({
        total: carbonEmissionPerYear,
    })
})

app.get('/api/carbon-footprint/home-energy', (req, res) => {
    const { energySource, energyUsageInKwh } = req.query

    if (!energyUsageInKwh) {
        return res.status(400).send('Missing required parameter: energyUsageInKwh')
    }

    const carbonEmissionPerYear = calculateCarbonEmissionPerYearForHomeEnergy({
        energySource,
        energyUsageInKwh: +energyUsageInKwh || 0,
    })

    logger.debug(`carbonEmissionPerYear: ${carbonEmissionPerYear}`)

    res.send({
        total: carbonEmissionPerYear,
    })
})

app.listen(port, () => {
    logger.info(`Server is up on port ${port}...`);
})
