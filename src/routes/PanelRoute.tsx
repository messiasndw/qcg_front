import { Redirect, Route, RouteProps } from 'react-router-dom';
import PanelLayout from '../layouts/Auth/Panel';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../redux/store';
export type PrivateRouteProps = {
} & RouteProps;

const PanelRoute = ({ ...routeProps }: PrivateRouteProps) => {

    const {isAuthenticated} = useSelector(({ Auth }: ReduxState) => Auth)

    if (isAuthenticated || !!localStorage.getItem('access_token')) {
        return <PanelLayout><Route {...routeProps} /></PanelLayout>
    }
    return <Redirect to={{ pathname: '/login' }} />

}

export default PanelRoute