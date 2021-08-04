import { Table, Tag, Space, Button, Avatar, Tooltip, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
    DeleteOutlined,
    EditOutlined,
    DesktopOutlined,
    UserOutlined,
    ExclamationCircleFilled
} from '@ant-design/icons';
import { ReduxState } from '../../redux/store';
import { fetchUsers, updateFilter } from '../../redux/Users/slice';
import { deleteUser } from '../../redux/Users/actions';

const { Column} = Table;

const UsersTable = (props : any) => {

    const {users, isFetching, total} = useSelector(({Users}: ReduxState) => Users)
    const {filter} = useSelector(({Users}: ReduxState) => Users)

    const dispatch =  useDispatch()

    const data = users.map((data: any,key) => {
        const {id, name, surename, email, active, company, desks} = data
        return (
            {key,id, name, surename, email,active, company, desks}
        )
    })

    const confirmDelete = (user: any) => {
        Modal.confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleFilled />,
            content: `${user.name} will be deleted`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => {
                dispatch(deleteUser(user.id))
            }
        });
    }

    return (
        <Table dataSource={data} loading={isFetching} 
        pagination={{
            total: parseInt(total), 
            showSizeChanger: false,
            hideOnSinglePage: true,
            current:parseInt(filter.page),
            pageSize:10, 
            onChange: (page) => {
                dispatch(updateFilter({page: page}))
                dispatch(fetchUsers({}))
            } }} >
            <Column
                title="Picture"
                key="picture"
                render={(data) => (
                    <Avatar src={data.photo || ''} size={46} icon={<UserOutlined />} />
                )}
            />
            <Column
                title="Name"
                key="name"
                render={(user) => (
                    <a onClick={(e) => props.setModal({open: 'edit', data: user})} >{user.name}</a>
                )}
            />
            <Column
                title="Surename"
                key="surename"
                render={(user) => (
                    <a onClick={(e) => props.setModal({open: 'edit', data: user})} >{user.surename}</a>
                )}
            />
            <Column
                title="Email"
                key="email"
                render={(user) => (
                    <a onClick={(e) => props.setModal({open: 'edit', data: user})} >{user.email}</a>
                )}
            />
            <Column
                title="Status"
                key="active"
                render={(data) => (
                    <Tag color={data.active ? 'green' : 'red'} key={data.key}>
                        {data.active ? 'Active' : 'Idle'}
                    </Tag>
                )}
            />
            <Column
                align='center'
                title="Actions"
                key="action"
                render={(user) => (
                    <Space size="middle">
                        <Tooltip title='Edit'><Button onClick={(e) => props.setModal({open: 'edit', data: user})} type='primary'><EditOutlined /></Button></Tooltip>
                        <Tooltip title='Edit Desks'><Button onClick={(e) => props.setModal({open: 'editDesks', data: user})} type='primary'><DesktopOutlined /></Button></Tooltip>
                        <Tooltip title='Delete'><Button onClick={() => confirmDelete(user)} type='primary' danger><DeleteOutlined /></Button></Tooltip>
                    </Space>
                )}
            />
        </Table>
    )

}

export default UsersTable