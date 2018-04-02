/**
 *
 * CreatePost
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Paper from 'material-ui/Paper';
import { Typography } from 'material-ui';
import { ToastContainer, toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form/immutable';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';

import RoomSelector from 'components/RoomSelector';
import CitySelector from 'components/CitySelector';
import BaseDatePicker from 'components/BaseDatePicker';
import ImageUploader from 'components/ImageUploader';
import Button from 'material-ui/Button';
import ScrollableContainer from 'components/ScrollableContainer';
import SearchAddress from 'components/SearchAddress';
import BaseMap from 'components/BaseMap';
import BaseTextField from 'components/BaseTextField';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectRoom,
  makeSelectCity,
  makeSelectStation,
  makeSelectDate,
  makeSelectLoading,
  makeSelectAlert,
  makeSelectImages,
  makeSelectGeocode,
  makeSelectSuccess
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import './CreatePost.scss';
import {
  selectRoom,
  changeCity,
  selectStation,
  selectDate,
  toggleFormAlert,
  saveFormData,
  addImageFile,
  searchAddress,
  setTitle,
  setDescription,
  setPrice,
  removeImage
} from './actions';

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const validate = values => {
  const errors = {};
  const requiredFields = ['title', 'description', 'price'];
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = true;
    }
    if (isNaN(values.get('price'))) {
      errors.price = true;
    }
  });
  return errors;
};

export class CreatePost extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.captchaKey = process.env.GOOGLE_CAPTCHA;
    this.onSaveData = this.onSaveData.bind(this);
    this.getPostType = this.getPostType.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert) {
      this.notifySuccess();
    }
  }

  onSaveData(values) {
    let data = values.toJS();
    data = {
      ...data,
      type: this.props.room,
      price: parseInt(data.price, 10),
      availableDate: new Date(this.props.availableDate),
      city: this.props.city,
      station: this.props.station,
      geocode: this.props.geocode
    };
    const images = this.props.images;
    this.props.onSaveFormData(data, images);
    this.props.reset();
  }

  getPostType(type) {
    let postType = {};
    if (type === 'Room') {
      postType = { room: true };
    } else if (type === 'Housemate') {
      postType = { housemate: true };
    } else {
      postType = { space: true };
    }
    return postType;
  }

  notifySuccess() {
    toast.success('Your post has been created', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  }

  render() {
    return (
      <div className="createPost">
        <div className="backToLink">
          <div className="backBackground">
            <div role="presentation">
              <div className="container">
                <Link to={'/list'} className="link">
                  <div>
                    <KeyboardArrowLeftIcon className="icon" />
                    Back to List
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Paper elevation={4}>
            <form
              className="paperWrapper"
              onSubmit={this.props.handleSubmit(this.onSaveData)}
            >
              <div className="pure-g">
                <div className="pure-u-1 pure-u-sm-4-5">
                  <div>
                    <RoomSelector
                      room={this.props.room}
                      onSelectRoom={this.props.onSelectRoom}
                    />
                  </div>
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-sm-4-5">
                  <Field
                    name="title"
                    component={BaseTextField}
                    placeholder="Furnished Room near the CBD"
                    label="Title"
                    autoComplete="off"
                    autoFocus
                    className="inputWidth"
                  />
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-sm-9-24">
                  <Field
                    name="price"
                    component={BaseTextField}
                    label="Price"
                    placeholder="$ 225"
                    autoComplete="off"
                    className="inputWidth"
                  />
                </div>
                <div className="pure-u-1 pure-u-sm-1-24" />
                <div className="pure-u-1 pure-u-sm-9-24">
                  <div className="baseDatePicker">
                    <BaseDatePicker
                      format="MMMM Do YYYY"
                      value={this.props.availableDate}
                      onChange={this.props.onSelectDate}
                      minDate={this.props.availableDate}
                    />
                  </div>
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-sm-9-24">
                  <div className="citySelector">
                    <CitySelector
                      city={capitalizeFirstLetter(this.props.city)}
                      onChangeCity={this.props.onChangeCity}
                    />
                  </div>
                </div>
                <div className="pure-u-1 pure-u-sm-1-24" />
                <div className="pure-u-1 pure-u-sm-9-24">
                  <div className="station">
                    <ScrollableContainer
                      city={this.props.city}
                      selectedStation={this.props.station}
                      onSelectStation={this.props.onSelectStation}
                    />
                  </div>
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-md-5-8">
                  <SearchAddress
                    onSearchAddress={this.props.onSearchAddress}
                    reset={this.props.success}
                  />
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-md-5-8">
                  <BaseMap
                    lat={this.props.geocode.lat}
                    lng={this.props.geocode.lng}
                    className="baseMap"
                  />
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-md-5-8">
                  <Field
                    name="description"
                    component={BaseTextField}
                    label="Describe the property"
                    className="inputWidth"
                    multiline
                    rows={10}
                    placeholder="Good location, and a lot of cafes nearby.."
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1">
                  <div className="fileUpload">
                    <Typography className="label">Upload Images</Typography>
                  </div>
                </div>
                <div className="pure-u-1 pure-u-md-4-24">
                  <ImageUploader
                    addFile={this.props.onAddImageFile}
                    removeFile={this.props.onRemoveImage}
                    uploadedImages={this.props.images}
                  />
                </div>
                <div className="pure-u-1 pure-u-md-4-24">
                  <ImageUploader
                    addFile={this.props.onAddImageFile}
                    removeFile={this.props.onRemoveImage}
                    uploadedImages={this.props.images}
                  />
                </div>
                <div className="pure-u-1 pure-u-md-4-24">
                  <ImageUploader
                    addFile={this.props.onAddImageFile}
                    removeFile={this.props.onRemoveImage}
                    uploadedImages={this.props.images}
                  />
                </div>
                <div className="pure-u-1 pure-u-md-4-24">
                  <ImageUploader
                    addFile={this.props.onAddImageFile}
                    removeFile={this.props.onRemoveImage}
                    uploadedImages={this.props.images}
                  />
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1 pure-u-sm-5-24">
                  <div className="captcha">
                    <Button
                      type="submit"
                      variant="raised"
                      color="secondary"
                      disabled={this.props.loading}
                      className="button"
                    >
                      {this.props.loading ? (
                        <ReactLoading
                          type="bars"
                          delay={0}
                          className="loading"
                          height="20"
                          width="35"
                        />
                      ) : (
                        'Submit a Post'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Paper>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  room: makeSelectRoom(),
  city: makeSelectCity(),
  station: makeSelectStation(),
  availableDate: makeSelectDate(),
  loading: makeSelectLoading(),
  alert: makeSelectAlert(),
  images: makeSelectImages(),
  geocode: makeSelectGeocode(),
  success: makeSelectSuccess()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectRoom: room => dispatch(selectRoom(room)),
    onChangeCity: city => dispatch(changeCity(city)),
    onSelectStation: station => dispatch(selectStation(station)),
    onSelectDate: date => dispatch(selectDate(date)),
    onToggleFormAlert: display => dispatch(toggleFormAlert(display)),
    onSaveFormData: (data, imageFiles) =>
      dispatch(saveFormData(data, imageFiles)),
    onAddImageFile: file => dispatch(addImageFile(file)),
    onSearchAddress: latlng => dispatch(searchAddress(latlng)),
    onSetTitle: title => dispatch(setTitle(title)),
    onSetDescription: description => dispatch(setDescription(description)),
    onSetPrice: price => dispatch(setPrice(price)),
    onRemoveImage: url => dispatch(removeImage(url))
  };
}

CreatePost.propTypes = {
  alert: PropTypes.bool,
  room: PropTypes.string,
  city: PropTypes.string,
  station: PropTypes.any,
  onSelectRoom: PropTypes.func,
  onChangeCity: PropTypes.func,
  onSelectStation: PropTypes.func,
  onSelectDate: PropTypes.func,
  availableDate: PropTypes.any,
  onSaveFormData: PropTypes.func,
  onAddImageFile: PropTypes.func,
  loading: PropTypes.bool,
  images: PropTypes.array,
  onSearchAddress: PropTypes.func,
  geocode: PropTypes.object,
  success: PropTypes.bool,
  onRemoveImage: PropTypes.func,
  handleSubmit: PropTypes.func, // redux-form
  reset: PropTypes.func // redux-form
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'createPost', reducer });
const withSaga = injectSaga({ key: 'createPost', saga });

const EnhanceCreatePost = reduxForm({
  form: 'createPostForm', // a unique identifier for this form
  validate
})(CreatePost);

export default compose(withReducer, withSaga, withConnect)(EnhanceCreatePost);
