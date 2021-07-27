import React, { useState } from 'react';
import { Form, Input, Modal, Alert, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { useEffect } from 'react';
import { updateUser } from '../../redux/Users/actions';

type EditModal = {
    isOpen: boolean,
    handleCloseModal: any,
    data: {
        id?: string,
        name?: string,
        surename?: string,
        email?: string,
        company?: {
            name?: string
        }
    }
}

export type EditUserFormType = {
    name?: string,
    surename?: string,
    email?: string,
    confirmPassword?: string
}

const Edit = (props: EditModal) => {

    const dispatch = useDispatch()
    const user = props.data
    const [form] = Form.useForm()

    const [changePassword, setChangePassword] = useState(false)

    useEffect(() => {
        form.setFieldsValue({ ...user })
    }, [props.data])

    const onFinish = (formData: any) => {
        const data = { fields: formData, closeModal: onCancel, id: user.id }
        dispatch(updateUser(data))
    };

    const onFinishFailed = ({values}: any) => {
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
            <Modal
                afterClose={() => { form.resetFields() }}
                cancelButtonProps={{ disabled: false }}
                okButtonProps={{ disabled: false }} title="Edit User" 
                visible={props.isOpen} 
                onOk={() => form.submit()}
                onCancel={onCancel}>
                <Form
                    form={form}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    layout='vertical'
                    name="edit"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    // initialValues={{...user}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the user name!' }, { min: 5, message: 'Name must be valid!' }]}
                    >
                        <Input defaultValue={user.name} disabled={false} />
                    </Form.Item>

                    <Form.Item
                        label="Surename"
                        name="surename"
                        rules={[{ required: true, message: 'Please input the user surename!' }, { min: 5, message: 'Surename must be valid!' }]}
                    >
                        <Input defaultValue={user.surename} disabled={false} />
                    </Form.Item>

                    <Form.Item
                        label="Company Name"
                    >
                        <Input defaultValue={user.company?.name} disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Email must be valid!' }]}
                    >
                        <Input defaultValue={user.email} disabled={false} />
                    </Form.Item>

                    <Form.Item
                        label='Change Password'
                    >
                        <Switch onChange={() => {
                            setChangePassword((prevState) => !prevState)
                        }} />

                    </Form.Item>

                    {changePassword &&
                        <>
                            <Form.Item
                                label="New Password"
                                name="password"
                                dependencies={['confirmPassword']}
                                rules={[{ required: true, message: 'Please input your username!' }, passwordValidation]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Confirm New Password"
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[{ required: true, message: 'Please confirm your password!', }, passwordValidation]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </>
                    }

                </Form>
            </Modal>
        </>
    );
};

export default Edit