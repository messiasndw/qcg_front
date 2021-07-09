import React from "react";
import Filter from "./Filter";
import { Card, Row, Col, Button, Modal, Select } from 'antd';
// import UsersTable from "./Table";
import { Typography, Space } from 'antd';
import Title from "antd/lib/typography/Title";

const { Text, Link } = Typography;

const KeysGenerate = () => {

    const onNewKeyGenerate = (e: any) => {
        console.log(e)
    }

    const onNewKey = () => {
        Modal.confirm({
            centered: true,
            title: 'Generate a New Key?',
            // icon: <ExclamationCircleFilled />,
            content: <>
            {/* <Text>Select</Text> */}
            <Select placeholder='Select Department' style={{ width: '100%' }}></Select>
            </>,
            okText: 'Generate',
            cancelText: 'Cancel',
            onOk: (e) => {console.log(e)}
        });
    }

    return (
        <>
            <Row style={{}}>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }} span='24'>
                    <Button onClick={onNewKey} type='primary'>New Key</Button>
                </Col>

                <Col span='24'>
                    <Filter></Filter>
                </Col>
            </Row>


            <div style={{ marginTop: '24px' }}>
                {/* <UsersTable /> */}
            </div>

        </>
    )
}

export default KeysGenerate