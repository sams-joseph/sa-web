import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import upload from 'superagent';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { getProducts } from '../../actions/product';
import { setOrderProduct, setOrderImage, setOrderSize, setOrderDesign, setOrderQuantity } from '../../actions/order';
import { getSizeByProduct } from '../../actions/size';
import { getDesignsByProduct } from '../../actions/design';
import { getDesignBySize } from '../../actions/designSize';
import { logout } from '../../actions/auth';
import { FlexContainer, ButtonGarden, StepperContainer, Container, Wrapper } from './Styled';
import Product from '../Product';
import Size from '../Size';
import Design from '../Design';
import Creative from '../Creative';
import Completion from '../Completion';

import constants from '../constants';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '1140px',
    padding: '0 20px',
    margin: '20px auto 70px auto',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  stepper: {
    background: 'none',
    width: '100%',
    marginBottom: '70px',
  },
});

function b64toBlob(b64Data, contentType = '') {
  const sliceSize = 512;
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'image/png' });
  return blob;
}

function getSteps() {
  return ['Select Product', 'Select Size', 'Select Design', 'Finalize Design'];
}

class Order extends Component {
  state = {
    uploading: false,
    activeStep: 0,
    checkedProduct: 0,
    checkedSize: 0,
    checkedDesign: 0,
  };

  componentWillMount() {
    this.props
      .getProducts()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.props.logout();
      });
  }

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <FlexContainer>
            {this.props.product.products.map(product => (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                imageUrl={product.imageUrl}
                checkedID={this.state.checkedProduct}
                selectProduct={this.selectProduct}
              />
            ))}
          </FlexContainer>
        );
      case 1:
        return (
          <FlexContainer>
            {this.props.size.sizes.map(size => (
              <Size
                key={size.id}
                id={size.id}
                name={size.displayName}
                height={size.height}
                width={size.width}
                checkedID={this.state.checkedSize}
                selectSize={this.selectSize}
              />
            ))}
          </FlexContainer>
        );
      case 2:
        return (
          <FlexContainer>
            {this.props.design.designs.map(design => (
              <Design
                key={design.id}
                id={design.id}
                name={design.name}
                description={design.description}
                imageUrl={design.imageUrl}
                checkedID={this.state.checkedDesign}
                selectDesign={this.selectDesign}
              />
            ))}
          </FlexContainer>
        );
      case 3:
        return <Creative onRef={ref => (this.child = ref)} />;
      default:
        return 'Uknown stepIndex';
    }
  };

  selectProduct = (productID, productName) => {
    this.props.setOrderProduct({ productID, productName });
    this.setState({
      checkedProduct: productID,
    });

    this.props.getSizeByProduct(productID);
  };

  selectSize = (sizeID, sizeName, sizeHeight, sizeWidth) => {
    this.props.setOrderSize({ sizeID, sizeName, sizeHeight, sizeWidth });
    this.setState({
      checkedSize: sizeID,
    });

    this.props.getDesignsByProduct(this.state.checkedProduct);
  };

  selectDesign = (designID, designName) => {
    this.props.setOrderDesign({ designID, designName });
    this.setState({
      checkedDesign: designID,
    });

    this.props.getDesignBySize(designID, this.state.checkedSize);
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });

    if (activeStep === 3) {
      this.child.getImageData();
    }
  };

  addToCart = () => {
    const { activeStep } = this.state;
    const data = this.child.getImageData();
    if (data.errors) {
      this.setState({
        errors: data.errors,
      });
    } else {
      this.setState({
        uploading: true,
      });

      this.props.setOrderQuantity(1);
      const block = data.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = b64toBlob(realData, contentType);

      upload
        .post(`${process.env.REACT_APP_API_HOST}/api/uploads/mock`)
        .set('Authorization', `Bearer ${this.props.token}`)
        .attach('image', blob, 'mockup.png')
        .end((err, res) => {
          if (err) {
            console.log(err);
            return;
          }
          this.props.setOrderImage(res.body.file.location);
          this.setState({
            uploading: false,
            activeStep: activeStep + 1,
            checkedProduct: 0,
            checkedSize: 0,
            checkedDesign: 0,
          });
        });
    }
  };

  handleBack = () => {
    const { activeStep } = this.state;
    if (activeStep - 1 === 2) {
      this.setState({
        activeStep: activeStep - 1,
        checkedDesign: 0,
      });
    } else if (activeStep - 1 === 1) {
      this.setState({
        activeStep: activeStep - 1,
        checkedSize: 0,
        checkedDesign: 0,
      });
    } else if (activeStep - 1 === 0) {
      this.setState({
        activeStep: activeStep - 1,
        checkedProduct: 0,
        checkedSize: 0,
        checkedDesign: 0,
      });
    } else {
      this.setState({
        activeStep: activeStep - 1,
      });
    }
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes, order } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <Wrapper>
        <StepperContainer>
          <Container>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Container>
        </StepperContainer>
        <Container>
          <div>
            {this.state.activeStep === steps.length ? (
              <ButtonGarden>
                <div style={{ minHeight: 'calc(100vh - 435px)' }}>
                  <Completion headline="Success!" message="Your item has been added to your cart" />
                  <Button style={{ marginRight: '10px' }} color="primary" component={Link} to="/cart">
                    To Cart
                  </Button>
                  <Button style={{ marginLeft: '10px' }} variant="raised" color="primary" onClick={this.handleReset}>
                    New Order
                  </Button>
                </div>
              </ButtonGarden>
            ) : (
              <div>
                <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                <div>
                  <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.backButton}>
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      disabled={
                        (activeStep === 0 && !order.product) ||
                        (activeStep === 1 && !order.size) ||
                        (activeStep === 2 && !order.design) ||
                        this.state.uploading
                      }
                      variant="raised"
                      color="primary"
                      onClick={this.addToCart}
                    >
                      {this.state.uploading ? (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                          style={{
                            color: constants.defaultPrimaryColor,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: -12,
                            marginLeft: -12,
                          }}
                        />
                      ) : (
                        'Add to Cart'
                      )}
                    </Button>
                  ) : (
                    <Button
                      disabled={
                        (activeStep === 0 && !order.product) ||
                        (activeStep === 1 && !order.size) ||
                        (activeStep === 2 && !order.design)
                      }
                      variant="raised"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </Wrapper>
    );
  }
}

const { shape, func } = PropTypes;
Order.propTypes = {
  classes: shape({}).isRequired,
  product: shape({}).isRequired,
  size: shape({}).isRequired,
  design: shape({}).isRequired,
  getProducts: func.isRequired,
  logout: func.isRequired,
  setOrderProduct: func.isRequired,
  order: shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    product: state.product,
    size: state.size,
    design: state.design,
    showAlertMessage: state.message.alert,
    order: state.order,
    token: state.user.token,
  };
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    getProducts,
    logout,
    setOrderProduct,
    getSizeByProduct,
    getDesignsByProduct,
    setOrderSize,
    setOrderDesign,
    getDesignBySize,
    setOrderQuantity,
    setOrderImage,
  })
)(Order);
