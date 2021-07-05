import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Button } from "antd";
import GuestRoute from "./GuestRoute";
import AuthRoute from "./AuthRoute";

import Panel from '../layouts/Auth/Panel'
import Login from "../views/Login";

const x = () => {
    return <Button>a</Button>
}

export default function App() {
    return (
        <Router>
            <Switch>
                <GuestRoute exact path='/login' component={Login} />
                <AuthRoute exact path='/panel' component={Panel} />
                <AuthRoute exact path='/managment' component={x} />
                
                <Route path="/">
                    <h1>About</h1>
                    <Link to='/panel'>Ae</Link>
                </Route>

            </Switch>
        </Router>
    );
}