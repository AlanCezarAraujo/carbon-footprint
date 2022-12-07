import { CarFootprint, EnergyFootprint } from "../types/footprint";

const API_URL = 'http://localhost:4000/api/carbon-footprint/';

export const getHomeFootprint = async (energyFootprint: EnergyFootprint): Promise<number> => {
    const response = await fetch(`${API_URL}home-energy?energySource=${energyFootprint.energySource}&energyUsageInKwh=${energyFootprint.energyUsageInKwh}`);
    const data = await response.json();

    return data.total;
}

export const getCarFootprint = async (car: CarFootprint): Promise<number> => {
    let url = `${API_URL}transportation/car?`

    if (car.fuelType) {
        url += `fuelType=${car.fuelType}&`
    }

    url += `mpg=${car.mileagePerGallon}&milesPerMonth=${car.distanceInMileage}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.total;
}

export const getMotorcycleFootprint = async (car: CarFootprint): Promise<number> => {
    let url = `${API_URL}transportation/motorcycle?`

    if (car.fuelType) {
        url += `fuelType=${car.fuelType}&`
    }

    url += `mpg=${car.mileagePerGallon}&milesPerMonth=${car.distanceInMileage}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.total;
}

export const getBusFootprint = async (milesPerMonth: number): Promise<number> => {
    const response = await fetch(`${API_URL}transportation/bus?milesPerMonth=${milesPerMonth}`);
    const data = await response.json();

    return data.total;
}

export const getSubwayFootprint = async (milesPerMonth: number): Promise<number> => {
    const response = await fetch(`${API_URL}transportation/subway?milesPerMonth=${milesPerMonth}`);
    const data = await response.json();

    return data.total;
}

export const getMonthlyAirplaneFootprint = async (milesPerMonth: number): Promise<number> => {
    const response = await fetch(`${API_URL}transportation/airplane?milesPerMonth=${milesPerMonth}`);
    const data = await response.json();

    return data.total;
}

export const getYearlyAirplaneFootprint = async (milesPerYear: number): Promise<number> => {
    const response = await fetch(`${API_URL}transportation/airplane?milesPerYear=${milesPerYear}`);
    const data = await response.json();

    return data.total;
}
