import { CalculatorOutlined, CarOutlined, HomeOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import HomeEnergyForm from '../HomeEnergyForm';
import ResultDashboard from '../ResultDashboard';
import TransportationForm from '../TransportationForm';

const FootprintForm = () => {
    const tabItems = [{
        key: '1',
        children: <HomeEnergyForm />,
        label: <><HomeOutlined /> Home Energy</>,
    }, {
        key: '2',
        children: <TransportationForm />,
        label: <><CarOutlined /> Transportation</>,
    }, {
        key: '3',
        children: <ResultDashboard />,
        label: <><CalculatorOutlined /> Result</>,
    }]

    return (
        <Tabs items={tabItems} />
    );
};

export default FootprintForm;
