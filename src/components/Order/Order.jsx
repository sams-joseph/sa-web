import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import { getProducts } from '../../actions/product';
import { setOrderProduct, setOrderSize, setOrderDesign } from '../../actions/order';
import { getSizeByProduct } from '../../actions/size';
import { getDesignsByProduct } from '../../actions/design';
import { getDesignBySize } from '../../actions/designSize';
import { logout } from '../../actions/auth';
import { FlexContainer, ButtonGarden } from './Styled';
import Product from '../Product';
import Size from '../Size';
import Design from '../Design';
import Creative from '../Creative';
import Summary from '../Summary';
import Completion from '../Completion';

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
    marginBottom: '70px',
  },
});

function getSteps() {
  return ['Select Product', 'Select Size', 'Select Design', 'Finalize Design', 'Review Order'];
}

class Order extends Component {
  state = {
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
            {this.props.products.map(product => (
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
            {this.props.sizes.map(size => (
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
            {this.props.designs.map(design => (
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
      case 4:
        return <Summary />;
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

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
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
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <ButtonGarden>
              <Completion />
              <Button style={{ marginRight: '10px' }} color="primary" component={Link} to="/dashboard">
                To Dashboard
              </Button>
              <Button style={{ marginLeft: '10px' }} variant="raised" color="primary" onClick={this.handleReset}>
                New Order
              </Button>
            </ButtonGarden>
          ) : (
            <div>
              <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
              <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.backButton}>
                  Back
                </Button>
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
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const { shape, func } = PropTypes;
Order.propTypes = {
  classes: shape({}).isRequired,
  products: shape({}).isRequired,
  getProducts: func.isRequired,
  logout: func.isRequired,
  setOrderProduct: func.isRequired,
  order: shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    products: state.product,
    sizes: state.size,
    designs: state.design,
    showAlertMessage: state.message.alert,
    order: state.order,
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
  })
)(Order);
