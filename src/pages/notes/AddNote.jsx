import React from 'react'
import { Form,InputNumber, Modal, Select } from "antd";
import { useQuery } from 'react-query';
import ClassesAPI from '../../api/ClassesAPI';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const {Option } = Select

const AddNote = ({classe,student,notes,visible, onCreate, onCancel}) => {
  const [form] = Form.useForm();

  const {isLoading, error, data: ClasseCourses } = useQuery(["ClasseCourses",classe], ()=>ClassesAPI.getClasseById(classe));
  const alreadyHasNote = [];

  if(isLoading) return <Loading/>
  if(error) return <Error/>
  return (
    <Modal
      visible={visible}
      title={"Add new student note"}
      okText="add note"
      cancelText={"cancel"}
      onCancel={onCancel}
      onOk={()=>{
        form.validateFields().then((values)=>{
          form.resetFields();
          const note = {
            classe,
            student,
            note: values.note,
            course: values.course
          }
          onCreate(note)
        })
        .catch((info)=>{console.log(info);})
      }}
    >
      <Form form={form} layout="vertical" name='form_in_modal'>
        <Form.Item name="note" label="note">
          <InputNumber name='note'/>
        </Form.Item>
        <Form.Item name={"course"} label={"course"} rules={[{required: true}]}>
          <Select name="course">
            {
              notes.map((note)=>(
                alreadyHasNote.push(note.course._id)
              ))
            }
            {
              ClasseCourses.courses.map((course)=>(
                !alreadyHasNote.includes(course._id) &&  <Option key={course._id} value={course._id}> {course.title} </Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddNote