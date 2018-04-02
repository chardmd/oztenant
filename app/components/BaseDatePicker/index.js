/**
 *
 * BaseDatePicker
 *
 */

import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import { Typography } from 'material-ui';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import './BaseDatePicker.scss';

class BaseDatePicker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  render() {
    return (
      <div className="main_BaseDatePicker">
        <Typography className="label">Date Available</Typography>
        <DatePicker
          {...this.props}
          animateYearScrolling={false}
          leftArrowIcon={<KeyboardArrowLeftIcon />}
          rightArrowIcon={<KeyboardArrowRightIcon />}
        />
      </div>
    );
  }
}

BaseDatePicker.propTypes = {};

export default BaseDatePicker;
