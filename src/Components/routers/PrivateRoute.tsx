import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { authSelectors } from "../../redux/auth";

interface IProps {
  redirectTo?: string;
  children?: JSX.Element;
}

const PrivateRoute = ({ children, redirectTo = "/login", ...props }:IProps) => {
  const isLogedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Route {...props}>
      {isLogedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
};
export default PrivateRoute;
