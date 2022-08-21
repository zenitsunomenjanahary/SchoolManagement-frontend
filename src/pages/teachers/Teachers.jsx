import React from 'react'
import { Button, Divider, notification, Space, Table, Typography } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TeachersAPI from '../../api/TeachersAPI';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const { Title } = Typography;

const Teachers = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery("teacher", TeachersAPI.getTeachers);
  const { mutate: deleteTeacher } = useMutation((teacher)=> TeachersAPI.deleteTeacher(teacher),{
    onSuccess:()=>{
      queryClient.invalidateQueries("students");
      notification.success({
        message: "student deleted successfully",
        description: "Process ended"
      })
      navigate("/teacher");
    },
    onError:()=>{
      notification.error({
        message: "student deleted successfully",
        description: "Process ended"
      })
      navigate("/teacher");
    }
  })
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

  const handleDeleteTeacher = (e)=>{
    deleteTeacher(e)
  }

  if(isLoading) return <Loading/>

  if(error) return <Error/>

  return (
    <>
      <Title level={3}>Teachers</Title>
      <NavLink to={"/teachers-new"}>
        <Button type='primary'>add new teacher</Button>
      </NavLink>
      <Divider/>
      <Table size='small' columns={teacherColumns} dataSource={data}/>
    </>
  )
}

export default Teachers