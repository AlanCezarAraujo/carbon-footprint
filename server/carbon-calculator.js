// const carbonEmmissionFactors = {
//     // per mile
//     transportation: {
//         'car': 0.335,
//         'motorcycle': 0.184,
//         'bus': 0.05,
//         'metro': 0.99,
//     },

//     // one passenger per mile
//     airTravel: {
//         'shortAirTravel': 0.215, // < 300 miles
//         'mediumAirTravel': 0.133, // 300 - 2000
//         'longAirTravel': 0.165, // > 2300 miles
//     },

//     // each kWh
//     'energy': {
//         'electricity': 0.947,
//         'natural gas': 0.001,
//         'fuel oil': 0.141,
//         'propane': 0.62,
//         'coal': 97,
//         'wood': 0.5,
//         'waste': 0.5,
//     },
// }

// // Household Vehicles
// var g_CO2_EMITTED_PER_GALLON_OF_GASOLINE = 19.6;
// var g_NONCO2_EMITTED_PER_GALLON_OF_GASOLINE = 1.013684744044602;
// var g_AVG_EMISSIONS_PER_VEHICLE = 10484;

// // HOME ENERGY
// //  -- NAT GAS
// var g_AVG_NAT_GAS_PRICE_PER_THOUSAND_CUBIC_FEET = 10.68;
// var g_AVG_NAT_GAS_PRICE_PER_THERM = 1.04;
// var g_NAT_GAS_THERMS_EMISSIONS_FACTOR = 11.7;
// var g_NAT_GAS_CUBIC_FEET_EMISSIONS_FACTOR = 119.58;
// var g_NAT_GAS_AVG_EMISSIONS_PER_PERSON = 3071;

// //  -- ELECTRICITY
// var g_AVG_ELEC_PRICE_PER_KILOWATT = 0.1188;
// var g_ELEC_AVG_EMISSIONS_PER_PERSON = 5455;
// var g_ELEC_AVG_COST_PER_PERSON = 43.61;

// //  -- FUEL OIL
// var g_AVG_FUEL_OIL_PRICE_PER_GALLON = 4.02;
// var g_FUEL_OIL_EMISSIONS_FACTOR = 22.61;
// var g_FUEL_OIL_AVG_EMISSIONS_PER_PERSON = 4848;

// //  -- Propane
// var g_AVG_PROPANE_PRICE_PER_GALLON = 2.47;
// var g_PROPANE_EMISSIONS_FACTOR = 12.43;
// var g_PROPANE_AVG_EMISSIONS_PER_PERSON = 2243;

const monthsInYear = 12;

function calculateAirTravelCarbonEmissionPerMile(distance) {
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

function calculateCarbonEmissionPerYearForTransportation(item) {
    const mobileCombustionEmissionFactorPerGallon = {
        ethanol: 5.75,
        gasoline: 8.75,
        diesel: 10.21,
    }
    const carbonEmissionByVehicleType = {
        bus: 0.053,
        subway: 0.099,
    }
    const vehicleType = item.subType;
    let total = 0;

    if (vehicleType === 'car' || vehicleType === 'motorcycle') {
        const { milesPerMonth, mpg } = item
        const fuelEmission = mobileCombustionEmissionFactorPerGallon[item.fuelType] || 'gasoline';

        total += milesPerMonth / mpg * fuelEmission * monthsInYear
    }

    if (vehicleType === 'subway' || vehicleType === 'bus') {
        const { milesPerMonth } = item

        total += milesPerMonth * carbonEmissionByVehicleType[vehicleType] * monthsInYear
    }

    if (vehicleType === 'airplane') {
        const { milesPerMonth, milesPerYear } = item

        if (milesPerYear) {
            total += calculateAirTravelCarbonEmissionPerMile(milesPerYear)
        }

        if (milesPerMonth) {
            total += calculateAirTravelCarbonEmissionPerMile(milesPerMonth) * monthsInYear
        }
    }

    return total;
}

function calculateCarbonEmissionPerYearForHomeEnergy(item) {
    const electricityCarbonEmissionPerKwh = {
        coal: 0.97,
        hydropower: 0.004,
        windTurbine: 0.022,
        voltSolarPanel: 0.050,
    }
    const { energySource, energyUsageInKwh } = item
    const carbonEmissionPerKwh = electricityCarbonEmissionPerKwh[energySource] || electricityCarbonEmissionPerKwh.coal
    const carbonEmissionPerYear = carbonEmissionPerKwh * energyUsageInKwh

    return carbonEmissionPerYear * monthsInYear
}

function calculateCarbonEmissionPerYear(data) {
    const response = {
        total: 0,
    }

    for (let i = 0; i < data.length; i++) {
        let item = data[i];

        if (item.type === 'transportation') {
            const transportation = calculateCarbonEmissionPerYearForTransportation(item)

            response[item.subType] = transportation
            response.total += transportation
        }

        if (item.type === 'homeEnergy') {
            const homeEnergy = calculateCarbonEmissionPerYearForHomeEnergy(item)

            response[item.subType] = homeEnergy
            response.total += homeEnergy
        }
    }

    return response;
}

console.log(calculateCarbonEmissionPerYear([
    {
        type: 'transportation',
        subType: 'car',
        milesPerMonth: 300,
        mpg: 20,
        fuelType: 'gasoline',
    },
    {
        type: 'transportation',
        subType: 'airplane',
        milesPerMonth: 250,
    },
    {
        type: 'homeEnergy',
        subType: 'electricity',
        energyUsageInKwh: 350,
    },
]));
