const test = require('node:test')
const assert = require('node:assert')
const { calculateCarbonEmissionPerYearForTransportation } = require('./transportation-footprint.js')

test('calculateCarbonEmissionPerYearForTransportation()', async (context) => {
    await context.test('returns 0 when milesPerMonth is 0', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'car',
            mpg: 0,
            milesPerMonth: 0,
        })

        assert.equal(result, 0)
    })

    await context.test('returns 0 when milesPerMonth is not provided', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'car',
            mpg: 0,
        })

        assert.equal(result, 0)
    })

    await context.test('returns 0 when milesPerMonth is null', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'car',
            mpg: 0,
            milesPerMonth: null,
        })

        assert.equal(result, 0)
    })

    await context.test('calculates carbon footprint per year for car', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'car',
            mpg: 20,
            milesPerMonth: 100,
        })

        assert.equal(result, 525)
    })

    await context.test('calculates carbon footprint per year for motorcycle', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'motorcycle',
            mpg: 40,
            milesPerMonth: 100,
        })

        assert.equal(result, 262.5)
    })

    await context.test('calculates carbon footprint per year for bus', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'bus',
            mpg: 20,
            milesPerMonth: 100,
        })

        assert.equal(result, 63.599999999999994)
    })

    await context.test('calculates carbon footprint per year for train', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'train',
            mpg: 20,
            milesPerMonth: 100,
        })

        assert.equal(result, 0)
    })

    await context.test('calculates carbon footprint per year for monthly airplane travels', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'airplane',
            milesPerMonth: 100,
        })

        assert.equal(result, 258)
    })

    await context.test('calculates carbon footprint per year for airplane', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'airplane',
            milesPerYear: 100,
        })

        assert.equal(result, 21.5)
    })

    await context.test('calculates carbon footprint per year for medium airplane travels', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'airplane',
            milesPerYear: 1500,
        })

        assert.equal(result, 199.5)
    })

    await context.test('calculates carbon footprint per year for long airplane travels', () => {
        const result = calculateCarbonEmissionPerYearForTransportation({
            vehicleType: 'airplane',
            milesPerYear: 2500,
        })

        assert.equal(result, 412.5)
    })
})
