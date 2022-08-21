import React from 'react'
import { Button, Divider, Form,Input,notification,Typography} from 'antd'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import TeachersAPI from '../../api/TeachersAPI';

const { Title } = Typography; 

const AddTeacher = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: createTeacher } = useMutation((item)=> TeachersAPI.createTeacher(item),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("teachers");
            notification.success({
                message: "New Teacher saved",
                description: "Process ended successfully"
            })
            navigate("/teachers");
        },
        onError: ()=>{
            notification.error({
                message:"Unable to add new teacher"
            })
        }
    })
    const [form] = Form.useForm();

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [adress,setAdress] = useState("");
    const [dateOfBirth,setdateOfBirth] = useState("");
    const [sexe,setSexe] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");

    const onFinish = (values)=>{
        console.log(values);
        const teacher = {
            firstname,lastname,adress,dateOfBirth,sexe,email,phone
        }
        createTeacher(teacher);
    }

  return (
    <>
        <Title level={3}>Add new Teacher </Title>
        <Divider/>
        <Form 
            labelCol={{
                span: 3,
                }}
                wrapperCol={{
                span: 14,
                }}
            form={form} 
            name="control-ref" 
            encType='multipart/form-data'
            onFinish={onFinish}
            size="middle">
                <Form.Item name={"firstname"} label={"firstname"} rules={[{ required:true }]} hasFeedback>
                    <Input name='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                </Form.Item>
                <Form.Item name={"lastname"} label={"lastname"} rules={[{ required:true }]} hasFeedback>
                    <Input name='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                </Form.Item>
                <Form.Item name={"adress"} label={"adress"} rules={[{ required:true }]} hasFeedback>
                    <Input name='adress' value={adress} onChange={(e) => setAdress(e.target.value)}/>
                </Form.Item>
                <Form.Item name={"dateOfBirth"} label={"years"} rules={[{ required:true }]} hasFeedback>
                    <Input name='dateOfBirth' value={dateOfBirth} onChange={(e) => setdateOfBirth(e.target.value)}/>
                </Form.Item>
                <Form.Item name={"sexe"} label={"sexe"} rules={[{ required:true }]} hasFeedback>
                    <Input name='sexe' value={sexe} onChange={(e) => setSexe(e.target.value)}/>
                </Form.Item>
                <Form.Item name={"email"} label={"email"} rules={[{ required:true },{type:"email"}]} hasFeedback>
                    <Input name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item name={"phone"} label={"phone"} rules={[{ required:true }]} hasFeedback>
                    <Input name='phone' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </Form.Item>
                <Form.Item wrapperCol={{
                    offset:3
                }} >
                   <Button type='primary' htmlType='submit' >save</Button>
                </Form.Item>
        </Form>
    </>
  )
}

export default AddTeacher