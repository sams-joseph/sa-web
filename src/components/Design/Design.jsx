import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl } from 'material-ui/Form';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import Error from 'material-ui-icons/Error';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Remove from 'material-ui-icons/Remove';
import Add from 'material-ui-icons/Add';
import Collapse from 'material-ui/transitions/Collapse';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Dropzone from 'react-dropzone';
import Sidebar from '../navigation/Sidebar';
import InputGroup from '../inputs/InputGroup';
import Breadcrumbs from '../Breadcrumbs';
import CanvasStage from '../Canvas';
import { getSizeByProduct } from '../../actions/size';
import { getDesignsByProduct } from '../../actions/design';
import { getProducts } from '../../actions/product';
import { setOrderProduct, setOrderSize, setOrderDesign } from '../../actions/order';
import { getDesignBySize } from '../../actions/designSize';
import { logout } from '../../actions/auth';

import { Wrapper, Container, FlexContainer, DropzoneText } from './Styled';
import ColorSelect from '../ColorSelect';
import constants from '../constants';

import placeholderImage from './images/placeholder.jpg';

class Design extends Component {
  state = {
    loading: true,
    showMessage: true,
    modal: false,
    text: {
      name: '',
      date: '',
    },
    fontColor: '#FFFFFF',
    error: '',
    collapse: {
      product: false,
      size: false,
      design: false,
    },
    requestDelay: 0,
  };

