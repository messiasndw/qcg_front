import { Form, Input, Button, Checkbox, Row, Col, Collapse, Select, DatePicker } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../../redux/store';
import moment from 'moment';
import { fetchDesks, updateFilter } from '../../redux/Desks/slice';

const { Panel } = Collapse;

type FilterForm = {
    code: string,
    active: string,
    createdAtInitial: string,
    createdAtEnd: string
}

const Filter = () => {

    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const filter = useSelector(({ Desks }: ReduxState) => Desks.filter)

    const initialValues = {
        createdAtInitial: filter.createdAtInitial ? moment(new Date(filter.createdAtInitial)) : '',
        createdAtEnd: filter.createdAtEnd ? moment(new Date(filter.createdAtEnd)) : '',
        code: filter.code,
        active: filter.active
    }

    const onFinish = (values: FilterForm) => {
        values.createdAtInitial = values.createdAtInitial ? moment(values.createdAtInitial).format('MM-DD-YYYY') : ''
        values.createdAtEnd = values.createdAtEnd ? moment(values.createdAtEnd).format('MM-DD-YYYY') : ''
        dispatch(updateFilter({ ...values, page: '1' }))
        dispatch(fetchDesks({}))
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    const dateValidation = ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
            if ((!(new Date(value) > new Date(getFieldValue('createdAtEnd')))) || (getFieldValue('createdAtEnd') == null)) {
                return Promise.resolve();
            }
            console.log(getFieldValue('createdAtEnd'))
            return Promise.reject(new Error('Initial date cannot be greater than end date!'));
        },
    })

    const activeOptions = [{ label: 'Active', value: '1' }, { label: 'Idle', value: '0' }]
    return (

        <Collapse >
            <Panel showArrow={false} header="Filter" key="filter">
                <Form
                    style={{ padding: '20px' }}
                    form={form}
                    layout='vertical'
                    name='filter'
                    wrapperCol={{ span: 20 }}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row>
                        <Col span='12'>
                            <Form.Item
                                label="Code"
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
                                    onChange={(value: string) => { form.setFieldsValue({ active: value }) }} allowClear>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span='6'>
                            <Form.Item
                                label="Created At"
                                name='createdAtInitial'
                                dependencies={['createdAtEnd']}
                                rules={[dateValidation]}
                            >
                                <DatePicker format='MM/DD/YYYY' placeholder='Initial Date' style={{ display: 'flex' }} allowClear />
                            </Form.Item>
                        </Col>
                        <Col span='6'>
                            <Form.Item
                                label="Created At"
                                name='createdAtEnd'
                                dependencies={['createdAtInitial']}
                                rules={[dateValidation]}
                            >
                                <DatePicker format='MM/DD/YYYY' placeholder='End Date' style={{ display: 'flex' }} allowClear />
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