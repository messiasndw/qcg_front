import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderLayout = () => {
    return (
        <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1"><Link to='profile'>Profile</Link></Menu.Item>
                
            </Menu>
        </Header>
    )
}

export default HeaderLayout