import React, { useState } from 'react';
import { Form, Input, Modal, Alert, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../redux/store';
import { useEffect } from 'react';
import { fetchAllDepartments } from '../../../redux/Departments/actions';
import { storeKey } from '../../../redux/Keys/slice';

type Create = {
    isOpen: boolean,
    handleCloseModal: any
}


const Create = (props: Create) => {

    const dispatch = useDispatch()
    const { isStoring } = useSelector(({ Keys }: ReduxState) => Keys)
    const { all, isFetching } = useSelector(({ Departments }: ReduxState) => Departments)
    const [form] = Form.useForm()

    const options = all.map((department: any) => ({label: department.name, value: department.id}))

    useEffect(() => {
        if(props.isOpen){
            dispatch(fetchAllDepartments())
        }
    }, [props.isOpen])

    const showModal = () => {
    };

    const onFinish = (formData: any) => {
        dispatch(storeKey(formData.department))
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
            title="New Key" visible={props.isOpen} 
            onOk={() => form.submit()}
            onCancel={onCancel}>
                <Form
                    form={form}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    layout='vertical'
                    name="create"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {/* <Alert style={{marginBottom: '25px'}} message="You will be able to link users and departments once the desk is created." type="info" /> */}

                    <Form.Item
                        label="Department"
                        name="department"
                    >
                        <Select disabled={isStoring || isFetching} loading={isFetching || isStoring} placeholder='Select Department'  options={options} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default Create