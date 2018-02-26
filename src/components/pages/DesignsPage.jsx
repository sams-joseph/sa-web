import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import AlertMessage from '../messages/AlertMessage';
import Sidebar from '../navigation/Sidebar';
import InputGroup from '../inputs/InputGroup';
import Input from '../inputs/Input';
import CanvasStage from '../Canvas';
import { getSizeByProduct } from '../../actions/size';
import { getDesignsByProduct } from '../../actions/design';
import { getProducts } from '../../actions/product';
import { setOrderProduct, setOrderSize } from '../../actions/order';
import { Container, FlexContainer, CanvasControls, ColorInput } from './Styled';
import constants from '../constants';

import crop from './images/crop.svg';
import move from './images/move.svg';
import italic from './images/italic.svg';
import type from './images/type.svg';

class DesignsPage extends Component {
  state = {
    showMessage: true,
    selectedProduct: '',
    selectedSize: '',
    text: {
      name: '',
      date: '',
    },
    fontColor: '#000000',
  };

  componentWillMount() {
    this.props.getSizeByProduct(this.props.productID);
    this.props.getDesignsByProduct(this.props.productID);
    this.props.getProducts();
  }

  componentDidMount() {
    this.props.setOrderProduct(this.props.productID);
    this.props.setOrderSize(this.props.sizeID);
  }

  onChange = e =>
    this.setState({
      text: { ...this.state.text, [e.target.name]: e.target.value },
    });

  setColor = () => {
    this.setState({
      fontColor: this.color.value,
    });
  };

  getSelectedSize = id => {
    const sizePosition = this.props.sizes.map(size => size.id).indexOf(id);
    return this.props.sizes[sizePosition];
  };

  handleSelectChange = selectedOption => {
    this.props.setOrderProduct(selectedOption.value);
    this.props.getSizeByProduct(selectedOption.value);
    this.props.getDesignsByProduct(selectedOption.value);
    this.props.getProducts();
    this.setState({ selectedProduct: selectedOption, selectedSize: { value: this.props.sizeID } });
  };

  handleSizeSelectChange = selectedOption => {
    this.setState({ selectedSize: selectedOption });
    this.props.setOrderSize(selectedOption.value);
  };

  search = (key, arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].id === key) {
        return arr[i];
      }
    }
  };

  toggleMessage = showMessage => {
    this.setState({
      showMessage,
    });
  };

  render() {
    const { isConfirmed, sizes, products, designs, productID, sizeID } = this.props;
    const { showMessage, selectedProduct, selectedSize } = this.state;
    const productOptions = products.map(product => ({ value: product.id, label: product.name }));
    const sizeOptions = sizes.map(size => ({ value: size.id, label: size.displayName }));
    const designOptions = designs.map(design => ({ value: design.id, label: design.name }));
    const productValue = selectedProduct ? selectedProduct.value : productID;
    const sizeValue = selectedSize ? selectedSize.value : sizeID;

    const selectedSizeObject = this.getSelectedSize(sizeValue);

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
        <Container padding="0 20px">
          <FlexContainer>
            <Sidebar>
              <InputGroup label="Product">
                <Select
                  style={{
                    borderColor: constants.almostWhite,
                    borderRadius: '2px',
                    marginTop: '5px',
                  }}
                  onChange={this.handleSelectChange}
                  value={productValue}
                  id="product"
                  name="product"
                  options={productOptions}
                />
              </InputGroup>
              <InputGroup label="Size">
                <Select
                  style={{
                    borderColor: constants.almostWhite,
                    borderRadius: '2px',
                    marginTop: '5px',
                  }}
                  onChange={this.handleSizeSelectChange}
                  id="product-size"
                  name="product-size"
                  value={sizeValue}
                  options={sizeOptions}
                />
              </InputGroup>
              <InputGroup label="Design">
                <Select
                  style={{
                    borderColor: constants.almostWhite,
                    borderRadius: '2px',
                    marginTop: '5px',
                  }}
                  id="design"
                  name="design"
                  value={designs.length > 0 ? designs[0].id : 0}
                  options={designOptions}
                />
              </InputGroup>
              <InputGroup label="Name">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={this.state.text.name}
                  onChange={this.onChange}
                />
              </InputGroup>
              <InputGroup label="Date">
                <Input
                  type="text"
                  id="date"
                  name="date"
                  placeholder="1987-2018"
                  value={this.state.text.date}
                  onChange={this.onChange}
                />
              </InputGroup>
            </Sidebar>
            <Container padding="0 0 0 20px">
              <CanvasStage
                img={designs.length > 0 ? designs[0].imageUrl : ''}
                name={this.state.text.name}
                date={this.state.text.date}
                width={selectedSizeObject ? selectedSizeObject.width : 48}
                height={selectedSizeObject ? selectedSizeObject.height : 14}
                color={this.state.fontColor}
                bleed={12}
              />
              <CanvasControls>
                <button>
                  <img src={move} alt="" />
                </button>
                <button>
                  <img src={crop} alt="" />
                </button>
                <button>
                  <img src={type} alt="" />
                </button>
                <button>
                  <img src={italic} alt="" />
                </button>
                <ColorInput
                  type="color"
                  innerRef={input => {
                    this.color = input;
                  }}
                  onChange={this.setColor}
                />
              </CanvasControls>
            </Container>
          </FlexContainer>
        </Container>
      </div>
    );
  }
}

const { bool, func, number, arrayOf, shape } = PropTypes;
DesignsPage.propTypes = {
  isConfirmed: bool.isRequired,
  getSizeByProduct: func.isRequired,
  getDesignsByProduct: func.isRequired,
  getProducts: func.isRequired,
  setOrderProduct: func.isRequired,
  setOrderSize: func.isRequired,
  productID: number,
  sizeID: number,
  products: arrayOf(shape({})).isRequired,
  sizes: arrayOf(shape({})).isRequired,
  designs: arrayOf(shape({})).isRequired,
};

DesignsPage.defaultProps = {
  productID: 1,
  sizeID: 1,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    productID: state.order.productID,
    sizeID: state.order.sizeID,
    products: state.product,
    designs: state.design,
    sizes: state.size,
  };
}

export default connect(mapStateToProps, {
  setOrderSize,
  setOrderProduct,
  getSizeByProduct,
  getProducts,
  getDesignsByProduct,
})(DesignsPage);
