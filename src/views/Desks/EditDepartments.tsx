
import React from 'react';

import {Modal, Transfer, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { fetchAllDepartments } from '../../redux/Departments/slice';
import { updateDeskDepartments } from '../../redux/Desks/actions';

type EditUsersProps = {
    isOpen: boolean,
    handleCloseModal: any,
    modal: {
        open: string,
        data: {
            id?: string
            departments?: []
        }
    }
}

const EditDepartments = ({ modal, isOpen, handleCloseModal }: EditUsersProps) => {

    const dispatch = useDispatch()

    const { isUpdating } = useSelector(({ Desks }: ReduxState) => Desks)
    const { all, isFetching } = useSelector(({ Departments }: ReduxState) => Departments)

    const departmentsList = all.map((data: any) => ({ key: data.id, title: data.name }))
    const [availableData, setAvailableData] = React.useState(departmentsList);
    const [currentData, setCurrentData] = React.useState([]);

    const onCancel = () => {
        handleCloseModal()
    }

    React.useEffect(() => {
        console.log(modal.data)
        if (modal.data.hasOwnProperty('id') && modal.open == 'editDepartments') {
            dispatch(fetchAllDepartments())
            setAvailableData(departmentsList)
            setCurrentData(modal.data.departments as [])
        }
    }, [modal.data]);

    // UPDATES THE AVAILABLE USERS EVERYTIME GET_ALL_USERS REQUEST IS DONE
    React.useEffect(() => {
        if (all != []) {
            setAvailableData(departmentsList)
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
                okButtonProps={{ disabled: isFetching || isUpdating }} title="Edit Departments"
                visible={isOpen}
                onOk={() => {
                    console.log(currentData)
                    dispatch(updateDeskDepartments({ id: modal.data.id, closeModal: onCancel, data: currentData }))
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

export default EditDepartments