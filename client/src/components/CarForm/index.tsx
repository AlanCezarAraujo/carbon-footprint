import { Typography, Form, InputNumber } from "antd"
import { useContext } from "react";
import { useCarFootprint } from "../../services/car.hook";
import { FootprintContext, FootprintContextType } from "../../state/footprint.context";

const CarForm = () => {
    const [form] = Form.useForm();
    const { setCarFootprint } = useContext(FootprintContext) as FootprintContextType
    const { carFootprint, isLoadingCarFootprint } = useCarFootprint()

    const onCarChange = (value: number | null) => {
        const { carMilesPerMonth, carMileagePerGallon } = form.getFieldsValue()

        // if (!carMilesPerMonth || !carMileagePerGallon) return

        setCarFootprint({
            distanceInMileage: carMilesPerMonth,
            mileagePerGallon: carMileagePerGallon,
        })
    };

    return <Form
            form={form}
            name="car-form"
            autoComplete="off"
        >
        <Typography.Title level={2}>Car</Typography.Title>

        <Form.Item
            label="Miles per Month"
            name="carMilesPerMonth"
        >
            <InputNumber
                onChange={onCarChange}
                value={carFootprint?.distanceInMileage}
                disabled={isLoadingCarFootprint}
                min={0} />
        </Form.Item>

        <Form.Item
            label="Mileage per Gallon"
            name="carMileagePerGallon"
        >
            <InputNumber
                onChange={onCarChange}
                value={carFootprint?.mileagePerGallon}
                disabled={isLoadingCarFootprint}
                min={0} />
        </Form.Item>
    </Form>
}

export default CarForm