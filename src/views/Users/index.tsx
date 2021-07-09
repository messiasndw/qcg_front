import React from "react";
import Filter from "./Filter";
import { Card, Row, Col, Button } from 'antd';
import UsersTable from "./Table";

const Users = () => {
    return (
        <>
            <Row style={{}}>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }} span='24'>
                    <Button type='primary'>New User</Button>
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