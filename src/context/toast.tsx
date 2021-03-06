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

        const lastToast: any = toasts[toasts.length - 1]

        if (lastToast) {
            switch (lastToast.type) {
                case 'info':
                    api.info({
                        message: lastToast.title,
                        description: lastToast.body,
                        placement: lastToast.position || 'topRight',
                    });
                    break;
                case 'success':
                    api.success({
                        message: lastToast.title,
                        description: lastToast.body,
                        placement: lastToast.position || 'topRight',
                    });
                    break;
                case 'error':
                    api.error({
                        message: lastToast.title,
                        description: lastToast.body,
                        placement: lastToast.position || 'topRight',
                    });
                    break;
                default:
                    break;
            }

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
