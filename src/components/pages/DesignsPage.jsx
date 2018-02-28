import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import FormatColorFill from 'material-ui-icons/FormatColorFill';

import Dropzone from 'react-dropzone';

import AlertMessage from '../messages/AlertMessage';
import Sidebar from '../navigation/Sidebar';
import InputGroup from '../inputs/InputGroup';
import CanvasStage from '../Canvas';
import { getSizeByProduct } from '../../actions/size';
import { getDesignsByProduct } from '../../actions/design';
import { getProducts } from '../../actions/product';
import { setOrderProduct, setOrderSize } from '../../actions/order';
import { Wrapper, Container, FlexContainer, ColorInput, DropzoneText } from './Styled';
import constants from '../constants';

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

  onChange = name => event => {
    this.setState({
      text: {
        [name]: event.target.value,
      },
    });
  };

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

  handleSelectChange = e => {
    this.props.setOrderProduct(e.target.value);
    this.props.getSizeByProduct(e.target.value);
    this.props.getDesignsByProduct(e.target.value);
    this.props.getProducts();
    this.setState({ selectedProduct: e.target, selectedSize: { value: this.props.order.sizeID } });
  };

  handleSizeSelectChange = e => {
    this.setState({ selectedSize: e.target });
    this.props.setOrderSize(e.target.value);
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
    const productOptions = products.map(product => (
      <MenuItem key={product.id} value={product.id}>
        {product.name}
      </MenuItem>
    ));
    const sizeOptions = sizes.map(size => (
      <MenuItem key={size.id} value={size.id}>
        {size.displayName}
      </MenuItem>
    ));
    const designOptions = designs.map(design => (
      <MenuItem key={design.id} value={design.id}>
        {design.name}
      </MenuItem>
    ));

    const selectedSizeObject = this.getSelectedSize(order.sizeID);

    return (
      <Wrapper>
        {!isConfirmed &&
          showMessage && (
            <AlertMessage
              closable
              type="info"
              text="Your email has not been verified"
              toggleMessage={this.toggleMessage}
            />
          )}
        <FlexContainer>
          <Sidebar>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="product">Product</InputLabel>
              <Select
                onChange={this.handleSelectChange}
                value={order.productID ? order.productID : 0}
                id="product"
                name="product"
              >
                {productOptions}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="product-size">Size</InputLabel>
              <Select
                onChange={this.handleSizeSelectChange}
                id="product-size"
                name="product-size"
                value={order.sizeID ? order.sizeID : 0}
              >
                {sizeOptions}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="design">Design</InputLabel>
              <Select
                onChange={this.handleSizeSelectChange}
                id="design"
                name="design"
                value={designs.length > 0 ? designs[0].id : 0}
              >
                {designOptions}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="name"
                label="Name"
                placeholder="John Doe"
                value={this.state.text.name}
                onChange={this.onChange('name')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="date"
                label="Date"
                placeholder="1987-2018"
                value={this.state.text.date}
                onChange={this.onChange('date')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <InputGroup label="Image">
              <Dropzone
                accept="image/bmp, image/gif, image/jpeg, image/png"
                onDrop={this.onDrop}
                multiple={false}
                style={{
                  marginTop: '10px',
                  width: '100%',
                  height: '100px',
                  border: `1px dashed rgba(0,0,0,0.54)`,
                  borderRadius: '2px',
                  background: '#FAFAFA',
                }}
                acceptStyle={{
                  marginTop: '10px',
                  width: '100%',
                  height: '100px',
                  border: `1px dashed ${constants.colorSuccess}`,
                  borderRadius: '2px',
                  background: '#FAFAFA',
                }}
                rejectStyle={{
                  marginTop: '10px',
                  width: '100%',
                  height: '100px',
                  border: `1px dashed ${constants.colorDanger}`,
                  borderRadius: '2px',
                  background: constants.colorDangerMuted,
                }}
              >
                <DropzoneText>Drop image or click to browse</DropzoneText>
              </Dropzone>
            </InputGroup>
          </Sidebar>
          <Container padding="0 20px 0 20px">
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
            <AppBar position="static" color="default" elevation="1" square>
              <Toolbar>
                <div style={{ flex: 1 }}>
                  <IconButton>
                    <FormatColorFill />
                  </IconButton>
                  <ColorInput
                    type="color"
                    innerRef={input => {
                      this.color = input;
                    }}
                    onChange={this.setColor}
                  />
                </div>
                <Button variant="raised" color="default">
                  Preview
                </Button>
              </Toolbar>
            </AppBar>
          </Container>
        </FlexContainer>
      </Wrapper>
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
