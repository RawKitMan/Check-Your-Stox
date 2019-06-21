import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Portfolio from './pages/Portfolio';
import StockList from './pages/StockList';
import NotMatch from './pages/NotMatch';
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
