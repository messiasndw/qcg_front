import { Form, Input, Button, Checkbox } from 'antd';
import { register, RegisterType } from '../../redux/Auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';

const Register = () => {

    const dispatch = useDispatch()
    const { isRegistering } = useSelector((state: ReduxState) => state.Auth)

    const onFinish = (form: RegisterType) => {
        dispatch(register(form))
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

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }, { min: 5, message: 'Name must be valid!' }]}
                >
                    <Input disabled={isRegistering} />
                </Form.Item>

                <Form.Item
                    label="Company Name"
                    name="companyName"
                    rules={[{ required: true, message: 'Please input your company name!' }, { min: 5, message: 'Company name must be valid!' }]}
                >
                    <Input disabled={isRegistering} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Email must be valid!' }]}
                >
                    <Input disabled={isRegistering} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    dependencies={['confirmPassword']}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password disabled={isRegistering} />
                </Form.Item>

                <Form.Item
                    dependencies={['password']}
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please confirm your password!' }, passwordValidation]}
                >
                    <Input.Password disabled={isRegistering} />
                </Form.Item>

                <Form.Item
                    name="logIn"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox disabled={isRegistering}>Log in after registration is complete.</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16 }}>
                    <Button disabled={isRegistering} type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
};

export default Register
