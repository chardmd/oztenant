/**
 *
 * Captcha
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import ReactLoading from 'react-loading';
// import Recaptcha from 'react-google-invisible-recaptcha';
import styles from './Captcha.scss';

// <Recaptcha
// ref={this.props.setRef}
// onResolved={this.props.onResolved}
// sitekey={this.props.sitekey}
// />

class Captcha extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="captcha">
        <Button
          variant="raised"
          type="submit"
          color="accent"
          className={styles.button}
          onClick={this.props.submit}
        >
          {this.props.loading ? (
            <ReactLoading
              type="bars"
              delay={0}
              className={styles.loading}
              height="20"
              width="35"
            />
          ) : (
            'Create Your Post'
          )}
        </Button>
      </div>
    );
  }
}

Captcha.propTypes = {
  // setRef: PropTypes.func,
  // sitekey: PropTypes.string,
  // onResolved: PropTypes.func,
  loading: PropTypes.bool,
  submit: PropTypes.func
};

export default Captcha;
