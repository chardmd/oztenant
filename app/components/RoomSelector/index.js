/**
 *
 * RoomSelector
 *
 */

import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import People from 'material-ui-icons/People';
import Weekend from 'material-ui-icons/Weekend';
import LocationCity from 'material-ui-icons/LocationCity';

import './RoomSelector.scss';

class RoomSelector extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="roomSelector">
        <Button
          variant="raised"
          color={this.props.room === 'Room' ? 'primary' : 'default'}
          className="roomButton"
          size="small"
          onClick={() => this.props.onSelectRoom('Room')}
        >
          <LocationCity />&nbsp;<span>A Room</span>
        </Button>
        <Button
          variant="raised"
          color={this.props.room === 'Housemate' ? 'primary' : 'default'}
          className="roomButton"
          size="small"
          onClick={() => this.props.onSelectRoom('Housemate')}
        >
          <People />&nbsp;<span>A Flatmate</span>
        </Button>
        <Button
          variant="raised"
          color={this.props.room === 'Space' ? 'primary' : 'default'}
          className="roomButton"
          size="small"
          onClick={() => this.props.onSelectRoom('Space')}
        >
          <Weekend />&nbsp;<span>A Unit / Space</span>
        </Button>
      </div>
    );
  }
}

RoomSelector.propTypes = {
  room: PropTypes.string,
  onSelectRoom: PropTypes.func
};

export default RoomSelector;
