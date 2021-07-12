import { Form, Input, Button, Checkbox } from 'antd';
import { login } from '../../redux/Auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { useEffect } from 'react';

const Login = () => {

    const dispatch = useDispatch()
    const {isAuthenticating} = useSelector((state: ReduxState) => state.Auth)
    
    const onFinish = ({email,password}:{email: string, password: string}) => {
        dispatch(login({email,password}))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        console.log("login")
    },[])

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!'}, {type: 'email', message: 'Email must be valid!'}]}
                >
                    <Input disabled={isAuthenticating} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password disabled={isAuthenticating} />
                </Form.Item>

                {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item
                    wrapperCol={{offset: 8, span: 16}}>
                    <Button disabled={isAuthenticating} type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
};

export default Login
