import { Form, Input, Button, Checkbox, Row, Col, Collapse, Cascader } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/Auth/actions';
import { ReduxState } from '../../redux/store';

const { Panel } = Collapse;

const Filter = () => {

    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        // dispatch(updateProfile(values))
        // console.log(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const activeOptions = [{ label: 'Active', value: 'true' }, { label: 'Idle', value: 'false' }]

    return (

        <Collapse  >
            <Panel header="Show/Hide Filter" key="filter">
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
                                label="Name"
                                name="name"
                            >
                                <Input placeholder='None' disabled={false} />
                            </Form.Item>
                        </Col>
                        <Col span='12'>
                            <Form.Item
                                label="Surename"
                                name="surename"
                            >
                                <Input placeholder='None' disabled={false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span='12'>
                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input placeholder='None' disabled={false} />
                            </Form.Item>
                        </Col>
                        <Col span='12'>
                            <Form.Item
                                label="Status"
                                name='active'
                            >
                                <Cascader placeholder='None' name='active' options={activeOptions} />
                            </Form.Item>
                        </Col>

                        <Col span='24'>
                            <Form.Item
                                wrapperCol={{ span: 1 }}>
                                <Button type="primary" htmlType="submit">
                                    Search
                                </Button>

                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Panel>
        </Collapse>
    )
}

export default Filter