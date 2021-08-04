import React, {useState} from "react";
import Filter from "./Filter";
import { Row, Col, Button } from 'antd';
import Table from "./Table";
import CreateModal from "./Create";
import { useEffect } from "react";
import EditModal from "./Edit";
import EditUsers from './EditUsers'
import EditDepartments from "./EditDepartments";
import { useDispatch } from "react-redux";
import { fetchDesks } from "../../redux/Desks/slice";
const Users = () => {

    const [modal,setModal] = useState({open: '', data: {}})
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchDesks({}))
    },[])

    const handleCloseModal = () => {
        setModal(prevState => {
            return {open: '', data: {}}
        })
    }

    return (
        <>
            <Row style={{}}>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }} span='24'>
                    {/* NEW USER */}
                    <Button onClick={() => {setModal(prevState => ({...prevState, open: 'create'}))}} type='primary'>New Desk</Button>
                    <CreateModal handleCloseModal={handleCloseModal} isOpen={modal.open == 'create'}></CreateModal>
                    <EditUsers isOpen={modal.open == 'editUsers'} handleCloseModal={handleCloseModal} modal={modal} />
                    <EditDepartments isOpen={modal.open == 'editDepartments'} handleCloseModal={handleCloseModal} modal={modal}></EditDepartments>
                    <EditModal isOpen={modal.open == 'edit'} handleCloseModal={handleCloseModal} data={modal.data}></EditModal>
                </Col>

                <Col span='24'>
                    <Filter></Filter>
                </Col>
            </Row>


            <div style={{ marginTop: '24px' }}>
                <Table setModal={setModal} />
            </div>

        </>
    )
}

export default Users