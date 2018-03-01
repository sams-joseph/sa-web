import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Product from '../Product';
import { Wrapper, Container, Heading, FlexContainer, Hero } from './Styled';
import { getProducts } from '../../actions/product';

class ProductsPage extends Component {
  componentWillMount() {
    this.props.getProducts();
  }

  render() {
    const { showAlertMessage, products } = this.props;

    const productElements = products.map(product => (
      <Product
        key={product.id}
        id={product.id}
        name={product.name}
        description={product.description}
        imageUrl={product.imageUrl}
      />
    ));

    return (
      <Wrapper alertMessage={showAlertMessage}>
        <Hero img="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-0.3.5&s=ce0f350894216f6c6f9218865b3db36d&auto=format&fit=crop&w=1350&q=80" />
        <Container>
          <Heading>Products</Heading>
          <FlexContainer>{productElements}</FlexContainer>
        </Container>
      </Wrapper>
    );
  }
}

const { bool, func, arrayOf, shape, string } = PropTypes;
ProductsPage.propTypes = {
  getProducts: func.isRequired,
  products: arrayOf(
    shape({
      name: string,
      description: string,
      imageUrl: string,
    })
  ).isRequired,
  showAlertMessage: bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    products: state.product,
    showAlertMessage: state.message.alert,
  };
}

export default connect(mapStateToProps, { getProducts })(ProductsPage);
