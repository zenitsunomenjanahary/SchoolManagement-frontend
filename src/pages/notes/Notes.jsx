import React from 'react'
import { Divider, Table, Typography } from "antd";
import {useQuery } from "react-query";
import NotesAPI from '../../api/NotesAPI';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const { Title } = Typography;

const Notes = () => {

  const { isLoading, error, data } = useQuery("notes", NotesAPI.getNotes)

  const notesColumns = [
    {
      title: "classe",
      dataIndex: "classe",
      key:"classe",
      render: (_,record)=> `${record.classe.title}`
    },
    {
      title: "student",
      dataIndex: "student",
      key:"student",
      render: (_,record)=> `${record.student.firstname} ${record.student.lastname}`
    },
    {
      title: "course",
      dataIndex: "course",
      key:"course",
      render: (_,record)=> `${record.course.title}`
    },
    {
      title: "note",
      dataIndex: "note",
      key:"note"
    },
  ]

  if(isLoading) return <Loading/>
  if(error) return <Error/>

  return (
    <>
      <Title level={3}>Notes</Title>
      <Divider/>
      <Table size="small" bordered columns={notesColumns} dataSource={data}/>
    </>
  )
}

export default Notes