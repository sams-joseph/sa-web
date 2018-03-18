import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import constants from '../constants';
import {
  Thumbnail,
  ThumbnailContainer,
  Container,
  ItemDetails,
  Header,
  Body,
  Details,
  Actions,
  Quantity,
  Increments,
  QuantityValue,
} from './Styled';

const styles = {
  heading: {
    fontWeight: 'bold',
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

const CartItem = ({ item, remove, index, update }) => (
  <Container>
    <ThumbnailContainer>
      <Thumbnail src={item.image} alt="sepsis-design" />
    </ThumbnailContainer>
    <ItemDetails>
      <Header>
        <Typography style={styles.heading} variant="headline">
          {item.inputs.name || 'Blank'}
        </Typography>
        <Typography style={{ marginRight: '12px' }} variant="headline">
          {item.inputs.date || 'Blank'}
        </Typography>
      </Header>
      <Body>
        <Details>
          <div>
            <Typography style={styles.subTitle} variant="subheading">
              Product
            </Typography>
            <Typography style={styles.subHeading} variant="subheading">
              {item.product.productName}
            </Typography>
          </div>
          <div>
            <Typography style={styles.subTitle} variant="subheading">
              Size
            </Typography>
            <Typography style={styles.subHeading} variant="subheading">
              {item.size.sizeName}
            </Typography>
          </div>
          <div>
            <Typography style={styles.subTitle} variant="subheading">
              Qty
            </Typography>
            <Quantity>
              <QuantityValue>{item.quantity}</QuantityValue>
            </Quantity>
          </div>
          <Increments>
            <ArrowDropUp
              style={{ color: '#757575' }}
              onClick={() => update(index, { ...item, quantity: item.quantity + 1 })}
            />
            <ArrowDropDown
              style={{ color: '#757575' }}
              onClick={() => update(index, { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 })}
            />
          </Increments>
        </Details>
        <Actions>
          <IconButton aria-label="Delete" onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Actions>
      </Body>
    </ItemDetails>
  </Container>
);

const { shape, func, number } = PropTypes;
CartItem.propTypes = {
  item: shape({}).isRequired,
  remove: func.isRequired,
  index: number.isRequired,
};

export default CartItem;
