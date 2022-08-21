import React from 'react'
import { Button, Divider, notification, Space, Table, Typography } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ClassesAPI from '../../api/ClassesAPI';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const { Title } = Typography;

const Classes = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("classes", ClassesAPI.getClasses);
  const { mutateAsync } = useMutation(ClassesAPI.deleteClasse,{
    onSuccess:()=>{
      queryClient.invalidateQueries("classes");
      notification.success({
        message: "Classe deleted successfully",
        description: "Process ended"
      })
      navigate("/classes");
    }
  })


  const classesColumns = [
    {
      title: "title",
      dataIndex: "title",
      key:"title"
    },
    {
      title: "actions",
      dataIndex: "courses",
      key:"actions",
      render: (_,record) => (
        <Space>
          <NavLink to={`/classes-edit-${record._id}`}>
            <Button value={record._id} icon={<AiFillEdit/>}/>
          </NavLink>
          <Button 
              type='danger' 
              value={record._id} 
              icon={<AiFillDelete/>}
              onClick={(e)=>{ if(window.confirm("Do you really want delete classe? ")){handleDeleteClasse(record._id)} }}  
            />
        </Space>
      )
    },
  ]

  const handleDeleteClasse = async(classId)=>{
    await mutateAsync(classId);
  }

  if(isLoading) return <Loading/>

  if(error) return <Error/>

  return (
    <>
      <Title level={3}>Classes</Title>
      <NavLink to={"/classes-new"}>
        <Button type='primary'>add new classe</Button>
      </NavLink>
      <Divider/>
      <Table bordered size='small' columns={classesColumns} dataSource={data}/>
    </>
  )
}

export default Classes