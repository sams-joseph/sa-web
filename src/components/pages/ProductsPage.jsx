import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AlertMessage from '../messages/AlertMessage';
import Product from '../Product';
import { Container, Heading, FlexContainer, Hero } from './Styled';
import { getProducts } from '../../actions/product';

class ProductsPage extends Component {
  state = {
    showMessage: true,
  };

  componentWillMount() {
    this.props.getProducts();
  }

  toggleMessage = showMessage => {
    this.setState({
      showMessage,
    });
  };

  render() {
    const { isConfirmed, products } = this.props;
    const { showMessage } = this.state;

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
      <div>
        {!isConfirmed &&
          showMessage && (
            <AlertMessage
              closable
              type="info"
              text="Your email has not been verified"
              toggleMessage={this.toggleMessage}
            />
          )}
        <Hero img="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-0.3.5&s=ce0f350894216f6c6f9218865b3db36d&auto=format&fit=crop&w=1350&q=80" />
        <Container>
          <Heading>Products</Heading>
          <FlexContainer>{productElements}</FlexContainer>
        </Container>
      </div>
    );
  }
}

const { bool, func, arrayOf, shape, string } = PropTypes;
ProductsPage.propTypes = {
  isConfirmed: bool.isRequired,
  getProducts: func.isRequired,
  products: arrayOf(
    shape({
      name: string,
      description: string,
      imageUrl: string,
    })
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    products: state.product,
  };
}

export default connect(mapStateToProps, { getProducts })(ProductsPage);
