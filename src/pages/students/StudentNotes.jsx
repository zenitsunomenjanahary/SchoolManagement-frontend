import React from 'react'
import { Button, notification, Space, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { NavLink } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import AddNote from '../notes/AddNote';
import { useState } from 'react';
import StudentsAPI from '../../api/StudentsAPI';
import NotesAPI from '../../api/NotesAPI';

const StudentNotes = ({classe, student}) => {
    const [visible, setVisible] = useState(false);
    const queryClient = useQueryClient();
    const {isLoading, error, data: studentNotes } = useQuery(["studentNotes", student],()=> StudentsAPI.getStudentNotes(student));
    const { mutate: addStudentNote } = useMutation((note)=> NotesAPI.createNote(note),{
      onSuccess:()=>{
        queryClient.invalidateQueries("studentNotes")
        notification.success({
          message:"new note saved"
        })
      },
      onError: (error)=>{
        notification.error({
          message: "unable to add note",
          description: error,
          duration:10000
        })
      }
    });

    const studentNotesColumns = [
        {
            title:"Course",
            dataIndex: "title",
            key:"course",
            render: (_,record)=>(
              `${record.course.title}`
            )
        },
        {
            title:"Coefficient",
            dataIndex: "coefficient",
            key:"course",
            render: (_,record)=>(
              `${record.course.coefficient}`
            )
        },
        {
            title:"Note",
            dataIndex: "note",
            key:"course",
        },
        {
            title:"Cumule",
            dataIndex: "course",
            key:"course",
            render: (_,record)=>(
              `${(record.note) * (record.course.coefficient)}`
            )
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
                    onClick={(e)=>{ if(window.confirm("Do you really want delete classe? ")){handleDeleteNoteStudent(record._id)} }}  
                  />
              </Space>
            )
          },
    ]

    const handleDeleteNoteStudent = ()=>{}

    const onCreate =(values)=>{
      console.log(values);
      addStudentNote(values);
      setVisible(false);
    }

    const onCancel =()=>{
      setVisible(false);
    }
    
    if(isLoading) return <Loading/>
    if(error) return <Error/>
  return (
    <>
      <Button type='primary' onClick={()=> setVisible(true)}>Add note</Button>
      <AddNote classe={classe} student={student} notes={studentNotes} visible={visible} onCreate={onCreate} onCancel={onCancel}/>
      
      <Table size='small' columns={studentNotesColumns} dataSource={studentNotes} style={{marginTop:"1rem"}}/>
    </>
  )
}

export default StudentNotes