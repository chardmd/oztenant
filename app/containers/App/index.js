/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import HomePage from 'containers/HomePage/Loadable';
import BaseFooter from 'components/BaseFooter';

import RentList from '../RentList/Loadable';
import NavigationBar from '../NavigationBar';
import NotFound from '../NotFound/Loadable';
import ViewRent from '../ViewRent/Loadable';
import CreatePost from '../CreatePost/Loadable';

import './App.scss';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="app">
        <NavigationBar />
        <section>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/list" component={RentList} />
            <Route exact path="/new" component={CreatePost} />
            <Route path="/list/:id" component={ViewRent} />
            <Route component={NotFound} />
          </Switch>
        </section>
        <BaseFooter />
      </div>
    </MuiThemeProvider>
  );
}
