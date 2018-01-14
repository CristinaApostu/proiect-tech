import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./componente/pagini/HomePage";
import LoginPage from "./componente/pagini/LoginPage";
import DashboardPage from "./componente/pagini/DashboardPage";
import SignupPage from "./componente/pagini/SignupPage";
import ConfirmationPage from "./componente/pagini/ConfirmationPage";
import ForgotPasswordPage from "./componente/pagini/ForgotPasswordPage";
import ResetPasswordPage from "./componente/pagini/ResetPasswordPage";
import NewBookPage from "./componente/pagini/NewBookPage";
import UserRoute from "./componente/routes/UserRoute";
import GuestRoute from "./componente/routes/GuestRoute";
import TopNavigation from "./componente/navigation/TopNavigation";

const App = ({ location, isAuthenticated }) => (
  <div className="ui container">
    {isAuthenticated && <TopNavigation />}
    <Route location={location} path="/" exact component={HomePage} />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
    />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <GuestRoute
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      path="/dashboard"
      exact
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      path="/books/new"
      exact
      component={NewBookPage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);