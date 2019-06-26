import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PrivateRoute extends React.Component {
  render() {
     const {component: Component, auth, ...rest} = this.props;

     console.log(auth.isAuthenticated);
     const renderRoute = props => {
         if (auth.isAuthenticated) {
            return (
                <Component {...props} />
            );
         }

         const to = {
             pathname: '/', 
             state: {from: props.location}
         };

         return (
             <Redirect to={to} />
         );
     }

     return (
         <Route {...rest} render={renderRoute}/>
     );
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);