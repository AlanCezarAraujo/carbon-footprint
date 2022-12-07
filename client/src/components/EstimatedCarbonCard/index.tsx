import { Card, Typography } from "antd"
import AnimatedNumber from 'react-animated-number';

function tFormatter(num: number) {
    return Math.abs(num) > 999 ? `${Math.sign(num) * (+(Math.abs(num)/1000).toFixed(1))}ton` : `${(Math.sign(num) * Math.abs(num)).toFixed(1)}kg`
}

const EstimatedCarbonCard = ({ totalFootprint }: { totalFootprint: number | undefined }) => {
    return <Card bordered={false}>
        <AnimatedNumber
                value={totalFootprint || 0}
                style={{
                    transition: '0.8s ease-out',
                    fontSize: 48,
                    transitionProperty: 'opacity'
                }}
                duration={300}
                formatValue={(n: number) => `${tFormatter(n)}`} />
            <Typography.Paragraph>Estimated kilos of CO<sub>2</sub>/year</Typography.Paragraph>
    </Card>
}

export default EstimatedCarbonCard
