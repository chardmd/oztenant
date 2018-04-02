/**
 *
 * RentList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Hidden from 'material-ui/Hidden';
import Dialog from 'material-ui/Dialog';
import { compose } from 'redux';

import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from 'react-loading';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Sticky from 'react-stickynode';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RentItem from 'components/RentItem';
import RentView from 'components/RentView';
import BackToLink from 'components/BackToLink';

import SearchBar from './SearchBar';

import makeSelectRentList, {
  makeSelectCity,
  makeSelectStation,
  makeSelectRents,
  makeSelectLoading,
  makeLastItem,
  makeMinPrice,
  makeMaxPrice,
  makePostType,
  makeSelectRent,
  makeSelectUser
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  changeCity,
  selectStation,
  loadRentList,
  resetRentList,
  changeMinPrice,
  changeMaxPrice,
  changePostType,
  loadRentView,
  bookmarkPost
} from './actions';
import './RentList.scss';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

export class RentList extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openViewRent: false,
      city: 'Sydney'
    };

    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleViewRentClickOpen = this.handleViewRentClickOpen.bind(this);
    this.handleViewRentClose = this.handleViewRentClose.bind(this);
  }

  componentDidMount() {
    const params = {
      city: 'Sydney',
      minPrice: 0,
      maxPrice: 0,
      station: '-',
      postType: this.props.postType,
      docId: this.props.lastItem
    };
    this.props.onLoadRentList(params, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.city !== this.props.city) {
      this.props.onSelectStation('-');
    }
  }

  handleInfiniteLoad() {
    const params = {
      minPrice: this.props.minPrice,
      maxPrice: this.props.maxPrice,
      city: this.state.city,
      station: this.props.station,
      postType: this.props.postType,
      docId: this.props.lastItem
    };
    this.props.onLoadRentList(params, false);
  }

  updateSearch = () => {
    const params = {
      minPrice: this.props.minPrice,
      maxPrice: this.props.maxPrice,
      city: this.props.city,
      station: this.props.station,
      postType: this.props.postType,
      docId: null
    };
    this.props.onLoadRentList(params, true);
    window.scrollTo(0, 0);
    this.handleClose();
  };

  resetSearch = () => {
    const params = {
      minPrice: 0,
      maxPrice: 0,
      city: 'Sydney',
      station: '-',
      postType: {
        room: true,
        housemate: true,
        space: true
      },
      lastItem: null,
      docId: null
    };
    this.props.onLoadRentList(params, true);
    window.scrollTo(0, 0);
    this.handleClose();
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleViewRentClickOpen(id) {
    this.props.onLoadRentView(id);
    this.setState({
      openViewRent: true
    });
  }

  handleViewRentClose() {
    this.setState({ openViewRent: false });
  }

  renderLoading() {
    return (
      <div className="loading" key={0}>
        <ReactLoading type="bars" delay={0} />
      </div>
    );
  }

  render() {
    const items = this.props.rents.map(rent => (
      <RentItem
        rent={rent}
        imageClick={this.handleViewRentClickOpen}
        key={`rent-${rent.id}`}
        user={this.props.user}
        bookmarkPost={this.props.onBookmarkPost}
      />
    ));
    const hasLastItem =
      this.props.lastItem === null ? false : this.props.lastItem !== '';

    const loading = this.renderLoading();

    return (
      <div className="rentList">
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
          <div className="pure-g">
            <div className="pure-u-1-1">
              <Sticky activeClass="sticky" innerZ={999} top={60}>
                <Paper elevation={4} className="filter">
                  <Button
                    variant="raised"
                    color="secondary"
                    className="button"
                    onClick={this.handleClickOpen}
                  >
                    Filter
                  </Button>
                </Paper>
              </Sticky>
              <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                transition={Transition}
                disableBackdropClick
                disableEscapeKeyDown
              >
                <SearchBar
                  city={this.props.city || this.state.city}
                  station={this.props.station}
                  onSelectStation={this.props.onSelectStation}
                  onChangeCity={this.props.onChangeCity}
                  onChangeMinPrice={this.props.onChangeMinPrice}
                  onChangeMaxPrice={this.props.onChangeMaxPrice}
                  onUpdateSearch={this.updateSearch}
                  onResetSearch={this.resetSearch}
                  minPrice={this.props.minPrice}
                  maxPrice={this.props.maxPrice}
                  postType={this.props.postType}
                  onChangePostType={this.props.onChangePostType}
                />
              </Dialog>
            </div>
          </div>
        </Hidden>
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1 pure-u-sm-10-24">
              <Hidden only={['xs']}>
                <Sticky activeClass="sticky" innerZ={999} top={80}>
                  <SearchBar
                    city={this.props.city || this.state.city}
                    station={this.props.station}
                    onSelectStation={this.props.onSelectStation}
                    onChangeCity={this.props.onChangeCity}
                    onChangeMinPrice={this.props.onChangeMinPrice}
                    onChangeMaxPrice={this.props.onChangeMaxPrice}
                    onUpdateSearch={this.updateSearch}
                    onResetSearch={this.resetSearch}
                    minPrice={this.props.minPrice}
                    maxPrice={this.props.maxPrice}
                    postType={this.props.postType}
                    onChangePostType={this.props.onChangePostType}
                  />
                </Sticky>
              </Hidden>
            </div>
            <div className="pure-u-1 pure-u-sm-14-24">
              {
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() => {
                    this.handleInfiniteLoad();
                  }}
                  hasMore={hasLastItem}
                  loader={loading}
                  room={this.state.room}
                  city={this.state.city.toLowerCase()}
                >
                  <div className="itemHolder">{items}</div>
                </InfiniteScroll>
              }
            </div>
          </div>
        </div>
        <Dialog
          fullScreen
          open={this.state.openViewRent}
          onClose={this.handleViewRentClose}
          disableBackdropClick
          disableEscapeKeyDown
        >
          <BackToLink
            text="Back to List"
            closeDialog={this.handleViewRentClose}
          />
          <RentView rent={this.props.rentView} loading={this.props.loading} />
        </Dialog>
      </div>
    );
  }
}

RentList.propTypes = {
  city: PropTypes.string,
  station: PropTypes.any,
  onSelectStation: PropTypes.func,
  onChangeCity: PropTypes.func,
  onLoadRentList: PropTypes.func,
  rents: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  lastItem: PropTypes.string,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  onChangeMinPrice: PropTypes.func,
  onChangeMaxPrice: PropTypes.func,
  postType: PropTypes.object,
  onChangePostType: PropTypes.func,
  onLoadRentView: PropTypes.func,
  loading: PropTypes.bool,
  rentView: PropTypes.object,
  onBookmarkPost: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  rentList: makeSelectRentList(),
  city: makeSelectCity(),
  station: makeSelectStation(),
  rents: makeSelectRents(),
  loading: makeSelectLoading(),
  lastItem: makeLastItem(),
  minPrice: makeMinPrice(),
  maxPrice: makeMaxPrice(),
  postType: makePostType(),
  rentView: makeSelectRent(),
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeCity: city => dispatch(changeCity(city)),
    onSelectStation: station => dispatch(selectStation(station)),
    onLoadRentList: (params, isSearch) =>
      dispatch(loadRentList(params, isSearch)),
    onResetRentList: () => dispatch(resetRentList()),
    onChangeMinPrice: price => dispatch(changeMinPrice(price)),
    onChangeMaxPrice: price => dispatch(changeMaxPrice(price)),
    onChangePostType: postType => dispatch(changePostType(postType)),
    onLoadRentView: docId => dispatch(loadRentView(docId)),
    onBookmarkPost: (postId, userId) => dispatch(bookmarkPost(postId, userId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'rentList', reducer });
const withSaga = injectSaga({ key: 'rentList', saga });

export default compose(withReducer, withSaga, withConnect)(RentList);
