import { Col, Row, Typography } from "antd"
import { useContext } from "react"
import CarbonIcon from "../../icons/CarbonIcon"
import { FootprintContext, FootprintContextType } from "../../state/footprint.context"
import EstimatedCarbonCard from "../EstimatedCarbonCard"
import FootPrintChart from "../FootprintChart"

const ResultDashboard = () => {
    const { footprint } = useContext(FootprintContext) as FootprintContextType

    return <>
        <Typography.Title>Results</Typography.Title>

        <Typography.Paragraph>How much carbon are you emitting?</Typography.Paragraph>

        <Row gutter={[48, 16]}>
            <Col span={4}>
                <CarbonIcon />
            </Col>

            <Col span={6}>
                <EstimatedCarbonCard totalFootprint={footprint?.totalFootprint} />
            </Col>

            <Col span={14}>
                <FootPrintChart />
            </Col>
        </Row>
    </>
}

export default ResultDashboard
