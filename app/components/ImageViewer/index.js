import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Lightbox from 'react-images';

import './ImageViewer.scss';

class ImageViewer extends Component {
  constructor() {
    super();

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }
  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }
  gotoImage(index) {
    this.setState({
      currentImage: index
    });
  }
  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return;

    this.gotoNext();
  }
  renderGallery() {
    const { images } = this.props;

    if (!images) return '';

    const gallery = images.map((obj, i) => (
      <a
        href={obj.src}
        className="thumbnail"
        key={`gallery-image-${obj.id}`}
        onClick={e => this.openLightbox(i, e)}
      >
        <img src={obj.thumbnail} alt="" className="source" />
      </a>
    ));

    return <div className="gallery">{gallery}</div>;
  }

  render() {
    return (
      <div className="imageViewer">
        <div className="section">
          {this.props.heading && <h2>{this.props.heading}</h2>}
          {this.props.subheading && <p>{this.props.subheading}</p>}
          {this.renderGallery()}
          <Lightbox
            currentImage={this.state.currentImage}
            images={this.props.images || []}
            isOpen={this.state.lightboxIsOpen}
            onClickImage={this.handleClickImage}
            onClickNext={this.gotoNext}
            onClickPrev={this.gotoPrevious}
            onClickThumbnail={this.gotoImage}
            onClose={this.closeLightbox}
            showThumbnails={this.props.showThumbnails}
            theme={this.props.theme}
          />
        </div>
      </div>
    );
  }
}

ImageViewer.displayName = 'ImageViewer';
ImageViewer.propTypes = {
  heading: PropTypes.string,
  images: PropTypes.array,
  showThumbnails: PropTypes.bool,
  subheading: PropTypes.string,
  theme: PropTypes.any
};

export default ImageViewer;
