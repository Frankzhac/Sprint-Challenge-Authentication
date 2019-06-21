import React from 'react';
import './App.css';
import { NavLink, Route, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Jokes from './components/jokes/Jokes';
import Register from './components/auth/Register';




function App(props) {
  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    props.history.push('/login')
  };
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/register">Register</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/login">Login</NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/jokes">Jokes</NavLink>
          &nbsp;|&nbsp;
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login}/>
        <Route path="/Jokes" component={Jokes}/>
      </main>
    </div>
  );
}

export default withRouter(App);
