import { Form, Input, Button, Checkbox, Row, Col, Collapse, Cascader, DatePicker, Select } from 'antd';
import { useEffect } from 'react';

const { Panel } = Collapse;

const Filter = () => {

    const [form] = Form.useForm()

    const onFinish = (values: any) => {
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    const options = [{ value: 'gold', label: 'Department 1' }, { value: 'lime', label: 'Department 2' }]

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
                                label="Department"
                                name="departments"
                                initialValue={[]}
                            >
                                <Select
                                    mode="multiple"
                                    showArrow
                                    style={{ width: '100%' }}
                                    options={options}
                                />
                            </Form.Item>
                        </Col>
                        <Col span='6'>
                            <Form.Item
                                label="Start Date"
                                name='startDate'
                            >
                                <DatePicker style={{ display: 'flex' }} />
                            </Form.Item>
                        </Col>
                        <Col span='6'>
                            <Form.Item
                                // wrapperCol={{span: 16}}
                                label="End Date"
                                name='endDate'
                            >
                                <DatePicker style={{ display: 'flex' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col span='12'>
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
                                wrapperCol={{span: 22}}
                            >
                                <Cascader placeholder='None' name='active' options={activeOptions} />
                            </Form.Item>
                        </Col> */}

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