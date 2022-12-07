/**
 * Calculates the home energy footprint, based on the Energy Source and monthly kWh consume
 * 
 * @param {Number} data.energyUsageInKwh Electricity usage in kWh in a month
 * @param {String} data.energySource It can be one of the following: coal, hydropower, windTurbine, voltSolarPanel. If not provided, coal will be used.
 * @returns {Number} Carbon footprint in kg per month
 */
function calculateCarbonEmissionPerYearForHomeEnergy(data) {
    const electricityCarbonEmissionPerKwh = {
        coal: 0.97,
        hydropower: 0.004,
        windTurbine: 0.022,
        voltSolarPanel: 0.050,
    }

    if (!data.energyUsageInKwh) return 0

    const monthsInYear = 12
    const { energySource, energyUsageInKwh } = data
    const carbonEmissionPerKwh = electricityCarbonEmissionPerKwh[energySource] || electricityCarbonEmissionPerKwh.coal
    const carbonEmissionPerYear = carbonEmissionPerKwh * energyUsageInKwh

    return carbonEmissionPerYear * monthsInYear
}

module.exports = {
    calculateCarbonEmissionPerYearForHomeEnergy,
}
