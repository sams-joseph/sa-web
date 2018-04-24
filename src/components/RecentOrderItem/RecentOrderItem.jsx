import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import constants from '../constants';
import RecentOrderItemLoading from './RecentOrderItemLoading';
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

class RecentOrderItem extends Component {
  state = {
    loading: true,
  };

  onLoad = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  };

  render() {
    const { item, product, size } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <img src={item.image} onLoad={this.onLoad} alt="placeholder" style={{ display: 'none' }} />
        {loading ? (
          <RecentOrderItemLoading />
        ) : (
          <Container>
            <ThumbnailContainer>
              <Thumbnail src={item.image} alt="sepsis-design" />
            </ThumbnailContainer>
            <ItemDetails>
              <Header>
                <Typography style={styles.heading} variant="headline">
                  {item.name || 'Blank'}
                </Typography>
                <Typography style={styles.heading} variant="headline">
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
                <Actions />
              </Body>
            </ItemDetails>
          </Container>
        )}
      </div>
    );
  }
}

const { shape } = PropTypes;
RecentOrderItem.propTypes = {
  item: shape({}).isRequired,
};

export default RecentOrderItem;
