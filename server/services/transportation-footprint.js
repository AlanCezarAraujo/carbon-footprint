const monthsInYear = 12

/**
 * Calculate the carbon emission per mile for air travel
 * 
 * @param {Number} distance Distance in miles
 * @returns {Number} Total carbon footprint in kg
 */
function calculateAirTravelCarbonEmissionPerTravel(distance) {
    const airTravelCarbonEmissionPerMile = {
        short: 0.215, // < 300 miles
        medium: 0.133, // 300 - 2000
        long: 0.165, // > 2300 miles
    }

    if (distance < 300) {
        return airTravelCarbonEmissionPerMile.short * distance
    }

    if (distance < 2000) {
        return airTravelCarbonEmissionPerMile.medium * distance
    }

    return airTravelCarbonEmissionPerMile.long * distance
}

/**
 * Gets the carbon emission factor per mile for a car
 *
 * @param {Number} mpg Miles per gallon
 * @param {Number} fuelType Fuel type. It can be one of the following: ethanol, gasoline, diesel. If not provided, gasoline will be used.
 * @returns {Number} Carbon emission factor per mile
 */
function getCarCarbonEmissionPerMile(mpg, fuelType) {
    const mobileCombustionEmissionFactorPerGallon = {
        ethanol: 5.75,
        gasoline: 8.75,
        diesel: 10.21,
    }
    const fuelEmission = mobileCombustionEmissionFactorPerGallon[fuelType || 'gasoline'];

    return fuelEmission / mpg;
}

/**
 * Gets the carbon emission factor per mile for a bus or subway
 * 
 * @param {String} vehicleType Vehicle type. It can be one of the following: bus, subway. If not provided, bus will be used.
 * @returns {Number} Carbon emission factor per mile
 */
function getPublicTrasportationCarbonEmissionPerMile(vehicleType) {
    const carbonEmissionByVehicleType = {
        bus: 0.053,
        subway: 0.099,
    }

    return carbonEmissionByVehicleType[vehicleType || 'bus'];
}

/**
 * 
 * @param {String} data.fuelType Fuel type. It can be one of the following: ethanol, gasoline, diesel. If not provided, gasoline will be used.
 * @param {Number} data.milesPerMonth Miles per month
 * @param {Number} data.milesPerYear Miles per year for air travels
 * @returns {Number} Total carbon footprint in one year
 */
function calculateCarbonEmissionPerYearForTransportation(data) {
    // const mobileCombustionEmissionFactorPerGallon = {
    //     ethanol: 5.75,
    //     gasoline: 8.75,
    //     diesel: 10.21,
    // }
    // const carbonEmissionByVehicleType = {
    //     bus: 0.053,
    //     subway: 0.099,
    // }
    const { vehicleType } = data;

    if (!vehicleType) return 0
    if (!data.milesPerMonth && !data.milesPerYear) return 0

    if (vehicleType === 'car' || vehicleType === 'motorcycle') {
        const { fuelType, mpg, milesPerMonth } = data

        if (!mpg) return 0

        return getCarCarbonEmissionPerMile(mpg, fuelType) * milesPerMonth * monthsInYear
    }

    if (vehicleType === 'subway' || vehicleType === 'bus') {
        const { milesPerMonth } = data

        if (!milesPerMonth) return 0

        return milesPerMonth * getPublicTrasportationCarbonEmissionPerMile(vehicleType) * monthsInYear
    }

    if (vehicleType === 'airplane') {
        const { milesPerMonth, milesPerYear } = data

        if (!milesPerMonth && !milesPerYear) return 0

        if (milesPerYear) {
            return calculateAirTravelCarbonEmissionPerTravel(milesPerYear)
        }

        if (milesPerMonth) {
            return calculateAirTravelCarbonEmissionPerTravel(milesPerMonth) * monthsInYear
        }
    }

    return 0;
}

module.exports = {
    calculateCarbonEmissionPerYearForTransportation,
}
