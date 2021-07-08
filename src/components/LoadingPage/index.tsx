import React from 'react'
import { Spin } from 'antd';

const LoadingPage = () => {
    return (
        <div style={{display:'flex', flexDirection:'column' ,justifyContent:'center', alignItems:'center', height: '100vh', width:'100vw', backgroundColor:'#001529'}}>
            <Spin style={{color: 'white'}} />
            <h1 style={{color: 'white'}}>Loading...</h1>
        </div>
    )
}

export default LoadingPage