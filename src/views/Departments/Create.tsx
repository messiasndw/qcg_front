import React, { useState } from 'react';
import { Form, Input, Modal, Alert, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { storeDepartment } from '../../redux/Departments/actions';

type Create = {
    isOpen: boolean,
    handleCloseModal: any
}

type Form = {
    name: string,
    surename: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Create = (props: Create) => {

    const dispatch = useDispatch()
    const { company } = useSelector(({ Auth }: ReduxState) => Auth.me)
    const [form] = Form.useForm()

    const showModal = () => {
    };

    const onFinish = (formData: Form) => {
        const data = { ...formData, closeForm: onCancel }
        console.log(formData)
        dispatch(storeDepartment(data))
    };

    const onFinishFailed = () => {
    };

    const onCancel = () => {
        props.handleCloseModal()
        form.resetFields()
    }

    return (
        <>
            <Modal 
            cancelButtonProps={{ disabled: false }} 
            okButtonProps={{ disabled: false }} 
            title="New Department" visible={props.isOpen} 
            onOk={() => form.submit()} 
            onCancel={onCancel}>
                <Form
                    form={form}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    layout='vertical'
                    name="create"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{active: 1}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Alert style={{marginBottom: '25px'}} message="You will be able to link users and departments once the desk is created." type="info" />

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the department name!' }, { min: 3, message: '3 characters minimum!' }, { max: 11, message: 'Only 11 characters length!' }]}
                    >
                        <Input disabled={false} />
                    </Form.Item>

                    <Form.Item
                        label="Company Name"
                    >
                        <Input defaultValue={company.name} disabled={true} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default Create