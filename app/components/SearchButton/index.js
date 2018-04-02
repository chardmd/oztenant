/**
 *
 * SearchButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import './SearchButton.scss';

function SearchButton({ room, city }) {
  return (
    <div className="searchButton">
      <div className="buttonWrapper">
        <Link
          className="link"
          to={`/list/${room.toLowerCase()}/${city.toLowerCase()}`}
        >
          <Button variant="raised" color="secondary" className="button">
            Search
          </Button>
        </Link>
      </div>
    </div>
  );
}

SearchButton.propTypes = {
  room: PropTypes.string,
  city: PropTypes.string
};

export default SearchButton;
