import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './Screens/Login/Login';
import SignUp from './Screens/Register/Register';
import FloorMap from './Screens/MainScreen/FloorMap';
import HomePage from './Screens/HomePage/Home';
import UserDetails from './Components/UserDetails/AddUserDetails';
import './index.css';

const ViewPage = (props) => {
  return (
    <div className="ViewPage">
      <Switch>
        <Route
          path="/"
          render={routeProps => (
            <FloorMap
              {...routeProps}
            />
          )}
          exact
        />
        <Route
          path="/login"
          render={routeProps => <Login {...routeProps} />}
          exact
        />
        <Route
          path="/signup"
          render={routeProps => <SignUp {...routeProps} />}
          exact
        />
        <Route
          path="/adduserdetails"
          render={routeProps => <UserDetails {...routeProps} />}
          exact
        />
        <Route
          path="/home"
          render={routeProps => (
            <HomePage
              {...routeProps}
            />
          )}
          exact
        />
      </Switch>
    </div>
  );
}

  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <BrowserRouter>
      <ViewPage />
    </BrowserRouter>,
    rootElement
  );

