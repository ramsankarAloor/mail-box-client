import { useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/mail" /> : <AuthPage />}
        </Route>
        <Route path="/auth">
          {isLoggedIn ? <Redirect to="/mail" /> : <AuthPage />}
        </Route>
        <Route path="/mail">
          {isLoggedIn ? <HomePage /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/404">
          <h2>404 - Page not found !!</h2>
        </Route>
        <Route path="*">
          <Redirect to='/404' />
        </Route>
      </Switch>
    </>
  );
}

export default App;
