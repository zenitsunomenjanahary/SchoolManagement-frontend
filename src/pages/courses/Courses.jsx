import React from 'react'
import { Button, Divider, Space, Table, Typography } from "antd";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { NavLink } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CoursesApi from '../../api/CoursesApi';
import Error from "../../components/Error"
import Loading from "../../components/Loading"

const { Title } = Typography;

const Courses = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteCourse } = useMutation((courseId)=> CoursesApi.deleteCourse(courseId),{
    onSuccess:()=>{
      queryClient.invalidateQueries("courses")
    }
  })
  const { isLoading, error, data } = useQuery("courses", CoursesApi.getCourses);

  const coursesColumns = [
    {
      title: "title",
      dataIndex: "title",
      key:"title"
    },
    {
      title: "teacher",
      dataIndex: "teacher",
      key:"teacher",
      render: (_,record)=>(
        `${record.teacher.firstname}`
      )
    },
    {
      title: "classe",
      dataIndex: "classe",
      key:"classe",
      render: (_,record)=>(
        `${record.classe.title}`
      )
    },
    {
      title: "coefficient",
      dataIndex: "coefficient",
      key:"coefficient"
    },
    {
      title: "actions",
      dataIndex: "teachers",
      key:"teachers",
      render: (_,record) =>(
        <Space>
          <NavLink to={`/teachers-edit-${record._id}`}>
            <Button value={record._id} icon={<AiFillEdit/>}/>
          </NavLink>
          <Button 
              type='danger' 
              value={record._id} 
              icon={<AiFillDelete/>}
              onClick={(e)=>{ if(window.confirm("Do you really want delete this course? ")){handleDeleteCourse(record._id)} }}  
            />
        </Space>
      )
    },
  ]

  const handleDeleteCourse = (courseId)=>{
    deleteCourse(courseId)
  }

  if(isLoading) return <Loading/>
  if(error) return <Error/>
  return (
    <>
      <Title level={3}>Courses</Title>
      <NavLink to={"/courses-new"}>
        <Button type='primary' size='large'>add new course</Button>
      </NavLink>
      <Divider/>
      <Table columns={coursesColumns} dataSource={data}/>
    </>
  )
}

export default Courses