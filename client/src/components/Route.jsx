import React from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Redirect } from 'react-router';
import { Route, withRouter } from 'react-router-dom';


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
