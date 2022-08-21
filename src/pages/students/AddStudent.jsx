import React from 'react'
import { Button, Divider, Form,Input,Typography,Select, notification} from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ClassesAPI from '../../api/ClassesAPI';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import StudentsAPI from '../../api/StudentsAPI';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography; 
const { Option } = Select;


const AddStudent = () => {
    const navigate =useNavigate();
    const queryClient = useQueryClient();
    const {isLoading, error, data: classes } = useQuery("classes", ClassesAPI.getClasses);
    const { mutate: createStudent} = useMutation((student)=> StudentsAPI.createStudent(student),{
        onSuccess:()=>{
            queryClient.invalidateQueries("students");
            notification.success({
                message:"New student added",
                description: "List student updated"
            })
            navigate("/students");
        },
        onError:()=>{}
    })
    const [form] = Form.useForm();

    const onFinish = (values)=>{
        const student = {
            numero: values.numero,
            firstname: values.firstname,
            lastname: values.lastname,
            adress: values.adress,
            years: values.years,
            dateOfBirth: values.dateOfBirth,
            sexe: values.sexe,
            email: values.email,
            phone: values.phone,
            classe: values.classe,
        }
        createStudent(student);
    }

    if(isLoading) return <Loading/>

    if(error) return <Error/>

  return (
    <>
        <Title level={3}>Add new Student </Title>
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
            onFinish={onFinish}>
                <Form.Item name={"numero"} label={"numero"} rules={[{ required:true }]} hasFeedback>
                    <Input name='numero'/>
                </Form.Item>
                <Form.Item name={"firstname"} label={"firstname"} rules={[{ required:true }]} hasFeedback>
                    <Input name='firstname' />
                </Form.Item>
                <Form.Item name={"lastname"} label={"lastname"} rules={[{ required:true }]} hasFeedback>
                    <Input name='lastname'/>
                </Form.Item>
                <Form.Item name={"adress"} label={"adress"} rules={[{ required:true }]} hasFeedback>
                    <Input name='adress'/>
                </Form.Item>
                <Form.Item name={"years"} label={"years"} rules={[{ required:true }]} hasFeedback>
                    <Input name='years' />
                </Form.Item>
                <Form.Item name={"dateOfBirth"} label={"date of birth"} rules={[{ required:true }]} hasFeedback>
                    <Input name='dateOfBirth' />
                </Form.Item>
                <Form.Item name={"sexe"} label={"sexe"} rules={[{ required:true }]} hasFeedback>
                    <Select name={"sexe"} >
                        <Option key={"boys"} value="Boys">Boy</Option>
                        <Option key={"girl"} value="Girl">Girl</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={"email"} label={"email"} rules={[{ required:true },{type:"email"}]} hasFeedback>
                    <Input name='email'/>
                </Form.Item>
                <Form.Item name={"phone"} label={"phone"} rules={[{ required:true }]} hasFeedback>
                    <Input name='phone' />
                </Form.Item>
                <Form.Item name={"classe"} label={"classe"} rules={[{ required:true }]} hasFeedback>
                    { classes && <Select name={"classe"}>
                        {
                            classes.map((classe)=>(
                                <Option key={classe._id} value={classe._id}> {classe.title} </Option>
                            ))
                        }
                    </Select>}
                </Form.Item>
                <Form.Item 
                    wrapperCol={{
                        offset: 3,
                        span: 14,
                    }}>
                   <Button type='primary' htmlType='submit' >save</Button>
                </Form.Item>
        </Form>
    </>
  )
}

export default AddStudent