/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage, {
  makeSelectCity,
  makeSelectRoom
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectCity, selectRoom } from './actions';

import './HomePage.scss';

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="homePage">
        <div className="searchWrapper">
          <div className="container">
            <div className="pure-g">
              <div className="pure-u-1 pure-u-sm-5-5">
                <div className="header">
                  <div className="labelHeader">OZ Tenant</div>
                  <div className="slogan">
                    Your quickest way to find a place
                  </div>
                  <div className="searchButton">
                    <Link to={'/list'}>
                      <Button
                        variant="raised"
                        color="secondary"
                        className="button"
                        size="large"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  city: PropTypes.string,
  room: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
  city: makeSelectCity(),
  room: makeSelectRoom()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectCity: city => dispatch(selectCity(city)),
    onSelectRoom: room => dispatch(selectRoom(room))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
