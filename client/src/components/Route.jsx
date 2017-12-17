import React from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import { Redirect } from 'react-router';
import { Route, withRouter } from 'react-router-dom';


const Protected = ({ auth, path, component: Component }) => {
  console.log('protected auth', auth);
  console.log('protected path', path);
  console.log('protected component', Component);


  //auth is undefined
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
function mapStateToProps({ auth, entities }) {
  return { auth , entities};
}

export const ProtectedRoute =
  withRouter(connect(mapStateToProps, actions)(Protected));

  // export const AuthRoute =
  //   withRouter(connect(mapStateToProps, actions)(Auth));



  // const Auth = ({ path, component: Component }) => {
  //   console.log('auth props', this.props);
  //   return (
  //
  //     <Route
  //       path={path}
  //       render={auth => (
  //         this.props.auth ? <Redirect to='/customers/orders/new' /> : <Component {...auth} />
  //     )}
  //     />
  //   );
  // };
