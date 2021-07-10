import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import HeaderLayout from './Header/Header';
import Sider from './Sider/index';
import { FC, ElementType, ComponentType } from 'react';
import { useHistory } from 'react-router';
import { Typography } from 'antd';
import './index.css'

const { SubMenu } = Menu;
const { Content } = Layout;

interface ManagmentProp {
  children: any
}

const { Title } = Typography;

const ManagmentLayout: FC<ManagmentProp> = ({ children }) => {

  const history = useHistory()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout className="site-layout">
        <HeaderLayout />
        <Content style={{ margin: '0 16px' }}>
          {/* <Title style={{margin: '20px 0px 20px 20px', paddingLeft:'10px', borderLeft:'15px solid rgb(0 21 41)', textAlign:'left'}} >Profile</Title> */}
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  )
}

export default ManagmentLayout

