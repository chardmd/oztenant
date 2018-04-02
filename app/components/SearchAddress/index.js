/**
 *
 * SearchAddress
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader';
import TextField from 'material-ui/TextField';
import LocationOn from 'material-ui-icons/LocationOn';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import googleImageSrc from '../../images/powered_by_google_default.png';
import './SearchAddress.scss';

class SearchAddress extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      loading: false,
      reset: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.setState({
        address: ''
      });
    }
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.props.onSearchAddress({ lat, lng });
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          loading: false
        });
      });
  }

  handleChange(address) {
    this.setState({
      address
    });
  }

  render() {
    const Footer = () => (
      <div className="searchFooter">
        <div>
          <img alt="Google" src={googleImageSrc} className="image" />
        </div>
      </div>
    );

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        <LocationOn className="marker" />&nbsp;
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">
          {formattedSuggestion.secondaryText}
        </small>
      </div>
    );

    const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: false,
      placeholder: 'Hyde Park, Sydney, New South Wales, Australia'
    };

    const cssClasses = {
      root: 'root',
      input: 'input',
      autocompleteItem: 'autocompleteItem',
      autocompleteContainer: 'autocompleteContainer',
      autocompleteItemActive: 'autocompleteItemActive'
    };

    const shouldFetchSuggestions = ({ value }) => value.length >= 1;

    const onError = (status, clearSuggestions) => {
      console.log(
        'Error happened while fetching suggestions from Google Maps API',
        status
      );
      clearSuggestions();
    };

    const options = {
      componentRestrictions: { country: 'au' }
    };

    return (
      <div className="searchAddress">
        {this.props.isScriptLoaded &&
          this.props.isScriptLoadSucceed && (
            <div>
              <PlacesAutocomplete
                onSelect={this.handleSelect}
                onError={onError}
                renderSuggestion={AutocompleteItem}
                onEnterKeyDown={this.handleSelect}
                inputProps={inputProps}
                classNames={cssClasses}
                shouldFetchSuggestions={shouldFetchSuggestions}
                renderFooter={Footer}
                options={options}
                hasCustomInput
              >
                <TextField
                  label="Search Address"
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  autoComplete="off"
                  {...inputProps}
                />
              </PlacesAutocomplete>
            </div>
          )}
        {this.state.loading ? (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        ) : null}
      </div>
    );
  }
}

SearchAddress.propTypes = {
  onSearchAddress: PropTypes.func,
  isScriptLoaded: PropTypes.bool,
  isScriptLoadSucceed: PropTypes.bool,
  reset: PropTypes.bool
};

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${
    process.env.GOOGLE_MAPS_KEY
  }&v=3.exp&libraries=geometry,drawing,places`
])(SearchAddress);
