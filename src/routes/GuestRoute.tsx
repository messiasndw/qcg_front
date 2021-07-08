import { Redirect, Route, RouteProps } from 'react-router-dom';
import GuestLayout from '../layouts/Guest';
import { useSelector } from 'react-redux';
import { ReduxState } from '../redux/store';
import LoadingPage from '../components/LoadingPage';
import { useEffect } from 'react';
export type PrivateRouteProps = {} & RouteProps;

const GuestRoute = ({ ...routeProps }: PrivateRouteProps) => {

    const { isAuthenticated, isAuthenticating } = useSelector(({ Auth }: ReduxState) => Auth)
    const token = localStorage.getItem('access_token')

    //check if user isnt authenticated
    if (!isAuthenticated && !token) {

        return <GuestLayout> <Route {...routeProps} /> </GuestLayout>
    }

    return <Redirect to={{ pathname: '/profile' }} />

}

export default GuestRoute