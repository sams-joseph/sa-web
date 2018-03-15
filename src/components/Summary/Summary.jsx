import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import {
  Container,
  ShippingForm,
  DesignPreview,
  DesignContainer,
  MetaContainer,
  Flex,
  FlexLeft,
  FlexRight,
} from './Styled';
import { getProductByID } from '../../actions/product';
import { getDesignByID } from '../../actions/design';
import { getSizeByID } from '../../actions/size';

class Summary extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    if (Object.getOwnPropertyNames(this.props.order).length > 0) {
      this.props.getProductByID(this.props.order.product.productID);
      this.props.getDesignByID(this.props.order.design.designID);
      this.props.getSizeByID(this.props.order.size.sizeID);
    } else {
      this.props.history.push('/design');
    }
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { product, design, size, order } = this.props;

    return (
      <Container>
        <Typography style={{ marginBottom: '20px' }} variant="title" component="h3">
          Order Summary
        </Typography>
        <MetaContainer>
          <DesignContainer>
            <DesignPreview src={order.image} alt="sepsis-design" />
            <FormControl fullWidth style={{ margin: '20px 0' }}>
              <InputLabel htmlFor="name-simple">Notes</InputLabel>
              <Input multiline id="name-simple" value={this.state.name} onChange={this.handleChange} />
            </FormControl>
          </DesignContainer>
          <Flex>
            <FlexLeft>
              <Typography variant="headline">Product</Typography>
              <Typography variant="subheading">{product.name}</Typography>
              <Typography variant="subheading">{size.displayName}</Typography>
              <Typography variant="subheading">{design.name}</Typography>
            </FlexLeft>
            <FlexRight>
              <Typography variant="headline">Design</Typography>
              <Typography variant="subheading">Erin Kay Flatley</Typography>
              <Typography variant="subheading">1978-2002</Typography>
            </FlexRight>
          </Flex>
        </MetaContainer>
        <ShippingForm>
          <Typography variant="headline">Shipping</Typography>
          <FormControl fullWidth style={{ margin: '20px 0' }}>
            <InputLabel htmlFor="name-simple">Name</InputLabel>
            <Input id="name-simple" value={this.state.name} onChange={this.handleChange} />
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="name-simple">Address</InputLabel>
            <Input id="name-simple" value={this.state.name} onChange={this.handleChange} />
          </FormControl>
          <FormControl style={{ marginRight: '20px', marginBottom: '20px' }}>
            <InputLabel htmlFor="name-simple">City</InputLabel>
            <Input id="name-simple" value={this.state.name} onChange={this.handleChange} />
          </FormControl>
          <FormControl style={{ marginBottom: '20px' }}>
            <InputLabel htmlFor="name-simple">Zipcode</InputLabel>
            <Input id="name-simple" value={this.state.name} onChange={this.handleChange} />
          </FormControl>
        </ShippingForm>
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
