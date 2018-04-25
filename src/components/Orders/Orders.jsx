import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import { FormGroup } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input';
import Search from 'material-ui-icons/Search';
import { connect } from 'react-redux';
import { getOrderHistory } from '../../actions/orderHistory';
import { logout } from '../../actions/auth';
import PaginatedTable from '../PaginatedTable';
import OrderIcon from './images/order-icon.svg';
import Results from './Results';
import constants from '../constants';
import api from '../../api';

import { CloseButton, Wrapper, DashboardIconSmall, Container, Heading, SearchContainer, SearchResults } from './Styled';

class Orders extends Component {
  state = { loading: true, search: '', orders: [], searchLoading: true, showResults: false };

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

  onClick = e => {
    e.preventDefault();
    this.setState({ searchLoading: true, showResults: true });

    api.search
      .byNameDate(this.state.search, 5, 0)
      .then(orders => this.setState({ orders, searchLoading: false }))
      .catch(() => {
        this.props.logout();
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({ showResults: false });
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
            <form onSubmit={this.onClick}>
              <FormGroup>
                <TextField
                  id="search"
                  margin="normal"
                  autoComplete="off"
                  name="search"
                  onChange={this.handleChange}
                  placeholder="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search style={{ fill: constants.almostBlack }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="raised" color="primary">
                  <Search />
                </Button>
              </FormGroup>
            </form>
            {this.state.showResults && (
              <SearchResults>
                <Results loading={this.state.searchLoading} orders={this.state.orders} />
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
