/**
 *
 * ViewRent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import scriptLoader from 'react-async-script-loader';

import RentView from 'components/RentView';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectViewRent, {
  makeSelectRent,
  makeSelectLoading
} from './selectors';
import { loadRentView } from './actions';
import reducer from './reducer';
import saga from './saga';
import './ViewRent.scss';

export class ViewRent extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    const docId = this.props.match.params.id;
    this.props.onLoadViewRent(docId);
  }

  render() {
    return (
      <div className="viewRent">
        <RentView rent={this.props.rent} loading={this.props.loading} />
      </div>
    );
  }
}

ViewRent.propTypes = {
  match: PropTypes.any,
  onLoadViewRent: PropTypes.func,
  rent: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  viewRent: makeSelectViewRent(),
  rent: makeSelectRent(),
  loading: makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoadViewRent: docId => dispatch(loadRentView(docId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'viewRent', reducer });
const withSaga = injectSaga({ key: 'viewRent', saga });

const loadScripts = scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${
    process.env.GOOGLE_MAPS_KEY
  }&v=3.exp&libraries=geometry,drawing,places`
]);

export default compose(withReducer, withSaga, withConnect, loadScripts)(
  ViewRent
);
