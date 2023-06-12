import { Col, Row, Typography, Select } from "antd";

import React, { useState } from "react";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const { Option } = Select;
  const { Title } = Typography;
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory.sparkline.length; i += 1) {
    coinPrice.push(coinHistory.sparkline[i]);
    coinTimestamp.push(
      new Date(coinHistory.allTimeHigh.timestamp).toLocaleDateString()
    );
  }
  const [timeperiod, setTimeperiod] = useState(coinTimestamp);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels: timeperiod,
    datasets: [
      {
        label: "Price is USD",
        data: coinHistory.sparkline,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = {
    responsive: true,
    type: "line",
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <>
      <Select
        defaultValue=""
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimeperiod(value)}
      >
        {labels.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change:{coinHistory.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price:${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
