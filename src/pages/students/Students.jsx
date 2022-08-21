import React from 'react'
import { Button, Divider, notification, Space, Table, Typography } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import StudentsAPI from '../../api/StudentsAPI';
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
const { Title } = Typography;

const Students = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("students", StudentsAPI.getStudents);
  const { mutate: deleteStudent } = useMutation((student)=> StudentsAPI.deleteStudent(student),{
    onSuccess:()=>{
      queryClient.invalidateQueries("students");
      notification.success({
        message: "student deleted successfully",
        description: "Process ended"
      })
      navigate("/students");
    },
    onError:()=>{}
  })

  const studentColumns = [
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
      title: "sexe",
      dataIndex: "sexe",
      key:"sexe"
    },
    {
      title: "classe",
      dataIndex: "classe",
      key:"classe",
      render: (_,record)=>(<>
       {record.classe.title}
      </>)
    },
    {
      title: "email",
      dataIndex: "email",
      key:"email"
    },
    {
      title: "phone",
      dataIndex: "phone",
      key:"phone"
    },
    {
      title: "actions",
      dataIndex: "courses",
      key:"actions",
      render: (_,record) => (
        <Space>
          <NavLink to={`/student-view-notes/${record._id}`}>
            <Button value={record._id} icon={<AiFillEye/>}/>
          </NavLink>
          <NavLink to={`/student-edit/${record._id}`}>
            <Button value={record._id} icon={<AiFillEdit/>}/>
          </NavLink>
          <Button 
              type='danger' 
              value={record._id} 
              icon={<AiFillDelete/>}
              onClick={(e)=>{ if(window.confirm("Do you really want delete classe? ")){handleDeleteStudent(record._id)} }}  
            />
        </Space>
      )
    },

  ]

  const handleDeleteStudent = (id)=>{
    deleteStudent(id)
  }

  if(isLoading){
    return <Loading/>
  }

  if(error){
    return <Error/>
  }

  return (
    <>
      <Title level={3}>Students</Title>
      <NavLink to={"/students-new"}>
        <Button type='primary'>add student</Button>
      </NavLink>
      <Divider/>
      <Table size='small' bordered columns={studentColumns} dataSource={data} />
    </>
  )
}

export default Students