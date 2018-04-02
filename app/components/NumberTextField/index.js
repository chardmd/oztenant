/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export default class NumberTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.name]: null
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value.trim()
    });
  };

  render() {
    const error =
      this.state[this.props.name] === null
        ? false
        : this.state[this.props.name].length === 0;

    return (
      <TextField
        name={this.props.name}
        label={this.props.label}
        className={this.props.className}
        placeholder={this.props.placeholder}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        autoComplete="off"
        onBlur={this.props.onBlur}
        onChange={this.handleChange(this.props.name)}
        error={error}
      />
    );
  }
}

NumberTextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func
};
