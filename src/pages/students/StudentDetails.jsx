import React from 'react'
import { Descriptions, Divider, Row } from 'antd';
import { useQuery } from 'react-query';
import StudentsAPI from '../../api/StudentsAPI';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import StudentNotes from './StudentNotes';



const StudentDetails = () => {
    const id = useParams().id;
    const {isLoading, error, data: student } = useQuery(["student",id], ()=> StudentsAPI.getStudentById(id));
    if(isLoading) return <Loading/>
    if(error) return <Error/>
  return (
    <>
        <Row>
            <Descriptions title="Student Information" layout="horizontal" size='large'>
                <Descriptions.Item label="Firstname"> { student.firstname} </Descriptions.Item>
                <Descriptions.Item label="Lastname"> { student.lastname} </Descriptions.Item>
                <Descriptions.Item label="adress"> { student.adress} </Descriptions.Item>
                <Descriptions.Item label="school years"> { student.years} </Descriptions.Item>
                <Descriptions.Item label="dateOfBirth"> { student.dateOfBirth} </Descriptions.Item>
                <Descriptions.Item label="sexe"> { student.sexe} </Descriptions.Item>
                <Descriptions.Item label="email"> { student.email} </Descriptions.Item>
                <Descriptions.Item label="phone"> { student.phone} </Descriptions.Item>
                <Descriptions.Item label="classe"> { student.classe.title} </Descriptions.Item>
            </Descriptions>
            <Divider/>
        </Row>
        <StudentNotes classe={student.classe._id} student={id}/>
    </>
  )
}

export default StudentDetails