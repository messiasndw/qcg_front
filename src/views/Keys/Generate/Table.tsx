import { Table, Tag, Space, Button, Avatar, Tooltip, Modal } from 'antd';
import {
    DeleteOutlined,
    MessageOutlined,
    EditOutlined,
    UserOutlined,
    ExclamationCircleFilled
} from '@ant-design/icons';

const { Column } = Table;

const KeysTable = () => {

    const confirmDelete = (user: any) => {
        Modal.confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleFilled />,
            content: `${user.name} will be deleted`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => {
            }
        });
    }

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
    ];

    return (
        <Table dataSource={data} >
            
            <Column
                title="Department"
                key="name"
                render={(data) => (
                    <a onClick={() => { console.log(data.key) }} >{data.name}</a>
                )}
            />
            <Column
                title="Number"
                key="id"
                render={(data) => (
                    <Tag color='red' key={data.key}>
                        Idle
                    </Tag>
                )}
            />
            <Column
                title="Status"
                key="status"
                render={(data) => (
                    <Tag color='red' key={data.key}>
                        Idle
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

export default KeysTable