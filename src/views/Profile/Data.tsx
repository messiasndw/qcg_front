import { Form, Input, Button, Checkbox, Row, Col, Switch } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { updateProfile } from '../../redux/Auth/actions';
import { ReduxState} from '../../redux/store';


const Data = () => {

    const dispatch = useDispatch()
    const isUpdatingProfile = useSelector((state: ReduxState) => state.Auth.isUpdatingProfile)
    const user = useSelector((state: ReduxState) => state.Auth.me)
    const company = useSelector((state: ReduxState) => state.Auth.me.company)

    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        dispatch(updateProfile(values))
        // console.log(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const passwordValidation = ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },
    })

    const [changePassword, setChangePassword] = useState(false)

    return (
        <Form
            style={{ padding: '20px' }}
            form={form}
            layout='vertical'
            name='basic'
            // labelCol={{ span: 14 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Row>
                <Col span='12'>
                    <Form.Item
                        initialValue={user.name}
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input disabled={isUpdatingProfile} />
                    </Form.Item>
                </Col>
                <Col span='12'>
                    <Form.Item
                        initialValue={user.surename}
                        label="Surename"
                        name="surename"
                        rules={[{ required: true, message: 'Please input your surename!' }]}
                    >
                        <Input disabled={isUpdatingProfile} />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span='12'>
                    <Form.Item
                        initialValue={user.email}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Email must be valid!' }]}
                    >
                        <Input disabled={isUpdatingProfile} />
                    </Form.Item>
                </Col>

                <Col span='12'>
                    <Form.Item
                        label="Company Name"
                    >
                        <Input disabled defaultValue={company.name} />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col flex='none' span='12'>
                    <Form.Item
                        label='Change Password'
                    >
                        <Switch disabled={isUpdatingProfile} onChange={() => {
                            setChangePassword((prevState) => !prevState)
                        }} />

                    </Form.Item>
                </Col>
            </Row>

            {changePassword &&
                <Row>
                    <Col span='12'>
                        <Form.Item
                            label="Password"
                            name="password"
                            dependencies={['confirmPassword']}
                            rules={[{ required: true, message: 'Please input your username!' }, passwordValidation]}
                        >
                            <Input.Password disabled={isUpdatingProfile} />
                        </Form.Item>
                    </Col>
                    <Col span='12'>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[{ required: true, message: 'Please confirm your password!', }, passwordValidation]}
                        >
                            <Input.Password disabled={isUpdatingProfile} />
                        </Form.Item>
                    </Col>
                </Row>
            }

            <Row>
                <Col span='12'></Col>
                <Col flex='none' span='12'>
                    <Form.Item>
                        <Button disabled={isUpdatingProfile} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )
}

export default Data
