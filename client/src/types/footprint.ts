export type CarFootprint = {
    distanceInMileage: number;
    mileagePerGallon: number;
    fuelType?: string;
    totalFootprint?: number;
};

export type BusFootPrint = {
    distanceInMileage: number;
    totalFootprint?: number;
};

export type SubwayFootprint = {
    distanceInMileage: number;
    totalFootprint?: number;
};

export type AirplaneFootprint = {
    monthlyDistanceInMileage?: number;
    yearleDistanceInMileage?: number;
    totalFootprint?: number;
};

export type Footprint = {
    totalFootprint?: number;
    totalTransportationFootprint?: number;
    car?: CarFootprint;
    motorcycle?: CarFootprint;
    energy?: EnergyFootprint;
    bus?: BusFootPrint;
    subway?: SubwayFootprint;
    airplane?: AirplaneFootprint;
};

export type EnergyFootprint = {
    energySource?: string;
    energyUsageInKwh?: number;
    totalFootprint?: number;
};
