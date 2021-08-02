import { Form, Input, Modal, Switch} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { useEffect } from 'react';
import { updateDesk } from '../../redux/Desks/actions';
import { updateDepartment } from '../../redux/Departments/actions';

type EditModal = {
    isOpen: boolean,
    handleCloseModal: any,
    data: {
        id?: string,
        name?: string,
        company?: {
            name: string
        }
    }
}

export type EditDepartmentFormType = {
    name?: string,
}

const Edit = (props: EditModal) => {
    const dispatch = useDispatch()
    const department = props.data
    const [form] = Form.useForm()
    const {isUpdating} = useSelector(({Departments} : ReduxState) => Departments)

    useEffect(() => {
        if(props.data.hasOwnProperty('id')){
        }
    }, [props.data])

    const onFinish = (formData: EditDepartmentFormType) => {
        console.log(formData)
        dispatch(updateDepartment({id: department.id, closeModal: onCancel, fields: formData}))
    };

    const onFinishFailed = ({ values }: any) => {
    };

    const onCancel = () => {
        props.handleCloseModal()
        form.resetFields()
    }

    return (
        <>
            <Modal
                key='departmentsEditModal'
                destroyOnClose
                afterClose={() => { form.resetFields() }}
                cancelButtonProps={{ disabled: isUpdating }}
                okButtonProps={{ disabled: isUpdating }}
                title="Edit Department"
                visible={props.isOpen}
                onOk={() => form.submit()}
                onCancel={onCancel}
                >
                <Form
                    key='editDepartments'
                    form={form}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    layout='vertical'
                    name="edit"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{name:department.name}}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the department name!' }, { min: 3, message: '3 characters minimum!' }, { max: 11, message: 'Only 11 characters length!' }]}
                    >
                        <Input disabled={isUpdating} />
                    </Form.Item>

                    <Form.Item
                        label="Company Name"
                    >
                        <Input defaultValue={department.company?.name} disabled={true} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Edit