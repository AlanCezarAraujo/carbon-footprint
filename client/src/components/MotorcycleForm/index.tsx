import { Typography, Form, InputNumber } from "antd"
import { useContext } from "react";
import { useMotorcycleFootprint } from "../../services/motorcycle.hook";
import { FootprintContext, FootprintContextType } from "../../state/footprint.context";

const MotorcycleForm = () => {
    const [form] = Form.useForm();
    const { setMotorcycleFootprint } = useContext(FootprintContext) as FootprintContextType
    const { motorcycleFootprint, isLoadingMotorcycleFootprint } = useMotorcycleFootprint()

    const onMotorcycleChange = () => {
        const { motorcycleMilesPerMonth, motorcycleMileagePerGallon } = form.getFieldsValue()

        if (!motorcycleMilesPerMonth || !motorcycleMileagePerGallon) return

        setMotorcycleFootprint({
            distanceInMileage: motorcycleMilesPerMonth,
            mileagePerGallon: motorcycleMileagePerGallon,
        })
    };

    return <Form
            form={form}
            name="motorcycle-form"
            autoComplete="off"
        >
        <Typography.Title level={2}>Motorcycle</Typography.Title>

        <Form.Item
            label="Miles per Month"
            name="motorcycleMilesPerMonth"
        >
            <InputNumber
                onChange={onMotorcycleChange}
                value={motorcycleFootprint?.distanceInMileage}
                disabled={isLoadingMotorcycleFootprint}
                min={0} />
        </Form.Item>

        <Form.Item
            label="Mileage per Gallon"
            name="motorcycleMileagePerGallon"
        >
            <InputNumber
                onChange={onMotorcycleChange}
                value={motorcycleFootprint?.mileagePerGallon}
                disabled={isLoadingMotorcycleFootprint}
                min={0} />
        </Form.Item>
    </Form>
}

export default MotorcycleForm