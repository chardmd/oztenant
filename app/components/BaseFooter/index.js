/**
 *
 * BaseFooter
 *
 */

import React from 'react';
import './BaseFooter.scss';

class BaseFooter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="footer">
        <span>
          © OZ Tenant 2018 <br />
          Made with&nbsp;
          <span role="img" aria-label="love">
            ❤️
          </span>&nbsp; in Sydney, Australia.
        </span>
      </div>
    );
  }
}

BaseFooter.propTypes = {};

export default BaseFooter;
