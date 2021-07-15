import React, { useState } from 'react';
import { Form, Input, Modal, Alert  } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { storeUser } from '../../redux/Users/actions';

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
    const {company} = useSelector(({Auth}: ReduxState) => Auth.me)
    const [form] = Form.useForm()
    const showModal = () => {
    };

    const onFinish = (formData: Form) => {
        const data = {...formData, closeForm: onCancel}
        dispatch(storeUser(data))
    };

    const onFinishFailed = () => {
    };

    const onCancel = () => {
        props.handleCloseModal()
        form.resetFields()
    }

    const passwordValidation = ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },
    })

    return (
        <>
            <Modal cancelButtonProps={{disabled: false}} okButtonProps={{disabled: false}} title="New User" visible={props.isOpen} onOk={() => form.submit()} onCancel={onCancel}>
                <Form
                    form={form}
                    style={{display:'flex', flexDirection:'column'}}
                    layout='vertical'
                    name="create"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Alert style={{marginBottom: '25px'}} message="You can upload and change the photo once the new user is created." type="info" />

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the user name!' }, { min: 5, message: 'Name must be valid!' }]}
                    >
                        <Input disabled={false} />
                    </Form.Item>

                    <Form.Item
                        label="Surename"
                        name="surename"
                        rules={[{ required: true, message: 'Please input the user surename!' }, { min: 5, message: 'Surename must be valid!' }]}
                    >
                        <Input disabled={false} />
                    </Form.Item>

                    <Form.Item
                        label="Company Name"
                    >
                        <Input defaultValue={company.name} disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Email must be valid!' }]}
                    >
                        <Input disabled={false} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        dependencies={['confirmPassword']}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password disabled={false} />
                    </Form.Item>

                    <Form.Item
                        dependencies={['password']}
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please confirm your password!' }, passwordValidation]}
                    >
                        <Input.Password disabled={false} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default Create