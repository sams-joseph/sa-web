import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Search from 'material-ui-icons/Search';
import { connect } from 'react-redux';
import { getOrderHistory } from '../../actions/orderHistory';
import { logout } from '../../actions/auth';
import PaginatedTable from '../PaginatedTable';
import OrderIcon from './images/order-icon.svg';
import Results from './Results';
import constants from '../constants';

import { Wrapper, DashboardIconSmall, Container, Heading, SearchContainer, SearchResults } from './Styled';

class Orders extends Component {
  state = { loading: true, search: '' };

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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
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
            <TextField
              id="search"
              margin="normal"
              autoComplete="off"
              fullWidth
              name="search"
              onChange={this.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search style={{ fill: constants.almostBlack }} />
                  </InputAdornment>
                ),
              }}
            />
            {this.state.search && (
              <SearchResults>
                <Results query={this.state.search} />
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
