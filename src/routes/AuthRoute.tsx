import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import ManagmentLayout from '../layouts/Auth/Managment';
import PanelLayout from '../layouts/Auth/Panel';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../redux/store';
import LoadingPage from '../components/LoadingPage';
import { toast } from '../redux/Ui/slice';
import { me } from '../redux/Auth/slice';
export type PrivateRouteProps = {
} & RouteProps;

const AuthRoute = ({ ...routeProps }: PrivateRouteProps) => {

    const {isAuthenticated} = useSelector(({ Auth }: ReduxState) => Auth)

    if (isAuthenticated || !!localStorage.getItem('access_token')) {
        return <ManagmentLayout><Route {...routeProps} /></ManagmentLayout>
    }
    return <Redirect to={{ pathname: '/login' }} />

}

export default AuthRoute