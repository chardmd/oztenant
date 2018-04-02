/**
 *
 * BasePrice
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

import './BasePrice.scss';
import data from '../../data/price.json';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 150
    }
  }
};

class BasePrice extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(parseInt(e.target.value, 10));
  }

  render() {
    const items = data.map(value => (
      <MenuItem
        key={`${this.props.label}-price-${value.key}`}
        value={value.key}
      >
        {value.label}
      </MenuItem>
    ));
    return (
      <FormControl className="basePrice">
        <InputLabel>{this.props.label}</InputLabel>
        <Select
          onChange={this.handleChange}
          value={this.props.value || 0}
          MenuProps={MenuProps}
        >
          {items}
        </Select>
      </FormControl>
    );
  }
}

BasePrice.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
  label: PropTypes.string
};

export default BasePrice;
