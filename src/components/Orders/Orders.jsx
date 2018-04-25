import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input';
import NavigateNext from 'material-ui-icons/NavigateNext';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Search from 'material-ui-icons/Search';
import { connect } from 'react-redux';
import { getOrderHistory } from '../../actions/orderHistory';
import { logout } from '../../actions/auth';
import PaginatedTable from '../PaginatedTable';
import OrderIcon from './images/order-icon.svg';
import Results from './Results';
import constants from '../constants';
import api from '../../api';

import {
  FlexField,
  CloseButton,
  Wrapper,
  DashboardIconSmall,
  Container,
  Heading,
  SearchContainer,
  SearchResults,
  FormGroup,
} from './Styled';

class Orders extends Component {
  state = { loading: true, search: '', orders: [], searchLoading: true, showResults: false, offset: 0, errors: {} };

  componentWillMount() {
    this.props
      .getOrderHistory()
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        this.props.logout();
      });
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ errors: {} });
    const errors = this.validate(this.state.search);
    if (Object.keys(errors).length === 0) {
      this.setState({ searchLoading: true, showResults: true, isEnd: false, offset: 0 });
      api.search
        .byNameDate(this.state.search, 5, 0)
        .then(orders => {
          if (orders.length < 5) {
            this.setState({ isEnd: true });
          }
          this.setState({ orders, searchLoading: false });
        })
        .catch(() => {
          this.props.logout();
        });
    } else {
      this.setState({
        errors,
      });
      this.handleClose();
    }
  };

  validate = search => {
    const errors = {};
    if (search.length === 0) errors.search = 'Search field left blank';

    return errors;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({ showResults: false });
  };

  handleNext = () => {
    const nextSet = this.state.offset + 5;
    this.setState({ searchLoading: true, offset: nextSet });
    api.search
      .byNameDate(this.state.search, 5, nextSet)
      .then(orders => {
        if (orders.length < 5) {
          this.setState({ isEnd: true });
        }
        this.setState({ orders, searchLoading: false });
      })
      .catch(() => {
        this.props.logout();
      });
  };

  handlePrev = () => {
    const prevSet = this.state.offset - 5;
    this.setState({ searchLoading: true, offset: prevSet, isEnd: false });
    api.search
      .byNameDate(this.state.search, 5, prevSet)
      .then(orders => {
        this.setState({ orders, searchLoading: false });
      })
      .catch(() => {
        this.props.logout();
      });
  };

  render() {
    const { showAlertMessage } = this.props;

    return (
      <Wrapper alertMessage={showAlertMessage}>
        <Container>
          <Heading>
            <DashboardIconSmall src={OrderIcon} alt="Empty Cart" />Orders
          </Heading>
          <SearchContainer>
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                <FlexField>
                  <TextField
                    id="search"
                    margin="normal"
                    autoComplete="off"
                    name="search"
                    error={!!this.state.errors.search}
                    fullWidth
                    label={this.state.errors.search ? this.state.errors.search : ''}
                    onChange={this.handleChange}
                    placeholder="Name or Date"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search style={{ fill: constants.almostBlack }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FlexField>
                <div>
                  <Button fullWidth type="submit" variant="raised" color="primary">
                    <Search />
                  </Button>
                </div>
              </FormGroup>
            </form>
            {this.state.showResults && (
              <SearchResults>
                <Results loading={this.state.searchLoading} orders={this.state.orders} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton aria-label="Previous" onClick={this.handlePrev} disabled={this.state.offset <= 0}>
                    <NavigateBefore />
                  </IconButton>
                  <IconButton aria-label="Next" disabled={this.state.isEnd} onClick={this.handleNext}>
                    <NavigateNext />
                  </IconButton>
                </div>
                <CloseButton onClick={this.handleClose}>Close</CloseButton>
              </SearchResults>
            )}
          </SearchContainer>
          {this.state.loading ? (
            <CircularProgress
              style={{ left: '50%', position: 'absolute', transform: 'translateX(-50%)', marginTop: '50px' }}
            />
          ) : (
            <PaginatedTable rowsPerPage={25} />
          )}
        </Container>
      </Wrapper>
    );
  }
}

const { bool, func } = PropTypes;
Orders.propTypes = {
  showAlertMessage: bool.isRequired,
  getOrderHistory: func.isRequired,
  logout: func.isRequired,
};

function mapStateToProps(state) {
  return {
    showAlertMessage: state.message.alert,
    isAuthenticated: !!state.user.token,
    orderHistory: state.orderHistory,
  };
}

export default connect(mapStateToProps, {
  getOrderHistory,
  logout,
})(Orders);
