import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Login from './pages/SignUp';
import Login from './pages/Portfolio';
import Login from './pages/StockList';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/portfolio' exact component={Portfolio} />
        <Route path='/stocklist' exact component={StockList} />
        <Route component={NotMatch} />
      </Switch>
    </Router>

  );
}

export default App;
