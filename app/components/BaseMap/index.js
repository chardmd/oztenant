/**
 *
 * GoogleMap
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={17}
    center={{ lat: props.lat, lng: props.lng }}
    defaultOptions={{
      scrollwheel: false
    }}
  >
    <Marker position={{ lat: props.lat, lng: props.lng }} />
  </GoogleMap>
));

class BaseMap extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    // prevent gogole map from loading roboto font automatically
    const head = document.getElementsByTagName('head')[0];
    const insertBefore = head.insertBefore;
    head.insertBefore = (newElement, referenceElement) => {
      if (
        newElement.href &&
        newElement.href.indexOf(
          'https://fonts.googleapis.com/css?family=Roboto'
        ) === 0
      ) {
        console.info('Prevented Roboto from loading!');
        return;
      }
      insertBefore.call(head, newElement, referenceElement);
    };
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.isScriptLoaded &&
          this.props.isScriptLoadSucceed && (
            <GMap
              isMarkerShown
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '400px' }} />}
              mapElement={<div style={{ height: '100%' }} />}
              lat={this.props.lat}
              lng={this.props.lng}
            />
          )}
      </div>
    );
  }
}

BaseMap.propTypes = {
  className: PropTypes.string,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  lat: PropTypes.number,
  lng: PropTypes.number
};

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${
    process.env.GOOGLE_MAPS_KEY
  }&v=3.exp&libraries=geometry,drawing,places`
])(BaseMap);
