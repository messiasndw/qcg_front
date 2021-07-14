import { Table, Tag, Space, Button, Avatar, Tooltip, Modal } from 'antd';
import { useSelector } from 'react-redux';

import {
    DeleteOutlined,
    MessageOutlined,
    EditOutlined,
    UserOutlined,
    ExclamationCircleFilled
} from '@ant-design/icons';
import { ReduxState } from '../../redux/store';

const { Column, ColumnGroup } = Table;

const UsersTable = () => {

    const {users, isFetching} = useSelector(({Users}: ReduxState) => Users)

    const data = users.map((data: any,key) => {
        const {_id, name, surename, email, active} = data
        return (
            {key,_id, name, surename, email,active}
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
                console.log(user.key)
            }
        });
    }

    return (
        <Table dataSource={data} loading={isFetching} >
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
                render={(data) => (
                    <a onClick={() => { console.log(data.key) }} >{data.name}</a>
                )}
            />
            <Column
                title="Surename"
                key="surename"
                render={(data) => (
                    <a onClick={() => { console.log(data.key) }} >{data.surename}</a>
                )}
            />
            <Column
                title="Email"
                key="email"
                render={(data) => (
                    <a onClick={() => { console.log(data.key) }} >{data.email}</a>
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
                        <Tooltip title='Edit'><Button type='primary'><EditOutlined /></Button></Tooltip>
                        <Tooltip title='Notify'><Button type='primary'><MessageOutlined /></Button></Tooltip>
                        <Tooltip title='Delete'><Button onClick={() => confirmDelete(user)} type='primary' danger><DeleteOutlined /></Button></Tooltip>
                    </Space>
                )}
            />
        </Table>
    )

}

export default UsersTable