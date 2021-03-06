import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'reset-css';
import { UserProvider } from './context/app';
import NoMatchedRoute from './components/NoMatchedRoute';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import UserRestrictedRoute from './util/userRestrictedRoute';
import Header from './common/Header';
import TermsAndServices from './components/TermsAndServices';
import Logout from './components/Logout';
import ForgotPassword from './components/ForgotPassword';

const theme = {
  colors: {
    purple: '#a946f6',
    violet: '#770fc8',
    violetDarker: '#4C107F',
    violetTrans: 'rgba(119,15,200,0.1)',
    green: '#07d451',
    grey: '#fbfafc',
    black: '#000000',
    white: '#ffffff',
    emerald: '#08a441',
    dark: '#191927',
    semiDark: '#656565',
    red: '#f63f82',
    blackTrans: 'rgba(0, 0, 0, 0.05)',
    darkBackground: '#161627',
  },
  breakpoints: {
    mobile: '420px',
    fablet: '600px',
    tablet: '750px',
    desktop: '990px',
  },
};

const GlobalStyle = createGlobalStyle`
  body, html, * {
    font-family: 'IBM Plex Sans', sans-serif;
    color: ${props => props.theme.colors.dark}
  }
  
  body {
    background: ${props => props.theme.colors.grey};
  }
  
  a, a:visited, a:active {
    color:${props => props.theme.colors.darkBackground};
  }
  
  a:hover {
    color: ${props => props.theme.colors.violet};
  }
  
  h1 { font-size: 2em; }
  h2 { font-size: 1.5em; }
  h3 { font-size: 1.17em; }
  h4 { font-size: 1.12em; }
  h5 { font-size: .83em; }
  h6 { font-size: .75em; }
  
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.21;
  }

  p {
    line-height: 1.44;
    margin-bottom: 0.8rem;
  }
`;

const AuthenticatedRoute = UserRestrictedRoute(true, '/login');
const UnauthenticatedRoute = UserRestrictedRoute(false, '/');

const App = () => (
  <ThemeProvider theme={theme}>
    <UserProvider>
      <>
        <GlobalStyle />
        <Router>
          <Header />

          <Switch>
            <UnauthenticatedRoute path="/login">
              <Login />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/register">
              <Register />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/reset/:token">
              <ResetPassword />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/forgot-password">
              <ForgotPassword />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path="/">
              <Dashboard />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/profile">
              <Profile />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/logout">
              <Logout />
            </AuthenticatedRoute>
            <Route path="/tos">
              <TermsAndServices />
            </Route>
            <Route path="*">
              <NoMatchedRoute />
            </Route>
          </Switch>
        </Router>
      </>
    </UserProvider>
  </ThemeProvider>
);

export default App;
