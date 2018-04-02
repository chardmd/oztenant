/**
 *
 * BackToLink
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import './BackToLink.scss';

function BackToLink(props) {
  return (
    <div className="backToLink">
      <div className="backBackground">
        <div className="link" role="presentation" onClick={props.closeDialog}>
          <div className="container">
            <div>
              <KeyboardArrowLeftIcon className="icon" />
              {props.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BackToLink.propTypes = {
  text: PropTypes.string,
  closeDialog: PropTypes.func
};

export default BackToLink;
