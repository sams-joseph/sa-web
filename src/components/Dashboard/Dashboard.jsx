import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { getOrderHistory } from '../../actions/orderHistory';
import { logout } from '../../actions/auth';
import PaginatedTable from '../PaginatedTable';

import DashboardSvg from './images/dashboard-icon--large.svg';

import { Wrapper, DashboardIconSmall, Container, Heading, Flex, MonthGraph, ProductGraph, SubHeading } from './Styled';

class Dashboard extends Component {
  state = { loading: true };

  componentDidMount() {
    this.props
      .getOrderHistory()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(err => {
        this.props.logout();
      });
  }

  render() {
    const { showAlertMessage } = this.props;
    const data = [
      { name: 'Jan', value: 12, fill: '#0091EA', Qty: 3 },
      { name: 'Feb', value: 20, fill: '#0091EA', Qty: 6 },
      { name: 'Mar', value: 20, fill: '#0091EA', Qty: 2 },
      { name: 'Apr', value: 20, fill: '#0091EA', Qty: 8 },
      { name: 'May', value: 20, fill: '#0091EA', Qty: 4 },
      { name: 'Jun', value: 20, fill: '#0091EA', Qty: 3 },
      { name: 'Jul', value: 20, fill: '#0091EA', Qty: 12 },
      { name: 'Aug', value: 20, fill: '#0091EA', Qty: 5 },
      { name: 'Sep', value: 20, fill: '#0091EA', Qty: 0 },
      { name: 'Oct', value: 20, fill: '#0091EA', Qty: 7 },
      { name: 'Nov', value: 20, fill: '#0091EA', Qty: 2 },
      { name: 'Dec', value: 20, fill: '#0091EA', Qty: 9 },
    ];

    const sizeData = [
      { name: '14 x 48', value: 12, fill: '#00BFA5', Qty: 3 },
      { name: '30 Sheet', value: 20, fill: '#00BFA5', Qty: 6 },
      { name: '10 x 40', value: 20, fill: '#00BFA5', Qty: 2 },
      { name: '10 x 36', value: 20, fill: '#00BFA5', Qty: 4 },
    ];

    return (
      <Wrapper alertMessage={showAlertMessage}>
        <Container>
          <Heading>
            <DashboardIconSmall src={DashboardSvg} alt="Empty Cart" />Dashboard
          </Heading>
          {this.state.loading ? (
            <CircularProgress
              style={{ left: '50%', position: 'absolute', transform: 'translateX(-50%)', marginTop: '50px' }}
            />
          ) : (
            <div>
              <Flex>
                <MonthGraph>
                  <SubHeading>Monthly</SubHeading>
                  <ResponsiveContainer width={'100%'} height={150}>
                    <BarChart data={data}>
                      <XAxis tickLine={false} dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="Qty" />
                    </BarChart>
                  </ResponsiveContainer>
                </MonthGraph>
                <ProductGraph>
                  <SubHeading>Product Quantity</SubHeading>
                  <ResponsiveContainer width={'100%'} height={150}>
                    <BarChart data={sizeData}>
                      <XAxis tickLine={false} dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="Qty" />
                    </BarChart>
                  </ResponsiveContainer>
                </ProductGraph>
              </Flex>
              <SubHeading>Order History</SubHeading>
              <PaginatedTable />
            </div>
          )}
        </Container>
      </Wrapper>
    );
  }
}

const { bool, func } = PropTypes;
Dashboard.propTypes = {
  showAlertMessage: bool.isRequired,
  getOrderHistory: func.isRequired,
  logout: func.isRequired,
};

function mapStateToProps(state) {
  return {
    showAlertMessage: state.message.alert,
    isAuthenticated: !!state.user.token,
  };
}

export default connect(mapStateToProps, { getOrderHistory, logout })(Dashboard);
