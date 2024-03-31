import { useSelector } from "react-redux";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Switch>
        <Route path="/auth">
          {isLoggedIn ? <Redirect to="/" /> : <AuthPage />}
        </Route>
        <Route path="/404">
          <h2>404 - Page not found !!</h2>
        </Route>
        <Route path="/">
          {isLoggedIn ? <HomePage /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
