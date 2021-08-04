import { Table, Tag, Space, Button, Avatar, Tooltip, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
    DeleteOutlined,
    MessageOutlined,
    EditOutlined,
    UserOutlined,
    IdcardOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import { ReduxState } from '../../redux/store';
import { deleteDesk, fetchDesks, updateFilter } from '../../redux/Desks/slice';
import moment from 'moment';

const { Column} = Table;

const DesksTable = (props : any) => {

    const {data, isFetching, total} = useSelector(({Desks}: ReduxState) => Desks)
    const {filter} = useSelector(({Desks}: ReduxState) => Desks)

    const dispatch =  useDispatch()

    const tableData = data.map((data: any,key) => {
        const {id, code, createdAt, users, active, company, departments} = data
        return (
            {key,id, code, createdAt ,active, company, users, departments}
        )
    })

    const confirmDelete = (desk: any) => {
        Modal.confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleFilled />,
            content: `${desk.code} will be deleted`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => {
                dispatch(deleteDesk(desk.id))
            }
        });
    }

    console.log(tableData)

    return (
        <Table dataSource={tableData} loading={isFetching} 
        pagination={{
            total: parseInt(total), 
            showSizeChanger: false,
            hideOnSinglePage: true,
            current:parseInt(filter.page),
            pageSize:10, 
            onChange: (page) => {
                dispatch(updateFilter({page: page}))
                dispatch(fetchDesks({}))
            } }} >
            <Column
                title="Number"
                key="code"
                render={(desk) => (
                    <a onClick={(e) => props.setModal({open: 'edit', data: desk})} >{desk.code}</a>
                )}
            />
            <Column
                title="Created At"
                key="createdAt"
                render={(desk) => (
                    <a onClick={(e) => props.setModal({open: 'edit', data: desk})} >{moment(desk.createdAt).format('MM/DD/YYYY')}</a>
                )}
            />
            <Column
                title="Status"
                key="active"
                render={(desk) => (
                    <Tag color={desk.active ? 'green' : 'red'} key={desk.key}>
                        {desk.active ? 'Active' : 'Idle'}
                    </Tag>
                )}
            />
            <Column
                align='center'
                title="Actions"
                key="action"
                render={(desk) => (
                    <Space size="middle">
                        <Tooltip title='Edit'><Button onClick={(e) => props.setModal({open: 'edit', data: desk})} type='primary'><EditOutlined /></Button></Tooltip>
                        <Tooltip title='Edit Users'><Button onClick={(e) => props.setModal({open: 'editUsers', data: desk})} type='primary'><UserOutlined /></Button></Tooltip>
                        <Tooltip title='Edit Departments'><Button onClick={(e) => props.setModal({open: 'editDepartments', data: desk})} type='primary'><IdcardOutlined /></Button></Tooltip>
                        <Tooltip title='Delete'><Button onClick={() => confirmDelete(desk)} type='primary' danger><DeleteOutlined /></Button></Tooltip>
                    </Space>
                )}
            />
        </Table>
    )

}

export default DesksTable