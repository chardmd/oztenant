/**
 *
 * CitySelector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import cities from '../../data/cities.json';

import './CitySelector.scss';

function CitySelector({ city, onChangeCity }) {
  const cityList = cities.map(currCity => (
    <MenuItem key={`city-selector-${currCity.id}`} value={currCity.label}>
      {currCity.label}
    </MenuItem>
  ));
  return (
    <FormControl className="selectControl">
      <InputLabel htmlFor="city-native-helper">City</InputLabel>
      <Select
        input={<Input id="city-native-helper" />}
        className="region"
        value={city}
        onChange={e => {
          onChangeCity(e.target.value);
        }}
      >
        {cityList}
      </Select>
    </FormControl>
  );
}

CitySelector.propTypes = {
  city: PropTypes.string,
  onChangeCity: PropTypes.func
};

export default CitySelector;
