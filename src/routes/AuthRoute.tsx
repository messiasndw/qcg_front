import React, {FC} from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import ManagmentLayout from '../layouts/Auth/Managment';
import PanelLayout from '../layouts/Auth/Panel';

export type PrivateRouteProps = {
} & RouteProps;

const AuthRoute = ({...routeProps}: PrivateRouteProps) => {

    if(routeProps.path === '/panel'){
        return true ? <Route {...routeProps} /> : <Redirect to={{ pathname: '/' }} />
    }else{
        return true ? <ManagmentLayout><Route {...routeProps} /></ManagmentLayout> : <Redirect to={{ pathname: '/' }} />
    }

}

export default AuthRoute