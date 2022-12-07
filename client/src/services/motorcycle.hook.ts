import { useContext, useEffect, useState } from "react";
import { FootprintContext, FootprintContextType } from "../state/footprint.context";
import { getMotorcycleFootprint } from "./footprint.api";

export const useMotorcycleFootprint = () => {
    const { footprint, setMotorcycleFootprint } = useContext(FootprintContext) as FootprintContextType
    const [isLoadingMotorcycleFootprint, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!footprint.motorcycle?.distanceInMileage || !footprint.motorcycle?.mileagePerGallon) {
            return;
        }

        const { distanceInMileage, mileagePerGallon } = footprint.motorcycle;

        setLoading(true);

        getMotorcycleFootprint({
            distanceInMileage,
            mileagePerGallon,
        }).then((totalFootprint) => {
            setMotorcycleFootprint({
                distanceInMileage,
                mileagePerGallon,
                totalFootprint,
            });

            setLoading(false);
        });

    }, [footprint.motorcycle?.distanceInMileage, footprint.motorcycle?.mileagePerGallon])

    return { motorcycleFootprint: footprint.motorcycle, isLoadingMotorcycleFootprint };
};