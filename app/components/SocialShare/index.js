/**
 *
 * SocialShare
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from 'react-share';

import './SocialShare.scss';

function SocialShare({ facebookUrl, twitterUrl }) {
  return (
    <div className="socialShare">
      <FacebookShareButton url={facebookUrl} className="button">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={twitterUrl} title="twitter" className="button">
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
}

SocialShare.propTypes = {
  facebookUrl: PropTypes.string,
  twitterUrl: PropTypes.string
};

export default SocialShare;
