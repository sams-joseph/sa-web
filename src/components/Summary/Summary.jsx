import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Container, DesignPreview, Flex, FlexLeft, FlexRight } from './Styled';

import { getProductByID } from '../../actions/product';
import { getDesignByID } from '../../actions/design';
import { getSizeByID } from '../../actions/size';

class Summary extends Component {
  componentDidMount() {
    if (Object.getOwnPropertyNames(this.props.order).length > 0) {
      this.props.getProductByID(this.props.order.product.productID);
      this.props.getDesignByID(this.props.order.design.designID);
      this.props.getSizeByID(this.props.order.size.sizeID);
    } else {
      this.props.history.push('/design');
    }
  }

  render() {
    const { product, design, size, order } = this.props;

    return (
      <Container>
        <Typography style={{ marginBottom: '20px' }} variant="title" component="h3">
          Order Summary
        </Typography>
        <div>
          <DesignPreview src={order.image} alt="sepsis-design" />
          <Flex>
            <FlexLeft>
              <img src={order.portrait} alt="" />
              <Typography variant="headline">Product</Typography>
              <Typography variant="subheading">{product.name}</Typography>
              <Typography variant="subheading">{size.displayName}</Typography>
              <Typography variant="subheading">{design.name}</Typography>
            </FlexLeft>
            <FlexRight>
              <Typography variant="headline">Design</Typography>
              <Typography variant="subheading">John Doe</Typography>
              <Typography variant="subheading">1987-2018</Typography>
            </FlexRight>
          </Flex>
          <Button style={{ marginTop: '70px' }} variant="raised" color="primary">
            Submit
          </Button>
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    order: state.order,
    product: state.product,
    design: state.design,
    size: state.size,
  };
}

const { shape, func } = PropTypes;
Summary.propTypes = {
  order: shape({}).isRequired,
  getProductByID: func.isRequired,
  getDesignByID: func.isRequired,
  product: shape({}).isRequired,
  design: shape({}).isRequired,
  size: shape({}).isRequired,
  getSizeByID: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
};

export default connect(mapStateToProps, { getProductByID, getDesignByID, getSizeByID })(Summary);
