import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { Thumbnail, ThumbnailContainer, Container, ItemDetails, Header, Body, Details, Actions } from './Styled';

const styles = {
  heading: {
    fontWeight: 'bold',
  },
  subHeading: {
    margin: '0 20px 0 0',
    padding: '0',
    lineHeight: '48px',
  },
};

const CartItem = ({ item }) => (
  <Container>
    <ThumbnailContainer>
      <Thumbnail src={item.image} alt="sepsis-design" />
    </ThumbnailContainer>
    <ItemDetails>
      <Header>
        <Typography style={styles.heading} variant="headline">
          {item.product.productName}
        </Typography>
        <Typography variant="headline">{item.size.sizeName}</Typography>
      </Header>
      <Body>
        <Details>
          <Typography style={styles.subHeading} variant="subheading">
            {item.design.designName}
          </Typography>
          <Typography style={styles.subHeading} variant="subheading">
            {item.design.designName}
          </Typography>
          <Typography style={styles.subHeading} variant="subheading">
            {item.design.designName}
          </Typography>
        </Details>
        <Actions>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Actions>
      </Body>
    </ItemDetails>
  </Container>
);

const { shape } = PropTypes;
CartItem.propTypes = {
  item: shape({}).isRequired,
};

export default CartItem;
