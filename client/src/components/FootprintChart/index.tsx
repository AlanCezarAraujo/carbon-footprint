import { Typography } from "antd"
import { useContext } from "react"
import weightFormatter from "../../services/weight-formatter.service"
import { FootprintContext, FootprintContextType } from "../../state/footprint.context"

const energyStyle = {
    backgroundColor: "#e8fd28",
    height: "10px",
    display: 'flex',
}

const transportationStyle = {
    backgroundColor: "#1cf5ac",
    height: "10px",
    display: 'flex',
}

const titleStyle = {
    fontSize: "1rem",
}

const paragraphStyle = {
    fontSize: "2em",
}

const getPercent = (value: number, total: number) => {
    const percent = (value / total) * 100

    return Math.ceil(percent)
}

const FootPrintChart = () => {
    const { footprint } = useContext(FootprintContext) as FootprintContextType
    const { energy, totalFootprint, totalTransportationFootprint } = footprint
    const energyPercent = getPercent(energy?.totalFootprint || 0, totalFootprint || 0)
    const transportationPercent = getPercent(totalTransportationFootprint || 0, totalFootprint || 0)

    if (!totalFootprint) return null

    return <>
        {!!energy?.totalFootprint && <>
            <div style={{ ...energyStyle, flexDirection: "column", width: `${energyPercent}%` }} />
            <Typography.Title level={2} style={titleStyle}>Energy ~{energyPercent}%</Typography.Title>
            <Typography.Paragraph style={paragraphStyle}>{weightFormatter.format(energy?.totalFootprint || 0)} CO<sub>2</sub></Typography.Paragraph>
        </>}

        {!!totalTransportationFootprint && <>
            <div style={{ ...transportationStyle, flexDirection: "column", width: `${transportationPercent}%` }} />
            <Typography.Title level={2} style={titleStyle}>Transportation ~{transportationPercent}%</Typography.Title>
            <Typography.Paragraph style={paragraphStyle}>{weightFormatter.format(totalTransportationFootprint || 0)} CO<sub>2</sub></Typography.Paragraph>
        </>}
    </>
}

export default FootPrintChart
