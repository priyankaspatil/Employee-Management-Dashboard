import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './Screens/Login/Login';
import SignUp from './Screens/Register/Register';
import FloorMap from './Screens/MainScreen/FloorMap';
import HomePage from './Screens/HomePage/Home';
import './index.css';

class ViewPage extends React.Component {
    state = {
      users: [],
      idToAssign: 1
    };
  
    // AddNewUser = newUser => {
    //   let newUsers = this.state.users;
    //   newUser.id = this.state.idToAssign;
    //   newUsers.push(newUser);
    //   console.log(newUsers);
    //   this.setState({
    //     users: newUsers,
    //     idToAssign: this.state.idToAssign + 1
    //   });
    // };
  
    render() {
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
              render={routeProps => <SignUp AddNewUser={this.AddNewUser} {...routeProps} />}
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
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <BrowserRouter>
      <ViewPage />
    </BrowserRouter>,
    rootElement
  );

