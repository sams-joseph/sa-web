import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import { addShipping } from '../../actions/shipping';
import Shipping from '../Shipping';
import Review from '../Review';
import CheckoutMessage from '../CheckoutMessage';

import { Container, ButtonGarden, StepperContainer } from './Styled';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '1140px',
    margin: '20px 0 70px 0',
    padding: '20px 0',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  stepper: {
    margin: '0 auto 70px auto',
    background: 'none',
    maxWidth: '600px',
    padding: '20px 0',
  },
});

function getSteps() {
  return ['Shipping', 'Review'];
}

class Checkout extends Component {
  state = {
    activeStep: 0,
    data: {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    errors: {},
  };

  componentWillMount() {
    if (Object.keys(this.props.cart.byHash).length === 0) {
      this.props.history.push('/dashboard');
    }
  }

  getStepContent = step => {
    switch (step) {
      case 0:
        return <Shipping data={this.state.data} onChange={this.handleChange} errors={this.state.errors} />;
      case 1:
        return <Review />;
      default:
        return 'Unknown step';
    }
  };

  validate = data => {
    const errors = {};
    if (!data.name) errors.name = 'Cannot be blank';
    if (!data.address) errors.address = 'Cannot be blank';
    if (!data.city) errors.city = 'Cannot be blank';
    if (!data.state) errors.state = 'Cannot be blank';
    if (!data.zip) errors.zip = 'Cannot be blank';

    return errors;
  };

  handleChange = (name, value) => {
    this.setState({ data: { ...this.state.data, [name]: value } });
  };

  handleNext = () => {
    const { activeStep } = this.state;
    if (activeStep === 0) {
      const errors = this.validate(this.state.data);
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        this.props.addShipping(this.state.data);
        this.setState({
          activeStep: activeStep + 1,
        });
      }
    } else if (activeStep === 1) {
      this.setState({
        activeStep: activeStep + 1,
      });
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
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <StepperContainer>
          <Container>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => {
                const props = {};
                const labelProps = {};
                return (
                  <Step key={label} {...props}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Container>
        </StepperContainer>
        <Container>
          <div>
            {activeStep === steps.length ? (
              <ButtonGarden>
                <CheckoutMessage history={this.props.history} headline="Complete" message="Order placed successfully" />
              </ButtonGarden>
            ) : (
              <div>
                {this.getStepContent(activeStep)}
                <div>
                  <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                    Back
                  </Button>
                  <Button
                    variant="raised"
                    color={activeStep === 1 ? 'secondary' : 'primary'}
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === 1 ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps, { addShipping }))(Checkout);
