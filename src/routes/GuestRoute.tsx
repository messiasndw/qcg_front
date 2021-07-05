import { Redirect, Route, RouteProps } from 'react-router-dom';
import GuestLayout from '../layouts/Guest';

export type PrivateRouteProps = {} & RouteProps;

const GuestRoute = ({ ...routeProps }: PrivateRouteProps) => {

    return true ? <GuestLayout> <Route {...routeProps} /> </GuestLayout> : <Redirect to={{ pathname: '/' }} />

}

export default GuestRoute