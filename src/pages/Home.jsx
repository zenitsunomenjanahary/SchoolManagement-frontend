import React from 'react'
import { Card, Col, Row, Space, Typography } from "antd";
import { AiOutlineUser,AiFillRead} from "react-icons/ai"
import { IoSchoolSharp} from "react-icons/io5"
import { FaTasks } from 'react-icons/fa';
import Chart from "react-apexcharts";

const { Title } = Typography

const Home = () => {
  
  const option = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [2017, 2018, 2019, 2020, 2021, 2022]
    }
  }
  
  const series = [
    {
      data: [2, 20, 45, 77, 103, 10, 74, 14]
    },
    {
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    },
    {
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    },
  ]

  return (
    <>
      <Title level={4}>Dashboard</Title>
      <Row gutter={16}>
        <Col lg={6} md={6} sm={12} xs={24}>
          <Card className='card-1'>
            <Space>
              <IoSchoolSharp size={66}/>
              <Space direction='vertical'>
                <Title style={{ margin:0}} level={4}>Students</Title>
                <Title  level={4}>33</Title>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} xs={24}>
          <Card className='card-2' bordered={true} >
            <Space>
              <AiOutlineUser size={66}/>
              <Space direction='vertical'>
                <Title style={{ margin:0}} level={4}>Teachers</Title>
                <Title  level={4}>33</Title>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} xs={24}>
          <Card className='card-4'>
            <Space>
              <AiFillRead size={66}/>
              <Space direction='vertical'>
                <Title style={{ margin:0}} level={4}>Courses</Title>
                <Title  level={4}>33</Title>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} xs={24}>
          <Card className='card-3'>
            <Space>
              <FaTasks size={66}/>
              <Space direction='vertical'>
                <Title style={{ margin:0}} level={4}>Notes</Title>
                <Title  level={4}>33</Title>
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Chart type='radialBar' series={series} options={option} width={"80%"}/>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Chart  type='bar'series={series} options={option} width={"80%"}/>
        </Col>
      </Row>
    </>
  )
}

export default Home