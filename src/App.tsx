import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './pages/dashboard';

import Index from './pages/index';
import Panel from './pages/panel';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/:name/registrar">
          <Register />
        </Route>
        <Route path="/registros">
          <Panel />
        </Route>
        <Route path="/:name/validar">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
