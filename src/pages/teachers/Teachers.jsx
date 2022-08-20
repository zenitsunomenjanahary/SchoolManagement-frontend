import React from 'react'
import { Button, Divider, Space, Table, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useQuery } from 'react-query';
import TeachersAPI from '../../api/TeachersAPI';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const { Title } = Typography;

const Teachers = () => {

  const { isLoading, error, data } = useQuery("teacher", TeachersAPI.getTeachers);

  const teacherColumns = [
    {
      title: "firstname",
      dataIndex: "firstname",
      key:"firstname"
    },
    {
      title: "lastname",
      dataIndex: "lastname",
      key:"lastname"
    },
    {
      title: "phone",
      dataIndex: "phone",
      key:"phone"
    },
    {
      title: "email",
      dataIndex: "email",
      key:"email"
    },
    {
      title: "actions",
      dataIndex: "teachers",
      key:"teachers",
      render: (_,record) =>(
        <Space key={record._id}>
          <NavLink to={`/teachers-edit-${record._id}`}>
            <Button value={record._id} icon={<AiFillEdit/>}/>
          </NavLink>
          <Button 
              type='danger' 
              value={record._id} 
              icon={<AiFillDelete/>}
              onClick={(e)=>{ if(window.confirm("Do you really want delete this teacher? ")){handleDeleteTeacher(record._id)} }}  
            />
        </Space>
      )
    },

  ]

  const handleDeleteTeacher = ()=>{}

  if(isLoading) return <Loading/>

  if(error) return <Error/>

  return (
    <>
      <Title level={3}>Teachers</Title>
      <NavLink to={"/teachers-new"}>
        <Button type='primary' size='large'>add new teacher</Button>
      </NavLink>
      <Divider/>
      <Table columns={teacherColumns} dataSource={data}/>
    </>
  )
}

export default Teachers