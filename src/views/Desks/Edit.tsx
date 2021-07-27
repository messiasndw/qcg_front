import { Form, Input, Modal, Switch} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { useEffect } from 'react';
import { updateDesk } from '../../redux/Desks/actions';

type EditModal = {
    isOpen: boolean,
    handleCloseModal: any,
    data: {
        id?: string,
        code?: string,
        active?: boolean,
        company?: {
            name: string
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
    const desk = props.data
    const [form] = Form.useForm()

    const {isUpdating} = useSelector(({Desks} : ReduxState) => Desks)
    useEffect(() => {
        if(props.data.hasOwnProperty('id')){
            form.setFieldsValue({ ...desk })
            console.log(desk)
        }
    }, [props.data])

    const onFinish = (formData: any) => {
        dispatch(updateDesk({id: desk.id, closeModal: onCancel, fields: formData}))
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
                destroyOnClose
                afterClose={() => { form.resetFields() }}
                cancelButtonProps={{ disabled: isUpdating }}
                okButtonProps={{ disabled: isUpdating }} title="Edit User"
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
                    initialValues={{...desk}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Code"
                        name="code"
                        rules={[{ required: true, message: 'Please input the desk code!' }, { min: 3, message: '3 characters minimum!' }, { max: 6, message: 'Only 6 characters length!' }]}
                    >
                        <Input defaultValue={desk.code} disabled={isUpdating} />
                    </Form.Item>

                    <Form.Item
                        label="Company Name"
                    >
                        <Input defaultValue={desk.company?.name} disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name='active'
                    >
                        <Switch disabled={isUpdating} defaultChecked={desk.active} onChange={(checked: boolean) => { form.setFieldsValue({ active: checked }) }}></Switch>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default Edit