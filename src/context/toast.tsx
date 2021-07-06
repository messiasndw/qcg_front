import React from 'react'
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { ReduxState } from '../redux/store';
import { toast } from '../redux/Ui/slice'

const Context = React.createContext({});

export const ToastProvider = (props: any) => {

    const dispatch = useDispatch()

    const { toasts } = useSelector(({ Ui }: ReduxState) => Ui)
    const [api, contextHolder] = notification.useNotification();

    React.useEffect(() => {
        dispatch(toast(5))
    }, [])

    React.useEffect(() => {
        if (toasts.length != 0) {
            api.info({
                message: 'a',
                description: '2',
                // placement:'topLeft'
            });
        }
    }, [toasts])

    return (
        <Context.Provider value={{}}>
            {contextHolder}
            {props.children}
        </Context.Provider>
    );
};

export default Context
