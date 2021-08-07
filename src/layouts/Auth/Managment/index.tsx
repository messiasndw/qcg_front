import { Layout, Menu, Breadcrumb } from 'antd';
import HeaderLayout from './Header/Header';
import Sider from './Sider/index';
import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { me } from '../../../redux/Auth/slice';
import { ReduxState } from '../../../redux/store';
import LoadingPage from '../../../components/LoadingPage';
import './index.css'
import WebSocketContext from '../../../context/websocket';
import { toast } from '../../../redux/Ui/slice';

const { SubMenu } = Menu;
const { Content } = Layout;

interface ManagmentProp {
  children: any
}

const { Title } = Typography;

const ManagmentLayout: FC<ManagmentProp> = ({ children }) => {

  const history = useHistory()
  const { isMeing, isAuthenticated } = useSelector(({ Auth }: ReduxState) => Auth)
  const { company, desks } = useSelector(({ Auth }: ReduxState) => Auth.me)
  const dispatch = useDispatch()
  const socket = useContext(WebSocketContext)

  React.useEffect(() => {

    dispatch(me())

    return () => {
      desks.forEach((desk) => {
        socket.off(`${company.id}/${desk}`)
      })
    }
  }, [])

  React.useEffect(() => {
    if(desks.length){
      desks.forEach((desk) => {
        console.log(desk)
        socket.on(`${company.id}/${desk}`, (data: any) => {
          console.log("iiiiiiiiiiii")
          dispatch(toast({ title: data.title, body: data.description, type: 'info' }))
        })
      })
    }
  }, [desks])

  return (
    <>
      {isMeing || !isAuthenticated ?
        <LoadingPage></LoadingPage>
        : <Layout style={{ minHeight: '100vh' }}>
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
        </Layout>}
    </>
  )
}

export default ManagmentLayout

