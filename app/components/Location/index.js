/**
 *
 * Location
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import cities from '../../data/cities.json';

import './Location.scss';

class Location extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const locationChips = cities.map(city => {
      let chip = null;
      const label = city.label.toUpperCase();
      if (label === this.props.city.toUpperCase()) {
        chip = (
          <Chip
            key={`city-${city.id}`}
            className="chip selected"
            avatar={
              <Avatar className="selectedAvatar">
                {city.label.substring(0, 1)}
              </Avatar>
            }
            label={label}
          />
        );
      } else {
        chip = (
          <Chip
            key={`city-${city.id}`}
            className="chip"
            avatar={
              <Avatar className={city.selected}>
                {city.label.substring(0, 1)}
              </Avatar>
            }
            label={label}
            onClick={() => this.props.onClick(city.label)}
          />
        );
      }
      return chip;
    });

    return (
      <div className="Location">
        <div className="chipWrapper">{locationChips}</div>
      </div>
    );
  }
}

Location.propTypes = {
  city: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Location;
