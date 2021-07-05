import React, { FC, useState } from "react";
import { Alert } from 'antd';
import { FaKey } from 'react-icons/fa'
import './index.css'
import { Typography } from 'antd';
import { Result, Button } from 'antd';

const { Title } = Typography;

const CurrentKey: FC = () => {

    const [key, setKey] = useState({ _id: "NDW613" })


    React.useEffect(() => {
        console.log("montou")
        const sseConnection = new EventSource("http://localhost:8000/keys/sse")
        sseConnection.onmessage = ({ data }) => {
            let x = JSON.parse(data)
            console.log(x)
            setKey({ _id: x._id })
        }
        
        return () => {
            sseConnection.close()
        }

    }, [])

    return (
        <>
            <div className='current-key-main'>
                <Result
                    className='current-key-text'
                    icon={<FaKey />}
                    status="success"
                    // title="CURRENT KEY"
                    subTitle={key._id}
                    extra={[
                        '2 HOURS AGO',

                    ]}
                />
            </div>

        </>
    )
}

export default CurrentKey