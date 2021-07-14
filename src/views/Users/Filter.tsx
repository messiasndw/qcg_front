import { Form, Input, Button, Checkbox, Row, Col, Collapse, Select } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/Auth/actions';
import { ReduxState } from '../../redux/store';
import { fetchUsers } from '../../redux/Users/actions';
import { updateFilter } from '../../redux/Users/slice';

const { Panel } = Collapse;

type FilterForm = {
    name: string,
    surename: string,
    email: string,
    active: number
}

const Filter = () => {

    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const filter = useSelector(({Users}: ReduxState) => Users.filter)

    const onFinish = (values: FilterForm) => {
        console.log(values)
        dispatch(updateFilter(values))
        dispatch(fetchUsers({}))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        dispatch(fetchUsers({}))
    }, [])

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
                    initialValues={{ active: filter.active, name: filter.name, surename: filter.surename, email: filter.email }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row>
                        <Col span='12'>
                            <Form.Item
                                label="Name"
                                name="name"
                            >
                                <Input placeholder='None' type='search' disabled={false} />
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
                                <Select placeholder='None' onChange={(value: string) => {form.setFieldsValue({active:parseInt(value)})}} allowClear>
                                    <Select.Option value={'1'}>Active</Select.Option>
                                    <Select.Option value={'0'}>Idle</Select.Option>
                                </Select>
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