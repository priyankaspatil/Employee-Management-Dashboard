import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './Screens/Login/Login';
import SignUp from './Screens/Register/Register';
import FloorMap from './Screens/MainScreen/FloorMap';
import HomePage from './Screens/HomePage/Home';
import './index.css';

const ViewPage = (props) => {
  // console.log(props)
  return (
    <div className="ViewPage">
      <div>
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
          path="/home"
          render={routeProps => (
            <HomePage
              {...routeProps}
            />
          )}
          exact
        />
      </div>
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

