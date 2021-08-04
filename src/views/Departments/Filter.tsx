import { Form, Input, Button, Row, Col, Collapse, Select, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { fetchDepartments, updateFilter } from '../../redux/Departments/slice';
import moment from 'moment';

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

    const { filter } = useSelector(({ Departments }: ReduxState) => Departments)

    const initialValues = {
        name: filter.name,
        createdAtInitial: filter.createdAtInitial ? moment(new Date(filter.createdAtInitial)) : '',
        createdAtEnd: filter.createdAtEnd ? moment(new Date(filter.createdAtEnd)) : ''
    }

    const onFinish = (values: any) => {
        values.createdAtInitial = values.createdAtInitial ? moment(values.createdAtInitial).format('MM-DD-YYYY') : ''
        values.createdAtEnd = values.createdAtEnd ? moment(values.createdAtEnd).format('MM-DD-YYYY') : ''
        dispatch(updateFilter({ ...values, page: '1' }))
        dispatch(fetchDepartments({}))
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    const dateValidation = ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
            if ((!(new Date(value) > new Date(getFieldValue('createdAtEnd')))) || (getFieldValue('createdAtEnd') == null)) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Initial date cannot be greater than end date!'));
        },
    })

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
                                label="Name"
                                name="name"
                            >
                                <Input allowClear placeholder='None' disabled={false} />
                            </Form.Item>
                        </Col>
                        <Col span='6'>
                            <Form.Item
                                label="Created At"
                                name='createdAtInitial'
                                dependencies={['createdAtEnd']}
                                rules={[dateValidation]}
                            >
                                <DatePicker format='MM/DD/YYYY' placeholder='Initial Date' style={{ display: 'flex' }} />
                            </Form.Item>
                        </Col>
                        <Col span='6'>
                            <Form.Item
                                dependencies={['createdAtInitial']}
                                label="Created At"
                                name='createdAtEnd'
                            >
                                <DatePicker format='MM/DD/YYYY' placeholder='End date' style={{ display: 'flex' }} />
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