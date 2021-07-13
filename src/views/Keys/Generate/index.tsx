import Filter from "./Filter";
import { Card, Row, Col, Button, Modal, Select, Form } from 'antd';
import KeysTable from "./Table";
import { Typography, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { storeKey } from "../../../redux/Keys/slice";
import { useEffect, useState } from "react";
import { useContext } from "react";
import WebSocketContext from "../../../context/websocket";
import { ReduxState } from "../../../redux/store";
import { toast } from "../../../redux/Ui/slice";

const { Text } = Typography;

const KeysGenerate = () => {

    const dispatch = useDispatch()
    const socket = useContext(WebSocketContext)
    const [form] = Form.useForm()
    const { company } = useSelector(({ Auth }: ReduxState) => Auth.me)

    useEffect(() => {
        socket.on(`${company.id}/keys/managment`, (data: any) => {
            dispatch(toast({ title: 'Info', body: data.message, type: 'info' }))
        })
    }, [])

    const onNewKey = () => {
        Modal.confirm({
            centered: true,
            title: 'Generate a New Key?',
            // icon: <ExclamationCircleFilled />,
            content:
                <>
                    <Text>Department</Text>
                    <Select
                        options={[{ label: 'Dep1', value: '123' }, { label: 'Dep2', value: '321' }]}
                        onChange={(value) => form.setFieldsValue({ department: value })}
                        placeholder='Select Department'
                        style={{ width: '100%' }}>
                    </Select>
                </>,
            okText: 'Generate',
            cancelText: 'Cancel',
            onOk: (e) => { dispatch(storeKey(form.getFieldValue('department'))) }
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
                <KeysTable />
            </div>

        </>
    )
}

export default KeysGenerate