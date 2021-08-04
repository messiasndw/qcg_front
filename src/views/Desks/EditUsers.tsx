
import React, { useState } from 'react';

import { Modal, Transfer, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { updateDeskUsers } from '../../redux/Desks/slice';
import { fetchAllUsers } from '../../redux/Users/actions';

type EditUsersProps = {
    isOpen: boolean,
    handleCloseModal: any,
    modal: {
        open: string,
        data: {
            id?: string
            users?: {}
        }
    }
}

const EditUsers = ({ modal, isOpen, handleCloseModal }: EditUsersProps) => {

    const dispatch = useDispatch()

    const { isUpdating } = useSelector(({ Desks }: ReduxState) => Desks)
    const { allUsers, isFetching } = useSelector(({ Users }: ReduxState) => Users)
    const usersList = allUsers.map((user: any) => ({ key: user.id, title: user.name }))

    const [availableUsers, setAvailableUsers] = React.useState(usersList);
    const [currentUsers, setCurrentUsers] = React.useState([]);
    const onCancel = () => {
        handleCloseModal()
    }

    React.useEffect(() => {
        if (modal.data.hasOwnProperty('id') && modal.open == 'editUsers') {
            dispatch(fetchAllUsers())
            setAvailableUsers(usersList)
            setCurrentUsers(modal.data.users as [])
        }
    }, [modal.data]);

    // UPDATES THE AVAILABLE USERS EVERYTIME GET_ALL_USERS REQUEST IS DONE
    React.useEffect(() => {
        if (allUsers != []) {
            setAvailableUsers(usersList)
        }

    }, [allUsers]);

    const onChange = (newTargetKeys: any, direction: any, moveKeys: any) => {
        setCurrentUsers(newTargetKeys);
    };

    return (
        <>
            <Modal
                destroyOnClose
                width={'700px'}
                // afterClose={() => { form.resetFields() }}
                cancelButtonProps={{ disabled: isFetching || isUpdating }}
                okButtonProps={{ disabled: isFetching || isUpdating }} title="Edit Users"
                visible={isOpen}
                onOk={() => {
                    dispatch(updateDeskUsers({ id: modal.data.id, closeModal: onCancel, users: currentUsers }))
                }}
                onCancel={onCancel}
            >
                <Row>
                    <>
                        <Col span={12} >
                            1 col-order-4
                        </Col>
                        <Col span={12} >
                            2 col-order-3
                        </Col>
                        <Col span={24}>
                            <Transfer
                                disabled={isUpdating || isFetching}
                                listStyle={{ width: '300px', height: '400px' }}
                                dataSource={availableUsers}
                                targetKeys={currentUsers}
                                onChange={onChange}
                                render={item => item.title}
                                oneWay={true}
                            />
                        </Col>
                    </>
                </Row>
            </Modal>
        </>
    )
}

export default EditUsers