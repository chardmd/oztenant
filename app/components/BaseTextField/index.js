/**
 *
 * BaseTextField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const BaseTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField error={touched && error} {...input} {...custom} label={label} />
);
BaseTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  custom: PropTypes.object
};

// class BaseTextField extends React.Component { // eslint-disable-line react/prefer-stateless-function

//   handleChange = (name) => (event) => {
//     this.setState({
//       [name]: event.target.value,
//     });
//   };

//   handleBlur = () => {
//     this.props.onBlur(this.state[this.props.name]);
//   };

//   render() {
//     return (
//       <TextField
//         name={this.props.name}
//         label={this.props.label}
//         className={this.props.className}
//         InputLabelProps={{
//           shrink: true,
//         }}
//         multiline={this.props.multiline}
//         autoFocus={this.props.autoFocus}
//         margin="normal"
//         placeholder={this.props.placeholder}
//         rows={this.props.rows}
//         onChange={this.handleChange(this.props.name)}
//         error={false}
//         onBlur={this.handleBlur}
//       />
//     );
//   }
// }

// BaseTextField.propTypes = {
//   name: PropTypes.string,
//   label: PropTypes.string,
//   className: PropTypes.string,
//   autoFocus: PropTypes.bool,
//   placeholder: PropTypes.string,
//   onBlur: PropTypes.func,
//   multiline: PropTypes.bool,
//   rows: PropTypes.number,
// };

export default BaseTextField;
