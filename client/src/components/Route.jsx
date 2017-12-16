import React from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Redirect } from 'react-router';
import { Route, withRouter } from 'react-router-dom';


const Auth = ({ path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      this.props.auth ? <Redirect to='/customers/orders/new' /> : <Component {...props} />
    )}
  />
);

const Protected = ({ path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      this.props.auth ? <Component {...props} /> : <Redirect to='/' />
    )}
  />
);


function mapStateToProps({ auth, entities }) {
  return { auth , entities};
}

export const AuthRoute =
  withRouter(connect(mapStateToProps, actions)(Auth));
export const ProtectedRoute =
  withRouter(connect(mapStateToProps, actions)(Protected));
