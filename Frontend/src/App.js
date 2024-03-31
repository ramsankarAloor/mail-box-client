import { useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/auth">
          {isLoggedIn ? <Redirect to='/home' />: <AuthPage />}
        </Route>
        <Route path="/home">
          {isLoggedIn ? <HomePage /> : <Redirect to='/auth' />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
