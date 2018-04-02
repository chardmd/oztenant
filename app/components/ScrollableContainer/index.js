import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import sydneyStationData from '../../data/sydney-station.json';
import melbourneStationData from '../../data/melbourne-station.json';
import brisbaneStationData from '../../data/brisbane-station.json';
import perthStationData from '../../data/perth-station.json';
import adelaideStationData from '../../data/adelaide-station.json';

import './ScrollableContainer.scss';

function getStationData(city) {
  const myCity = city.toUpperCase();
  switch (myCity) {
    case 'SYDNEY':
      return sydneyStationData;
    case 'MELBOURNE':
      return melbourneStationData;
    case 'BRISBANE':
      return brisbaneStationData;
    case 'PERTH':
      return perthStationData;
    case 'ADELAIDE':
      return adelaideStationData;
    default:
      return [];
  }
}

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = (value, selectedCity) => {
  const stations = getStationData(selectedCity);

  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return stations;
  }

  const regex = new RegExp(`^${escapedValue}`, 'i');
  return stations.filter(station => regex.test(station.name));
};

function renderInput(inputProps) {
  const { autoFocus, value, ref, ...other } = inputProps;
  return (
    <TextField
      autoFocus
      value={value}
      className="inputWidth"
      inputRef={ref}
      InputProps={{
        ...other
      }}
    />
  );
}

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => suggestion.name;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ScrollableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: getStationData(this.props.city)[0].name,
      value: '',
      suggestions: getStationData(this.props.city)
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedStation !== this.state.value) {
      this.setState({
        selected: getStationData(nextProps.city)[0].name
      });
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.city)
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({ open: false, selected: suggestion.name }, () => {
      this.props.onSelectStation(suggestion.name);
    });
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      value: '',
      suggestions: getStationData(this.props.city)
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { selected, value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type to filter',
      value,
      autoFocus: false,
      onChange: this.onChange
    };

    return (
      <div className="station">
        <TextField
          className="station"
          name="station"
          value={selected || ''}
          label="Nearest Station"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          autoComplete="off"
          onClick={this.handleClickOpen}
          readOnly
        />
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <div className="scrollableContainer">
            <div className="modalTitle">Nearest Station</div>
            <div className="modalBody">
              <div className="theme">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionSelected={this.onSuggestionSelected}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                  alwaysRenderSuggestions
                  renderInputComponent={renderInput}
                />
              </div>
              <Button
                color="primary"
                className="cancelButton"
                onClick={this.handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

ScrollableContainer.propTypes = {
  city: PropTypes.string,
  selectedStation: PropTypes.string,
  onSelectStation: PropTypes.func
};

export default ScrollableContainer;
