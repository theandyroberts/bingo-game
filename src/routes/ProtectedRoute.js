import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import BingoGame from './components/BingoGame';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/game" component={BingoGame} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
