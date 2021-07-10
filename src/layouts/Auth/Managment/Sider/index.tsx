
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {
  SettingOutlined,
  DesktopOutlined,
  TeamOutlined,
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;
const SiderLayout = () => {

  const [collapsed, setCollapse] = useState(false)

  const onCollapse = (collapsed: any) => {
    setCollapse((prevState) => !prevState );
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['profile']} mode="inline">
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to='/profile' >Profile</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<TeamOutlined />}>
          <Link to='/users'>Users</Link>
        </Menu.Item>
        <Menu.Item key="desks" icon={<DesktopOutlined />}>
          <Link to='/desks'>Desks</Link>
        </Menu.Item>
        <SubMenu key="keys" icon={<KeyOutlined />} title="Keys">
          <Menu.Item key="keys1"><Link to='/keys/generate'>Generate</Link></Menu.Item>
          <Menu.Item key="keys2"><Link to='/keys/manage'>Manage</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="6">UI</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default SiderLayout
