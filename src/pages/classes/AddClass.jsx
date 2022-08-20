import React from 'react'
import { Button, Divider, Form,Input,notification,Typography} from 'antd'
import { useState } from 'react';
import { useMutation, useQueryClient} from "react-query";
import { useNavigate } from 'react-router-dom';
import ClassesAPI from '../../api/ClassesAPI';

const { Title } = Typography; 

const AddClass = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [form] = Form.useForm();

    const queryClient = useQueryClient();
    const {mutate: createClasse} = useMutation((item)=> ClassesAPI.createClasse(item),{
        onSuccess: ()=> {
            queryClient.invalidateQueries("classes");
            notification.success({
                message:"New classe saved",
                description: "Process ended successfully"
            })
            navigate("/classes");
        },
        onError: ()=> {
            notification.error({
                message:"Unable to add classe"
            })
        }
    })


    const onFinish = async(values)=>{
        const classe = { title : values.title}
        createClasse(classe);
    }

  return (
    <>
        <Title level={3}>Add new classe </Title>
        <Divider/>
        <Form 
            form={form} 
            name="control-ref" 
            onFinish={onFinish}
            size="middle">
                <Form.Item name={"title"} label={"title"} rules={[{ required:true }]} hasFeedback>
                    <Input name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Form.Item>
                <Form.Item >
                   <Button type='primary' htmlType='submit' >save</Button>
                </Form.Item>
        </Form>
    </>
  )
}

export default AddClass