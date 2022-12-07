import { useContext, useEffect, useState } from "react";
import { Col, Form, InputNumber, Row, Select, Typography } from "antd";
import {
  FootprintContext,
  FootprintContextType,
} from "../../state/footprint.context";
import { getHomeFootprint } from "../../services/footprint.api";
import EstimatedCarbonCard from "../EstimatedCarbonCard";

const HomeEnergyForm = () => {
  const { footprint, setEnergyFootprint } = useContext(
    FootprintContext
  ) as FootprintContextType;
  const [form] = Form.useForm();
  const [energySource, setEnergySource] = useState<string | undefined>(
    footprint.energy?.energySource
  );
  const [energyUsageInKwh, setEnergyUsageInKwh] = useState<number | undefined>(
    footprint.energy?.energyUsageInKwh
  );

  const onEnergySourceChange = (value: string) => {
    setEnergySource(value);
    setEnergyFootprint({
      energySource: value,
      energyUsageInKwh,
    });
  };

  const onEnergyUsageInKwhChange = (value: number | null) => {
    if (value === null) return;

    setEnergyUsageInKwh(+value);
    setEnergyFootprint({
      energySource,
      energyUsageInKwh: +value,
    });
  };

  useEffect(() => {
    if (!energySource || !energyUsageInKwh) return;

    getHomeFootprint({
      energySource,
      energyUsageInKwh,
    }).then((totalFootprint) => {
      setEnergyFootprint({
        energySource,
        energyUsageInKwh,
        totalFootprint,
      });
    });
  }, [energySource, energyUsageInKwh]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Typography.Title>Home Energy</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Typography.Paragraph>
            How much energy do you use at home?
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col span={24} lg={{ span: 8 }}>
          <EstimatedCarbonCard
            totalFootprint={footprint.energy?.totalFootprint}
          />
        </Col>

        <Col span={24} lg={{ span: 16 }}>
          <Form form={form} name="basic" autoComplete="off" layout="vertical">
            <Form.Item
              label="Energy Source"
              name="energySource"
              rules={[
                {
                  required: true,
                  message: "Please input your energy source!",
                },
              ]}
            >
              <Select
                placeholder="In doubt? Select Coal"
                onChange={onEnergySourceChange}
                value={energySource}
                options={[
                  {
                    value: "coal",
                    label: "Coal",
                  },
                  {
                    value: "hydropower",
                    label: "Hydropower",
                  },
                  {
                    value: "windTurbine",
                    label: "Wind Turbine",
                  },
                  {
                    value: "voltSolarPanel",
                    label: "Volt Solar Panel",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Energy usage in Kwh per month"
              name="energyUsageInKwh"
              rules={[
                {
                  required: true,
                  message: "We need to know how much energy you are consuming",
                },
              ]}
            >
              <InputNumber
                value={energyUsageInKwh}
                onChange={onEnergyUsageInKwhChange}
                placeholder="The average energy consumption in US is 886 kWh per month. How much energy do you consume?"
                style={{ width: "100%" }}
                min={0}
                max={100000}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default HomeEnergyForm;
