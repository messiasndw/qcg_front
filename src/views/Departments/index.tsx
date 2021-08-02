import React, {useState} from "react";
import Filter from "./Filter";
import { Row, Col, Button } from 'antd';
import Table from "./Table";
import CreateModal from "./Create";
import { useEffect } from "react";
import EditModal from "./Edit";
import EditDesksModal from './EditDesks'
import { useDispatch } from "react-redux";
import { fetchDepartments } from "../../redux/Departments/slice";
const Departments = () => {

    const [modal,setModal] = useState({open: '', data: {}})
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchDepartments({}))
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
                    <Button onClick={() => {setModal(prevState => ({...prevState, open: 'create'}))}} type='primary'>New Department</Button>
                    <CreateModal handleCloseModal={handleCloseModal} isOpen={modal.open == 'create'}></CreateModal>
                    <EditModal isOpen={modal.open == 'edit'} handleCloseModal={handleCloseModal} data={modal.data}></EditModal>
                    <EditDesksModal isOpen={modal.open == 'editDesks'} handleCloseModal={handleCloseModal} modal={modal}></EditDesksModal>
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

export default Departments