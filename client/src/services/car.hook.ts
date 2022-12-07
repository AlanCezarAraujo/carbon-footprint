import { useContext, useEffect, useState } from "react";
import { FootprintContext, FootprintContextType } from "../state/footprint.context";
import { getCarFootprint } from "./footprint.api";

export const useCarFootprint = () => {
    const { footprint, setCarFootprint } = useContext(FootprintContext) as FootprintContextType
    const [isLoadingCarFootprint, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!footprint.car?.distanceInMileage || !footprint.car?.mileagePerGallon) {
            setCarFootprint({
                distanceInMileage: footprint.car?.distanceInMileage || 0,
                mileagePerGallon: footprint.car?.mileagePerGallon || 0,
                totalFootprint: 0,
            });

            return;
        }

        const { distanceInMileage, mileagePerGallon } = footprint.car;

        setLoading(true);

        getCarFootprint({
            distanceInMileage,
            mileagePerGallon,
        }).then((totalFootprint) => {
            setCarFootprint({
                distanceInMileage,
                mileagePerGallon,
                totalFootprint,
            });

            setLoading(false);
        });

    }, [footprint.car?.distanceInMileage, footprint.car?.mileagePerGallon])

    return { carFootprint: footprint.car, isLoadingCarFootprint };
};