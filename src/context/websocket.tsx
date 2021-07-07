import React from 'react'
import { createContext } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:8000')

const WebSocketContext = createContext(socket)

socket.on('connect',() => {
    console.log("foi")
})

socket.on('connect_error',() => {
    console.log("deu erro foi")
})


export const WebSocketContextProvider = (props: any) => {
    return (
        <WebSocketContext.Provider value={socket}>{props.children}</WebSocketContext.Provider>
    )

}


export default WebSocketContext