import React, {useState} from "react";
import Filter from "./Filter";
import { Row, Col, Button } from 'antd';
import UsersTable from "./Table";
import CreateModal from "./Create";
import { useEffect } from "react";
import EditModal from "./Edit";
import EditDesks from "./EditDesks";

const Users = () => {

    const [modal,setModal] = useState({open: '', data: {}})

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
                    <Button onClick={() => {setModal(prevState => ({...prevState, open: 'create'}))}} type='primary'>New User</Button>
                    <CreateModal handleCloseModal={handleCloseModal} isOpen={modal.open == 'create'}></CreateModal>
                    <EditModal isOpen={modal.open == 'edit'} handleCloseModal={handleCloseModal} data={modal.data}></EditModal>
                    <EditDesks isOpen={modal.open == 'editDesks'} handleCloseModal={handleCloseModal} modal={modal}></EditDesks>
                </Col>

                <Col span='24'>
                    <Filter></Filter>
                </Col>
            </Row>


            <div style={{ marginTop: '24px' }}>
                <UsersTable setModal={setModal} />
            </div>

        </>
    )
}

export default Users