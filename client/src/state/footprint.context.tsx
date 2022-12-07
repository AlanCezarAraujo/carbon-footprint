import { createContext, ReactNode, useState } from 'react';
import { AirplaneFootprint, BusFootPrint, CarFootprint, EnergyFootprint, Footprint, SubwayFootprint } from '../types/footprint';

export type FootprintContextType = {
    footprint: Footprint;
    setEnergyFootprint: ({ 
        energySource,
        energyUsageInKwh,
    }: EnergyFootprint) => void;
    setCarFootprint: (carFootprint: CarFootprint) => void;
    setMotorcycleFootprint: (motorcycleFootprint: CarFootprint) => void;
    setBusFootprint: (busFootprint: BusFootPrint) => void;
    setSubwayFootprint: (subwayFootprint: SubwayFootprint) => void;
    setAirplaneFootprint: (airplaneFootprint: CarFootprint) => void;
};

export const FootprintContext = createContext<FootprintContextType | null>(null);

const FootprintProvider = ({ children }: { children?: ReactNode }) => {
    const [footprint, setFootprint] = useState<Footprint>({});

    const updateTotalFootprint = (payload: Footprint) => {
        let totalFootprint = 0;
        let totalTransportationFootprint = 0;

        if (payload.car?.totalFootprint) {
            totalFootprint += payload.car.totalFootprint;
            totalTransportationFootprint += payload.car.totalFootprint;
        }

        if (payload.motorcycle?.totalFootprint) {
            totalFootprint += payload.motorcycle.totalFootprint;
            totalTransportationFootprint += payload.motorcycle.totalFootprint;
        }

        if (payload.bus?.totalFootprint) {
            totalFootprint += payload.bus.totalFootprint;
            totalTransportationFootprint += payload.bus.totalFootprint;
        }

        if (payload.subway?.totalFootprint) {
            totalFootprint += payload.subway.totalFootprint;
            totalTransportationFootprint += payload.subway.totalFootprint;
        }

        if (payload.airplane?.totalFootprint) {
            totalFootprint += payload.airplane.totalFootprint;
            totalTransportationFootprint += payload.airplane.totalFootprint;
        }

        if (payload.energy?.totalFootprint) {
            totalFootprint += payload.energy.totalFootprint;
        }

        setFootprint({
            ...payload,
            totalFootprint,
            totalTransportationFootprint,
        })
    }

    const setEnergyFootprint = ({ energySource, energyUsageInKwh, totalFootprint }: EnergyFootprint): void => {
        const payload = {
            ...footprint,
            energy: {
                energySource,
                energyUsageInKwh,
                totalFootprint,
            }
        }

        setFootprint(payload)
        updateTotalFootprint(payload)
    };

    const setCarFootprint = (carFootprint: CarFootprint): void => {
        const payload = {
            ...footprint,
            car: carFootprint,
        }

        setFootprint(payload)
        updateTotalFootprint(payload)
    };

    const setMotorcycleFootprint = (motorcycleFootprint: CarFootprint): void => {
        const payload = {
            ...footprint,
            motorcycle: motorcycleFootprint,
        }

        setFootprint(payload)
        updateTotalFootprint(payload)
    };

    const setBusFootprint = (busFootprint: BusFootPrint): void => {
        const payload = {
            ...footprint,
            bus: busFootprint,
        }

        setFootprint(payload)
        updateTotalFootprint(payload)
    };

    const setSubwayFootprint = (subwayFootprint: SubwayFootprint): void => {
        const payload = {
            ...footprint,
            subway: subwayFootprint,
        }

        setFootprint(payload)
        updateTotalFootprint(payload)
    };

    const setAirplaneFootprint = (airplaneFootprint: AirplaneFootprint): void => {
        const payload = {
            ...footprint,
            airplane: airplaneFootprint,
        }

        setFootprint(payload)
        updateTotalFootprint(payload)
    };

    return (
        <FootprintContext.Provider value={{
            footprint,
            setEnergyFootprint,
            setCarFootprint,
            setMotorcycleFootprint,
            setBusFootprint,
            setSubwayFootprint,
            setAirplaneFootprint,
        }}>
            {children}
        </FootprintContext.Provider>
    );
};

export default FootprintProvider;
