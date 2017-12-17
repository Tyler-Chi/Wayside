import React from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Redirect } from 'react-router';
import { Route, withRouter } from 'react-router-dom';


const Auth = ({ auth, path, component: Component }) => {

  return (
    <Route
      path={path}
      render={props => (
        auth ? <Redirect to='/customers/orders/new' /> : <Component {...props} />
    )}
    />
  );
};

const Protected = ({ auth, path, component: Component }) => {

  return (
    <Route
      path={path}
      render={props => (
        auth ? <Component {...props} /> : <Redirect to='/' />
    )}
    />
  );
};

//so auth is like loggedIn
const mapStateToProps = ({ auth, entities }) => ({
  auth,
  entities,
});


export const ProtectedRoute =
  withRouter(connect(mapStateToProps, actions)(Protected));
export const AuthRoute =
  withRouter(connect(mapStateToProps, actions)(Auth));
