/**
 *
 * RentItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import BookmarkIcon from 'material-ui-icons/Bookmark';
import bedroomImage from '../../images/bedroom.png';
import './RentItem.scss';

class RentItem extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  getAvatarSymbol(type) {
    let symbol = '';
    switch (type) {
      case 'ROOM':
        symbol = 'R';
        break;
      case 'BEDSPACE':
        symbol = 'B';
        break;
      case 'HOUSE':
        symbol = 'H';
        break;
      default:
        symbol = 'R';
        break;
    }
    return symbol;
  }

  getDescription() {
    const description =
      this.props.rent.description.length > 50 ? (
        <span>
          {`${this.props.rent.description.substring(0, 50)} ...`}&nbsp;
          <a className="seeMore">Read more</a>
        </span>
      ) : (
        this.props.rent.description
      );
    return description;
  }

  render() {
    const imageUrl =
      this.props.rent.images.length !== 0
        ? this.props.rent.images[0].url
        : bedroomImage;

    const postedDate = this.props.rent.createdat
      ? moment(this.props.rent.createdat)
          .startOf('minutes')
          .fromNow()
      : '';

    return (
      <div className="rentItem">
        <Card className="card">
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className="avatar">
                {this.getAvatarSymbol(this.props.rent.type)}
              </Avatar>
            }
            title={this.props.rent.title}
            subheader={`Posted ${postedDate}`}
          />

          <CardMedia
            className="media"
            image={imageUrl}
            title="Image 1"
            onClick={() => {
              this.props.imageClick(this.props.rent.id);
            }}
          />
          <CardContent>
            <Typography component="p">{this.getDescription()}</Typography>
          </CardContent>
          <CardActions className="actions" disableActionSpacing>
            <IconButton
              aria-label="Add to favorites"
              color={
                this.props.rent.bookmarkUsers.includes(this.props.user.uid)
                  ? 'primary'
                  : 'default'
              }
              onClick={() => {
                this.props.bookmarkPost(
                  this.props.rent.id,
                  this.props.user.uid
                );
              }}
            >
              <BookmarkIcon />
            </IconButton>
            <div className="price">
              <div>$ {this.props.rent.price}</div>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

RentItem.propTypes = {
  rent: PropTypes.object,
  imageClick: PropTypes.func,
  bookmarkPost: PropTypes.func,
  user: PropTypes.object
};

export default RentItem;
