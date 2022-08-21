import React from 'react'
import { Button, Divider, Form,Input,Typography,Select, notification} from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import TeachersAPI from '../../api/TeachersAPI';
import ClassesAPI from '../../api/ClassesAPI';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import CoursesApi from '../../api/CoursesApi';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const { Title } = Typography; 
const AddCourse = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const {isLoading: isTeacherLoading, error: isTeacherError, data: teachers } = useQuery("teachers", TeachersAPI.getTeachers);
    const {isLoading: isClasseLoading, error: isClasseError, data: classes } = useQuery("classes", ClassesAPI.getClasses);

    const { mutate: createCourse } = useMutation((course)=> CoursesApi.createCourse(course),{
        onSuccess: ()=>{
            queryClient.invalidateQueries("courses");
            notification.success({
                message:"New Course added",
                description:"List course updated"
            })
            navigate("/courses");
        },
        onError: ()=>{}
    });

    const [form] = Form.useForm();

    const onFinish = (values)=>{
        console.log(values);
        createCourse(values);
    }

    if(isClasseLoading || isTeacherLoading) return <Loading/>

    if(isTeacherError || isClasseError) return <Error/>

  return (
    <>
        <Title level={3}>Add new course </Title>
        <Divider/>
        <Form 
            form={form} 
            labelCol={{
                span: 3,
              }}
              wrapperCol={{
                span: 14,
              }}
            name="control-ref" 
            onFinish={onFinish}
            size="middle">
                <Form.Item name={"title"} label={"title"} rules={[{ required:true }]} hasFeedback>
                    <Input name='title'/>
                </Form.Item>
                <Form.Item name={"teacher"} label={"teacher"} rules={[{ required:true }]} hasFeedback>
                    <Select>
                        {
                            teachers.map((teacher)=>(
                                <Option key={teacher._id} value={teacher._id} > {teacher.firstname} {teacher.lastname} </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={"coefficient"} label={"coefficient"} rules={[{ required:true }]} hasFeedback>
                    <Input name='coefficient'/>
                </Form.Item>
                <Form.Item name={"classe"} label={"classe"} rules={[{ required:true }]} hasFeedback>
                    <Select >
                        {
                            classes.map((classe)=>(
                                <Option key={classe._id} value={classe._id} > {classe.title} </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{
                    offset:3
                }}>
                   <Button type='primary' htmlType='submit' >save</Button>
                </Form.Item>
        </Form>
    </>
  )
}

export default AddCourse