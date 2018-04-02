import React from 'react';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import data from './data.json';
import bedroomImage from '../../images/bedroom.png';
import bedspaceImage from '../../images/bedspace.png';
import unitImage from '../../images/unit.png';

import './MediaCard.scss';

class MediaCard extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const imageMap = new Map();
    imageMap.set(0, bedroomImage);
    imageMap.set(1, bedspaceImage);
    imageMap.set(2, unitImage);

    return (
      <div className="mediaCard">
        {data.map((card, index) => (
          <div className="pure-u-1 pure-u-sm-1-3" key={`media-card-${card.id}`}>
            <Card className="card">
              <CardMedia className="media" image={imageMap.get(index)} />
              <CardContent className="cardContent">
                <Typography type="headline" component="h2">
                  {card.title}
                </Typography>
                <Typography component="p">{card.description}</Typography>
              </CardContent>
              <CardActions className="cardAction">
                <Link to={`/list/${card.link}/sydney`}>
                  <Button variant="raised" color="secondary">
                    View Listing
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default MediaCard;
