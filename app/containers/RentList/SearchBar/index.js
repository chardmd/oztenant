import React from 'react';
import PropTypes from 'prop-types';
import ScrollableContainer from 'components/ScrollableContainer';
import CitySelector from 'components/CitySelector';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import BasePrice from 'components/BasePrice';

import './SearchBar.scss';

class SearchBar extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    const postType = this.props.postType;
    postType[name] = event.target.checked;
    this.props.onChangePostType(postType);
  };

  render() {
    return (
      <div className="searchBar">
        <Paper elevation={4}>
          <div className="pure-g">
            <div className={`pure-u-1 pure-u-sm-12-24 gutter`}>
              <BasePrice
                label="$ Min"
                value={this.props.minPrice}
                onChange={this.props.onChangeMinPrice}
              />
            </div>
            <div className={`pure-u-1 pure-u-sm-12-24 gutter`}>
              <BasePrice
                label="$ Max"
                value={this.props.maxPrice}
                onChange={this.props.onChangeMaxPrice}
              />
            </div>
          </div>
          <div className="pure-g">
            <div className={`pure-u-1 pure-u-sm-5-5 gutter`}>
              <div className="citySelector">
                <CitySelector
                  city={this.props.city}
                  onChangeCity={this.props.onChangeCity}
                />
              </div>
            </div>
          </div>
          <div className="pure-g">
            <div className={`pure-u-1 pure-u-sm-5-5 gutter`}>
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
            <div className={`pure-u-1 pure-u-sm-5-5 gutter`}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.props.postType.room}
                      onChange={this.handleChange('room')}
                      value="checkRoom"
                      color="primary"
                    />
                  }
                  label="Room"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.props.postType.housemate}
                      onChange={this.handleChange('housemate')}
                      value="checkHousemate"
                      color="primary"
                    />
                  }
                  label="Housemate"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.props.postType.space}
                      onChange={this.handleChange('space')}
                      value="checkSpace"
                      color="primary"
                    />
                  }
                  label="Space"
                />
              </FormGroup>
            </div>
          </div>
          <div className="pure-g">
            <div className={`pure-u-1 pure-u-sm-12-24 gutter`}>
              <Button
                variant="raised"
                color="secondary"
                className="button"
                onClick={this.props.onUpdateSearch}
              >
                Search
              </Button>
            </div>
            <div className={`pure-u-1 pure-u-sm-12-24 gutter`}>
              <Button
                variant="raised"
                color="secondary"
                className="button"
                onClick={this.props.onResetSearch}
              >
                Reset
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

SearchBar.propTypes = {
  city: PropTypes.string,
  station: PropTypes.any,
  onSelectStation: PropTypes.func,
  onChangeCity: PropTypes.func,
  onChangeMinPrice: PropTypes.func,
  onChangeMaxPrice: PropTypes.func,
  onUpdateSearch: PropTypes.func,
  onResetSearch: PropTypes.func,
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  postType: PropTypes.object,
  onChangePostType: PropTypes.func
};

export default SearchBar;
