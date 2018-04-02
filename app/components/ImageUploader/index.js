/**
 *
 * ImageUploader
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import CameraAlt from 'material-ui-icons/CameraAlt';
import Close from 'material-ui-icons/Close';
import shortid from 'shortid';
import ReactLoading from 'react-loading';
import './ImageUploader.scss';

class ImageUploader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      previewFile: null,
      previewImage: null
    };

    this.dropFile = this.dropFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadedImages.length !== 0) {
      const previewImage = nextProps.uploadedImages.find(
        image => image.fileName === this.state.fileName
      );
      this.setState({
        previewImage
      });
    } else {
      this.setState({
        previewFile: null,
        previewImage: null
      });
    }
  }

  dropFile(file) {
    const fileName = `${shortid.generate()}${Date.now()}`;
    this.setState({
      fileName,
      previewFile: file[0]
    });
    this.props.addFile({ fileName, file: file[0] });
  }

  removeFile() {
    this.props.removeFile(this.state.previewImage.url);
    this.setState({
      previewFile: null,
      previewImage: null
    });
  }

  render() {
    const displayImage = this.state.previewImage ? (
      <Fragment>
        <Close
          className="close"
          onClick={() => {
            this.removeFile();
          }}
        />{' '}
        <img src={this.state.previewImage.url} alt="" />
      </Fragment>
    ) : (
      <div className="loadingContainer">
        <ReactLoading type="bars" delay={0} className="loading" />
      </div>
    );

    return (
      <div className="imageUploader">
        {this.state.previewFile === null ? (
          <Dropzone
            onDrop={this.dropFile}
            multiple={false}
            className="dropzone"
          >
            <div className="container">
              <CameraAlt className="iconUpload" />
            </div>
          </Dropzone>
        ) : (
          <div className="image">{displayImage}</div>
        )}
      </div>
    );
  }
}

ImageUploader.propTypes = {
  addFile: PropTypes.func,
  removeFile: PropTypes.func,
  uploadedImages: PropTypes.array
};

export default ImageUploader;
