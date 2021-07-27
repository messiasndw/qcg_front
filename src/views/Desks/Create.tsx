import React, { useState } from 'react';
import { Form, Input, Modal, Alert, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { storeUser } from '../../redux/Users/actions';
import { storeDesk } from '../../redux/Desks/actions';

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
        dispatch(storeDesk(data))
    };

    const onFinishFailed = () => {
    };

    const onCancel = () => {
        props.handleCloseModal()
        form.resetFields()
    }

    const activeOptions = [{ label: 'Active', value: 1 }, { label: 'Idle', value: 0 }]

    return (
        <>
            <Modal 
            cancelButtonProps={{ disabled: false }} 
            okButtonProps={{ disabled: false }} 
            title="New Desk" visible={props.isOpen} 
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
                        label="Code"
                        name="code"
                        rules={[{ required: true, message: 'Please input the desk code!' }, { min: 3, message: '3 characters minimum!' }, { max: 6, message: 'Only 6 characters length!' }]}
                    >
                        <Input disabled={false} />
                    </Form.Item>

                    <Form.Item
                        label="Company Name"
                    >
                        <Input defaultValue={company.name} disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name='active'
                    >
                        <Select
                            options={activeOptions}
                            defaultValue={form.getFieldValue('active')}
                            onChange={(value: string) => { form.setFieldsValue({ active: parseInt(value) }) }}>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Create