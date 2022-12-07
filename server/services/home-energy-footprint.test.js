const test = require('node:test')
const assert = require('node:assert')
const { calculateCarbonEmissionPerYearForHomeEnergy } = require('./home-energy-footprint.js')

test('calculateCarbonEmissionPerYearForHomeEnergy()', async (context) => {
    await context.test('calculateCarbonEmissionPerYearForHomeEnergy() should return 0 when energyUsageInKwh is 0', () => {
        const result = calculateCarbonEmissionPerYearForHomeEnergy({
            energyUsageInKwh: 0,
        })

        assert.equal(result, 0)
    })

    await context.test('calculateCarbonEmissionPerYearForHomeEnergy() should return 0 when energyUsageInKwh is not provided', () => {
        const result = calculateCarbonEmissionPerYearForHomeEnergy({})

        assert.equal(result, 0)
    })

    await context.test('calculateCarbonEmissionPerYearForHomeEnergy() should return 0 when energyUsageInKwh is null', () => {
        const result = calculateCarbonEmissionPerYearForHomeEnergy({
            energyUsageInKwh: null,
        })

        assert.equal(result, 0)
    })

    await context.test('calculateCarbonEmissionPerYearForHomeEnergy() should calculate energy usage in kWh', () => {
        const result = calculateCarbonEmissionPerYearForHomeEnergy({
            energyUsageInKwh: 100,
        })

        assert.equal(result, 1164)
    })
})
