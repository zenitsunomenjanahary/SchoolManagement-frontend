import React from 'react'
import { Button, Divider, Table, Typography } from "antd";
import { NavLink } from "react-router-dom";

const { Title } = Typography;

const Notes = () => {

  const notesColumns = [
    {
      title: "photo",
      dataIndex: "photo",
      key:"photo"
    },
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
      title: "email",
      dataIndex: "email",
      key:"email"
    },
    {
      title: "phone",
      dataIndex: "phone",
      key:"phone"
    },

  ]

  return (
    <>
      <Title level={3}>Notes</Title>
      <NavLink to={"/notes-new"}>
        <Button type='primary' size='large'>add new note</Button>
      </NavLink>
      <Divider/>
      <Table columns={notesColumns}/>
    </>
  )
}

export default Notes