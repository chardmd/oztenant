/**
 *
 * ViewRent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import FacebookProvider, { Comments } from 'react-facebook';
import ReactLoading from 'react-loading';

import SocialShare from 'components/SocialShare';
import BaseMap from 'components/BaseMap';
import ImageViewer from 'components/ImageViewer';
import './RentView.scss';

export class RentView extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="rentView">
        <div className="container">
          <Paper elevation={4}>
            {this.props.rent === null || this.props.loading ? (
              <ReactLoading type="bars" delay={0} className="loading" />
            ) : (
              <div className="paperWrapper">
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-sm-4-5">
                    <div className="imageViewer">
                      <ImageViewer
                        images={
                          this.props.rent.images &&
                          this.props.rent.images.map(image => ({
                            id: image.id,
                            src: image.url,
                            thumbnail: image.url
                          }))
                        }
                      />
                    </div>
                    <hr />
                  </div>
                </div>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-sm-4-5">
                    <div className="title">
                      <h1>{this.props.rent.title}</h1>
                    </div>
                  </div>
                </div>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-sm-4-5">
                    <div className="socialShare">
                      <SocialShare
                        facebookUrl={`${window.location.protocol}//${
                          window.location.host
                        }/list/${this.props.rent.id}`}
                        twitterUrl={`${window.location.protocol}//${
                          window.location.host
                        }/list/${this.props.rent.id}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-sm-4-5">
                    <div className="description">
                      <span>{this.props.rent.description}</span>
                    </div>
                  </div>
                </div>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-sm-4-5">
                    <div className="price">
                      <span>{this.props.rent.price}</span>
                    </div>
                  </div>
                </div>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-sm-4-5">
                    <div className="region">
                      <span>{this.props.rent.city}</span>
                    </div>
                  </div>
                </div>
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-sm-4-5">
                    <div className="station">
                      <span>{this.props.rent.station}</span>
                    </div>
                  </div>
                </div>
                {this.props.rent.geocode && (
                  <div className="pure-g">
                    <div className="pure-u-1 pure-u-sm-4-5">
                      <BaseMap
                        lat={this.props.rent.geocode.lat}
                        lng={this.props.rent.geocode.lng}
                        className="baseMap"
                      />
                    </div>
                  </div>
                )}
                <div className="pure-g">
                  <div className="pure-u-1 pure-u-sm-4-5">
                    <FacebookProvider appId="1929980330596574">
                      <Comments
                        href={`${window.location.protocol}//${
                          window.location.host
                        }/list/${this.props.rent.id}`}
                        width="auto"
                      />
                    </FacebookProvider>
                  </div>
                </div>
              </div>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

RentView.propTypes = {
  rent: PropTypes.object,
  loading: PropTypes.bool
};

export default RentView;
