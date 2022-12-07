import { Card, Col, Row, Typography } from 'antd';
import EstimatedCarbonCard from '../EstimatedCarbonCard';
import CarForm from '../CarForm';
import MotorcycleForm from '../MotorcycleForm';
import { useContext } from 'react';
import { FootprintContext, FootprintContextType } from '../../state/footprint.context';

const cardStyle = {
    width: '300px',
    height: '200px',
    display: 'inline-block',
    background: 'none',
    border: 'none',
    borderRadius: 0,
    borderLeft: '1px solid #e8e8e8',
}

const TransportationForm = () => {
    // const [form] = Form.useForm();
    // const { carFootprint } = useCarFootprint()
    const  { footprint } = useContext(FootprintContext)  as FootprintContextType

    // const onFinish = (values: any) => {
    //     console.log('Success:', values);
    // };

    return (
        <>
            <Row>
                <Col span={24}>
                    <Typography.Title>Transportation</Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Typography.Paragraph>How do you get around?</Typography.Paragraph>
                </Col>
            </Row>

            <Row gutter={[48, 16]}>
                <Col span={24} lg={{ span: 8 }}>
                    <EstimatedCarbonCard totalFootprint={footprint?.totalTransportationFootprint} />
                </Col>

                <Col span={24} lg={{ span: 16 }}>
                        <Card style={cardStyle}>
                            <CarForm />
                        </Card>

                        <Card style={cardStyle}>
                            <MotorcycleForm />
                        </Card>

                        {/* <Card style={cardStyle}>
                            <Typography.Title level={2}>Bus</Typography.Title>

                            <Form.Item
                                label="Mileage per Month"
                                name="busMileagePerMonth"
                            >
                                <InputNumber
                                    min={0} />
                            </Form.Item>
                        </Card> */}

                        {/* <Card style={cardStyle}>
                            <Typography.Title level={2}>Subway</Typography.Title>

                            <Form.Item
                                label="Milage per Month"
                                name="subwayMileagePerMonth"
                            >
                                <InputNumber
                                    min={0} />
                            </Form.Item>
                        </Card> */}

                        {/* <Card style={cardStyle}>
                            <Typography.Title level={2}>Airplane</Typography.Title>

                            <Form.Item
                                label="Yearly Mileage"
                                name="airplaneYearly"
                            >
                                <InputNumber
                                    min={0} />
                            </Form.Item>

                            <Form.Item
                                label="Monthly Mileage"
                                name="airplaneMonthly"
                            >
                                <InputNumber
                                    min={0} />
                            </Form.Item>
                        </Card> */}
                    {/* </Form> */}
                </Col>
            </Row>
        </>
    );
};

export default TransportationForm;
