import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import Dropzone from 'react-dropzone';

import AlertMessage from '../messages/AlertMessage';
import Sidebar from '../navigation/Sidebar';
import InputGroup from '../inputs/InputGroup';
import Input from '../inputs/Input';
import CanvasStage from '../Canvas';
import { getSizeByProduct } from '../../actions/size';
import { getDesignsByProduct } from '../../actions/design';
import { getProducts } from '../../actions/product';
import { setOrderProduct, setOrderSize } from '../../actions/order';
import { Container, FlexContainer, CanvasControls, ColorInput, DropzoneText } from './Styled';
import constants from '../constants';

import crop from './images/crop.svg';
import move from './images/move.svg';
import italic from './images/italic.svg';
import type from './images/type.svg';

class DesignsPage extends Component {
  state = {
    showMessage: true,
    text: {
      name: '',
      date: '',
    },
    fontColor: '#000000',
  };

  componentWillMount() {
    this.props.getSizeByProduct(this.props.order.productID);
    this.props.getDesignsByProduct(this.props.order.productID);
    this.props.getProducts();
  }

  componentDidMount() {
    this.props.setOrderProduct(this.props.order.productID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sizes !== this.props.sizes) {
      const firstAvailableSizeId = nextProps.sizes.length > 0 ? nextProps.sizes[0].id : 0;
      this.props.setOrderSize(firstAvailableSizeId);
    }
  }

  onChange = e =>
    this.setState({
      text: { ...this.state.text, [e.target.name]: e.target.value },
    });

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      console.log(rejectedFiles);
      return;
    }
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        this.setState({
          image: `data:${file.type};base64,${btoa(fileAsBinaryString)}`,
        });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  };

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
    this.setState({ selectedProduct: selectedOption, selectedSize: { value: this.props.order.sizeID } });
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
    const { isConfirmed, sizes, products, designs, order } = this.props;
    const { showMessage } = this.state;
    const productOptions = products.map(product => ({ value: product.id, label: product.name }));
    const sizeOptions = sizes.map(size => ({ value: size.id, label: size.displayName }));
    const designOptions = designs.map(design => ({ value: design.id, label: design.name }));

    const selectedSizeObject = this.getSelectedSize(order.sizeID);

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
                  value={order.productID}
                  id="product"
                  name="product"
                  options={productOptions}
                  resetValue="0"
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
                  value={order.sizeID}
                  options={sizeOptions}
                  resetValue="0"
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
                  resetValue="0"
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
              <InputGroup label="Image">
                <Dropzone
                  accept="image/bmp, image/gif, image/jpeg, image/png"
                  onDrop={this.onDrop}
                  multiple={false}
                  style={{
                    marginTop: '5px',
                    width: '100%',
                    height: '100px',
                    border: `2px dashed ${constants.almostWhite}`,
                    borderRadius: '2px',
                  }}
                  acceptStyle={{
                    marginTop: '5px',
                    width: '100%',
                    height: '100px',
                    border: `2px dashed ${constants.colorSuccess}`,
                    borderRadius: '2px',
                  }}
                  rejectStyle={{
                    marginTop: '5px',
                    width: '100%',
                    height: '100px',
                    border: `2px dashed ${constants.colorDanger}`,
                    borderRadius: '2px',
                  }}
                >
                  <DropzoneText>Drop image or click to browse</DropzoneText>
                </Dropzone>
              </InputGroup>
            </Sidebar>
            <Container padding="0 0 0 20px">
              <CanvasStage
                portraitImage={this.state.image ? this.state.image : ''}
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
  order: shape({
    sizeID: number,
    productID: number,
  }),
  products: arrayOf(shape({})).isRequired,
  sizes: arrayOf(shape({})).isRequired,
  designs: arrayOf(shape({})).isRequired,
};

DesignsPage.defaultProps = {
  order: {
    productID: 0,
    sizeID: 0,
  },
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    order: state.order,
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
