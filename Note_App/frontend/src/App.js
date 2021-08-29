import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './Components/Header';
import { Login } from './pages/Login';
import MyNotes from './pages/MyNotes';

function App() {
  return (
    <>
    <Header/>
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
      />
       <Route
      exact
      path="/login"
      component={Login}
      />
       <Route
        exact
        path="/notes"
        component={MyNotes}
      />
    </Switch>
    </>
  );
}

export default App;
