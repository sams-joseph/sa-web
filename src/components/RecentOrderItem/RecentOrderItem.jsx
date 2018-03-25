import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui-icons/ZoomIn';
import constants from '../constants';
import { Thumbnail, ThumbnailContainer, Container, ItemDetails, Header, Body, Details, Actions } from './Styled';

const styles = {
  heading: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: constants.almostBlack,
  },
  subTitle: {
    margin: '0 20px 4px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: '0',
    lineHeight: '20px',
    color: '#727882',
  },
  subHeading: {
    margin: '0 20px 0 0',
    fontSize: '14px',
    padding: '0',
    lineHeight: '24px',
  },
};

const RecentOrderItem = ({ item, product, size }) => (
  <Container>
    <ThumbnailContainer>
      <Thumbnail src={item.image} alt="sepsis-design" />
    </ThumbnailContainer>
    <ItemDetails>
      <Header>
        <Typography style={styles.heading} variant="headline">
          {item.name || 'Blank'}
        </Typography>
        <Typography style={{ ...styles.heading, marginRight: '12px' }} variant="headline">
          {item.date || 'Blank'}
        </Typography>
      </Header>
      <Body>
        <Details>
          <div>
            <Typography style={styles.subTitle} variant="subheading">
              Product
            </Typography>
            <Typography style={styles.subHeading} variant="subheading">
              {product.name}
            </Typography>
          </div>
          <div>
            <Typography style={styles.subTitle} variant="subheading">
              Size
            </Typography>
            <Typography style={styles.subHeading} variant="subheading">
              {size.displayName}
            </Typography>
          </div>
          <div>
            <Typography style={styles.subTitle} variant="subheading">
              Qty
            </Typography>
            <Typography style={styles.subHeading} variant="subheading">
              {item.quantity}
            </Typography>
          </div>
        </Details>
        <Actions>
          <IconButton aria-label="Go To">
            <ZoomIn />
          </IconButton>
        </Actions>
      </Body>
    </ItemDetails>
  </Container>
);

const { shape } = PropTypes;
RecentOrderItem.propTypes = {
  item: shape({}).isRequired,
};

export default RecentOrderItem;
