import { Row, Col, Grid } from 'antd';
import { Card } from 'antd';
import Avatar from './Avatar';
import Data from './Data';

const {useBreakpoint} = Grid

const Profile = () => {

    const screens = useBreakpoint()
    console.log(screens)
    return (
        <Row >
            <Col
            style={{display: 'flex', justifyContent:'center'}} 
            span={screens.lg && screens.md && screens.sm  ? '8' : '24'}>
                <Card
                    title={<Avatar />}
                    style={{ width: 300 }}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Col>
            <Col span={screens.lg && screens.md && screens.sm  ? '16' : '24'}>
                <Data></Data>
            </Col>
        </Row>
    )
}

export default Profile