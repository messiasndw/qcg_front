import { Form, Input, Button, Checkbox, Row, Col, Collapse, Select } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/Auth/actions';
import { ReduxState } from '../../redux/store';
import { fetchDesks, updateFilter } from '../../redux/Desks/slice';

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

    const filter = useSelector(({ Desks }: ReduxState) => Desks.filter)

    const onFinish = (values: FilterForm) => {
        console.log(values)
        dispatch(updateFilter({ ...values, page: '1' }))
        dispatch(fetchDesks({}))
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    useEffect(() => {
    }, [])

    const activeOptions = [{ label: 'Active', value: 1 }, { label: 'Idle', value: 0 }]
    return (

        <Collapse >
            <Panel showArrow={false} header="Show/Hide Filter" key="filter">
                <Form
                    style={{ padding: '20px' }}
                    form={form}
                    layout='vertical'
                    name='filter'
                    wrapperCol={{ span: 20 }}
                    initialValues={{ active: filter.active, code: filter.code }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row>
                        <Col span='12'>
                            <Form.Item
                                label="Number"
                                name="code"
                            >
                                <Input allowClear placeholder='None'disabled={false} />
                            </Form.Item>
                        </Col>
                        <Col span='12'>
                            <Form.Item
                                label="Status"
                                name='active'
                            >
                                <Select
                                    options={activeOptions}
                                    onClear={() => { form.setFieldsValue({ active: null }) }}
                                    placeholder='None'
                                    onChange={(value: string) => { form.setFieldsValue({ active: parseInt(value) }) }} allowClear>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
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