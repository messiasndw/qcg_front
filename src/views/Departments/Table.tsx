import { Table, Tag, Space, Button, Tooltip, Modal, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
    DeleteOutlined,
    MessageOutlined,
    EditOutlined,
    DesktopOutlined,
    UserOutlined,
    IdcardOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import { ReduxState } from '../../redux/store';
import { deleteDepartment, fetchDepartments, updateFilter } from '../../redux/Departments/slice';

const { Column } = Table;

const DepartmentsTable = (props: any) => {

    const { data, isFetching, total, filter } = useSelector(({ Departments }: ReduxState) => Departments)

    const dispatch = useDispatch()

    const tableData = data.map((data: any, key) => {
        const { id, createdAt, name, desks, company } = data
        return (
            { key, id, name, createdAt, desks, company }
        )
    })

    const confirmDelete = (data: any) => {
        Modal.confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleFilled />,
            content: `${data.name} will be deleted`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => {
                dispatch(deleteDepartment(data.id))
            }
        });
    }

    return (
        <Table dataSource={tableData} loading={isFetching}
            pagination={{
                total: parseInt(total),
                showSizeChanger: false,
                hideOnSinglePage: true,
                current: parseInt(filter.page),
                pageSize: 10,
                onChange: (page) => {
                    dispatch(updateFilter({ page: page }))
                    dispatch(fetchDepartments({}))
                }
            }} >
            <Column
                title="Name"
                key="name"
                render={(desk) => (
                    <a onClick={(e) => props.setModal({ open: 'edit', data: desk })} >{desk.name}</a>
                )}
            />
            <Column
                title="Created At"
                key="createdAt"
                render={(desk) => (
                    <a onClick={(e) => props.setModal({ open: 'edit', data: desk })} >{moment(desk.createdAt).format('MM/DD/YYYY')}</a>
                )}
            />
            <Column
                title="Desks"
                align='center'
                render={(department) => (
                    <>{department.desks.length ? <Tag color="#87d068">{department.desks.length}</Tag> : <Tag color="#f50">0</Tag>}</>
                )}
            />
            <Column
                align='center'
                title="Actions"
                key="action"
                render={(data) => (
                    <Space size="middle">
                        <Tooltip title='Edit'><Button onClick={(e) => props.setModal({ open: 'edit', data: data })} type='primary'><EditOutlined /></Button></Tooltip>
                        <Tooltip title='Edit Desks'><Button onClick={() => props.setModal({ open: 'editDesks', data: data })} type='primary'><DesktopOutlined /></Button></Tooltip>
                        <Tooltip title='Delete'><Button onClick={() => confirmDelete(data)} type='primary' danger><DeleteOutlined /></Button></Tooltip>
                    </Space>
                )}
            />
        </Table>
    )

}

export default DepartmentsTable