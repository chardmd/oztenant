/**
 *
 * NavigationBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import Login from 'components/Login';
import flagPrintLogo from '../../images/logo.png';

import makeSelectNavigationBar, { makeSelectUser } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getUser } from './actions';

import './NavigationBar.scss';

export class NavigationBar extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    // get the authUser from the local storage
    const authUser = Object.keys(window.localStorage).filter(item =>
      item.startsWith('firebase:authUser')
    )[0];

    const user = localStorage.getItem(authUser);

    this.setState({
      user: JSON.parse(user)
    });
  }

  componentDidMount() {
    this.props.onGetUser();
  }

  render() {
    return (
      <div className="navigationBar">
        <AppBar position="fixed">
          <Toolbar className="wrapper">
            <div className="pure-g">
              <div className="pure-u-1-2">
                <Link to="/">
                  <Avatar
                    alt="Expat Rental"
                    src={flagPrintLogo}
                    className="bigAvatar"
                  />
                  <span className="title" />
                </Link>
              </div>
              <div className="pure-u-1-2">
                <div className="buttonPosition">
                  {!this.state.user ? (
                    <span>
                      <Login />
                    </span>
                  ) : (
                    <span className="loginName">
                      Hi {this.state.user.displayName}
                    </span>
                  )}
                  <span>
                    <Link to={'/new'}>
                      <Button
                        variant="raised"
                        color="secondary"
                        className="button"
                      >
                        Create a Post
                      </Button>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  onGetUser: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  navigationbar: makeSelectNavigationBar(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetUser: () => dispatch(getUser())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'navigationBar', reducer });
const withSaga = injectSaga({ key: 'navigationBar', saga });

export default compose(withReducer, withSaga, withConnect)(NavigationBar);
