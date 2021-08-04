
import React, { useState } from 'react';

import { Form, Input, Modal, Alert, Switch, Transfer, Row, Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { fetchAllDesks} from '../../redux/Desks/slice';
import { fetchAllUsers } from '../../redux/Users/actions';
import { Console } from 'console';
import { updateDepartmentDesks } from '../../redux/Departments/actions';

type EditUsersProps = {
    isOpen: boolean,
    handleCloseModal: any,
    modal: {
        open: string,
        data: {
            id?: string
            desks?: []
        }
    }
}

const EditDesks = ({ modal, isOpen, handleCloseModal }: EditUsersProps) => {

    const dispatch = useDispatch()

    const { isUpdating } = useSelector(({ Departments }: ReduxState) => Departments)
    const { all, isFetching } = useSelector(({ Desks }: ReduxState) => Desks)

    const deskList = all.map((data: any) => ({ key: data.id, title: data.code }))
    const [availableData, setAvailableData] = React.useState(deskList);
    const [currentData, setCurrentData] = React.useState([]);
    const onCancel = () => {
        handleCloseModal()
    }

    React.useEffect(() => {
        if (modal.data.hasOwnProperty('id') && modal.open == 'editDesks') {
            dispatch(fetchAllDesks())
            setAvailableData(deskList)
            setCurrentData(modal.data.desks as [])
        }
    }, [modal.data]);

    // UPDATES THE AVAILABLE USERS EVERYTIME GET_ALL_USERS REQUEST IS DONE
    React.useEffect(() => {
        if (all != []) {
            setAvailableData(deskList)
        }
    }, [all]);

    const onChange = (newTargetKeys: any, direction: any, moveKeys: any) => {
        setCurrentData(newTargetKeys);
    };

    return (
        <>
            <Modal
                destroyOnClose
                width={'700px'}
                // afterClose={() => { form.resetFields() }}
                cancelButtonProps={{ disabled: isFetching || isUpdating }}
                okButtonProps={{ disabled: isFetching || isUpdating }} title="Edit Desks"
                visible={isOpen}
                onOk={() => {
                    console.log(currentData)
                    dispatch(updateDepartmentDesks({ id: modal.data.id, closeModal: onCancel, data: currentData }))
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
                                dataSource={availableData}
                                targetKeys={currentData}
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

export default EditDesks