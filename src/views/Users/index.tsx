import React, {useState} from "react";
import Filter from "./Filter";
import { Row, Col, Button } from 'antd';
import UsersTable from "./Table";
import CreateModal from "./Create";
import { useEffect } from "react";

const Users = () => {

    const [modal,setModal] = useState({open: false, data: {}})

    const handleCloseModal = () => {
        setModal(prevState => {
            return {open: false, data: {}}
        })
    }

    return (
        <>
            <Row style={{}}>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }} span='24'>
                    {/* NEW USER */}
                    <Button onClick={() => {setModal(prevState => ({...prevState, open: true}))}} type='primary'>New User</Button>
                    <CreateModal handleCloseModal={handleCloseModal} isOpen={modal.open}></CreateModal>

                </Col>

                <Col span='24'>
                    <Filter></Filter>
                </Col>
            </Row>


            <div style={{ marginTop: '24px' }}>
                <UsersTable />
            </div>

        </>
    )
}

export default Users