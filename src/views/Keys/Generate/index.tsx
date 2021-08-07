import Filter from "./Filter";
import {Row, Col, Button, Modal, Select, Form } from 'antd';
import KeysTable from "./Table";
import { Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useContext } from "react";
import WebSocketContext from "../../../context/websocket";
import { ReduxState } from "../../../redux/store";
import { toast } from "../../../redux/Ui/slice";
import Create from './Create'

const { Text } = Typography;

const KeysGenerate = () => {

    const dispatch = useDispatch()
    const socket = useContext(WebSocketContext)
    const [form] = Form.useForm()
    const { company, desks } = useSelector(({ Auth }: ReduxState) => Auth.me)
    const { all } = useSelector(({ Departments }: ReduxState) => Departments)
    const [createModal, setCreateModal] = useState({open: false})

    useEffect(() => {
        

    }, [])

    const handleCloseModal = () => {
        setCreateModal((prevState) => ({...prevState, open: false}))
    }

    return (
        <>
            <Row style={{}}>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }} span='24'>
                    <Button onClick={() => {setCreateModal((prevState) => ({...prevState, open: true}) )}} type='primary'>New Key</Button>
                    <Create handleCloseModal={handleCloseModal} isOpen={createModal.open}></Create>
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