  componentDidMount() {
    this.props
      .getProducts()
      .then(() => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, this.state.requestDelay);
      })
      .catch(() => {
        this.props.logout();
      });
  }

  onChange = name => event => {
    this.setState({
      text: {
        ...this.state.text,
        [name]: event.target.value,
      },
    });
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      this.setState({
        error: 'This file type is not supported.',
      });
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

  setColor = color => {
    this.setState({
      fontColor: color,
    });
  };

  getSelectedSize = id => {
    const sizePosition = this.props.sizes.map(size => size.id).indexOf(id);
    return this.props.sizes[sizePosition];
  };

  search = (key, arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].id === key) {
        return arr[i];
      }
    }
  };

  handleCollapse = name => () => {
    this.setState({ collapse: { ...this.state.collapse, [name]: !this.state.collapse[name] } });
  };

  handleProductSelectClick = (productID, productName) => () => {
    this.setState({ loading: true });
    this.props.setOrderProduct({ productID, productName });
    Promise.all([this.props.getSizeByProduct(productID), this.props.getDesignsByProduct(productID)])
      .then(() => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, this.state.requestDelay);
      })
      .catch(() => {
        this.props.logout();
      });
  };

  handleSizeSelectClick = (sizeID, sizeName) => () => {
    this.props.setOrderSize({ sizeID, sizeName });
    this.setState({ selectedSizeID: sizeID });
  };

  handleDesignSelectClick = (designID, designName) => () => {
    this.setState({ loading: true });
    this.props.setOrderDesign({ designID, designName });
    this.props
      .getDesignBySize(designID, this.props.order.size.sizeID)
      .then(() => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, this.state.requestDelay);
      })
      .catch(() => {
        this.props.logout();
      });
  };

  handleModalOpen = () => {
    this.setState({ modal: true });
  };

  handleModalClose = () => {
    this.setState({ modal: false });
  };

  render() {
    const { showAlertMessage, sizes, products, designs, designUrl } = this.props;
    const productListOptions = products.map(product => (
      <ListItem
        value={product.id}
        button
        style={{ paddingLeft: '30px' }}
        key={product.id}
        onClick={this.handleProductSelectClick(product.id, product.name)}
      >
        <ListItemText primary={product.name} />
      </ListItem>
    ));
    const sizeListOptions = sizes.map(size => (
      <ListItem
        value={size.id}
        button
        style={{ paddingLeft: '30px' }}
        key={size.id}
        onClick={this.handleSizeSelectClick(size.id, size.displayName)}
      >
        <ListItemText primary={size.displayName} />
      </ListItem>
    ));
    const designListOptions = designs.map(design => (
      <ListItem
        value={design.id}
        button
        style={{ paddingLeft: '30px' }}
        key={design.id}
        onClick={this.handleDesignSelectClick(design.id, design.name)}
      >
        <ListItemText primary={design.name} />
      </ListItem>
    ));

    const selectedSizeObject = this.getSelectedSize(this.state.selectedSizeID);

    return (
      <Wrapper alertMessage={showAlertMessage}>
        <Modal aria-labelledby="simple-modal-title" open={this.state.modal} onClose={this.handleModalClose}>
          <div
            style={{
              position: 'absolute',
              width: '50%',
              height: '50vh',
              background: '#535469',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
            }}
          >
            <Typography variant="title" id="modal-title">
              Preview
            </Typography>
          </div>
        </Modal>
        <Snackbar
          onClose={this.handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={!!this.state.error}
          message={this.state.error}
          autoHideDuration={5000}
          action={
            <IconButton>
              <Error style={{ color: '#EA233F' }} />
            </IconButton>
          }
        />
        <FlexContainer>
          <Sidebar>
            {this.state.loading ? (
              <Container>
                <CircularProgress
                  color="secondary"
                  style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: '100px' }}
                />
              </Container>
            ) : (
              <List component="nav">
                <ListItem button onClick={this.handleCollapse('product')} disabled={this.state.loading}>
                  <ListItemText primary="Products" />
                  {this.state.collapse.product ? (
                    <Remove style={{ fill: 'white', height: '16px' }} />
                  ) : (
                    <Add style={{ fill: 'white', height: '16px' }} />
                  )}
                </ListItem>
                <Collapse in={this.state.collapse.product} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {productListOptions}
                  </List>
                </Collapse>
                <ListItem button onClick={this.handleCollapse('size')} disabled={sizeListOptions.length === 0}>
                  <ListItemText primary="Sizes" />
                  {this.state.collapse.size ? (
                    <Remove style={{ fill: 'white', height: '16px' }} />
                  ) : (
                    <Add style={{ fill: 'white', height: '16px' }} />
                  )}
                </ListItem>
                <Collapse in={this.state.collapse.size} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {sizeListOptions}
                  </List>
                </Collapse>
                <ListItem button onClick={this.handleCollapse('design')} disabled={designListOptions.length === 0}>
                  <ListItemText primary="Designs" />
                  {this.state.collapse.design ? (
                    <Remove style={{ fill: 'white', height: '16px' }} />
                  ) : (
                    <Add style={{ fill: 'white', height: '16px' }} />
                  )}
                </ListItem>
                <Collapse in={this.state.collapse.design} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {designListOptions}
                  </List>
                </Collapse>
              </List>
            )}
          </Sidebar>
          <Container padding="0 20px 0 20px">
            <Breadcrumbs order={[this.state.productName, this.state.sizeName, this.state.designName]} />
            <CanvasStage
              portraitImage={this.state.image ? this.state.image : ''}
              img={designUrl || placeholderImage}
              name={this.state.text.name}
              date={this.state.text.date}
              width={selectedSizeObject ? selectedSizeObject.width : 48}
              height={selectedSizeObject ? selectedSizeObject.height : 14}
              color={this.state.fontColor}
              bleed={12}
            />
            <AppBar style={{ background: '#181828' }} position="static" color="default" elevation={1} square>
              <Toolbar>
                <div style={{ flex: 1, display: 'flex' }}>
                  <ColorSelect onSelect={this.setColor} />
                </div>
                <Button onClick={this.handleModalOpen} variant="raised" color="primary">
                  Preview
                </Button>
              </Toolbar>
            </AppBar>
            <form style={{ display: 'flex', marginTop: '20px' }}>
              <FormControl fullWidth margin="normal" style={{ marginRight: '10px', marginTop: '10px' }}>
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
              <FormControl fullWidth margin="normal" style={{ marginLeft: '10px', marginTop: '10px' }}>
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
            </form>
            <InputGroup label="Image">
              <Dropzone
                accept="image/bmp, image/gif, image/jpeg, image/png"
                onDrop={this.onDrop}
                multiple={false}
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  width: '100%',
                  height: '200px',
                  border: `1px dashed rgb(181, 181, 181)`,
                  borderRadius: '2px',
                  background: '#383854',
                }}
                acceptStyle={{
                  border: `1px dashed ${constants.colorSuccess}`,
                  background: 'rgba(51, 178, 87, 0.25)',
                }}
                rejectStyle={{
                  border: `1px dashed ${constants.colorDanger}`,
                  background: 'rgba(234, 35, 63, 0.25)',
                }}
              >
                <DropzoneText>Drop image or click to browse</DropzoneText>
              </Dropzone>
            </InputGroup>
            <Button
              disabled={Object.getOwnPropertyNames(this.props.order).length !== 3}
              style={{ marginTop: '20px' }}
              component={Link}
              to="/order-summary"
              variant="raised"
              color="primary"
            >
              Next
            </Button>
          </Container>
        </FlexContainer>
      </Wrapper>
    );
  }
}

const { bool, func, number, arrayOf, shape, string } = PropTypes;
Design.propTypes = {
  getSizeByProduct: func.isRequired,
  getDesignsByProduct: func.isRequired,
  getProducts: func.isRequired,
  setOrderProduct: func.isRequired,
  setOrderSize: func.isRequired,
  order: shape({
    sizeID: number,
    productID: number,
    designID: number,
  }),
  products: arrayOf(shape({})).isRequired,
  sizes: arrayOf(shape({})).isRequired,
  designs: arrayOf(shape({})).isRequired,
  showAlertMessage: bool.isRequired,
  getDesignBySize: func.isRequired,
  setOrderDesign: func.isRequired,
  designUrl: string.isRequired,
  logout: func.isRequired,
};

Design.defaultProps = {
  order: {
    productID: 0,
    sizeID: 0,
    designID: 0,
  },
  showAlertMessage: true,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    order: state.order,
    products: state.product,
    designs: state.design,
    sizes: state.size,
    showAlertMessage: state.message.alert,
    designUrl: state.designSize,
  };
}

export default connect(mapStateToProps, {
  setOrderSize,
  setOrderProduct,
  setOrderDesign,
  getSizeByProduct,
  getProducts,
  getDesignsByProduct,
  getDesignBySize,
  logout,
})(Design);
