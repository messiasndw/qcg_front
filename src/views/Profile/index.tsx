import { Row, Col, Grid } from 'antd';
import { Card } from 'antd';
import Avatar from './Avatar';
import Data from './Data';
import { Button } from 'antd';

const {useBreakpoint} = Grid

const Profile = () => {

    const screens = useBreakpoint()

    return (
        <Row >
            <Col
            style={{display: 'flex', justifyContent:'center'}} 
            span={screens.lg && screens.md && screens.sm  ? '8' : '24'}>
                <Card
                    title={<Avatar />}
                    style={{ width: 300, height:'fit-content' }}
                >
                    <Button style={{margin: '10px 0px 10px 0px'}} danger>Disable Account</Button>
                </Card>
            </Col>
            <Col span={screens.lg && screens.md && screens.sm  ? '16' : '24'}>
                <Data></Data>
            </Col>
        </Row>
    )
}

export default Profile