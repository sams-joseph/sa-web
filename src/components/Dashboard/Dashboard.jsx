import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { ResponsiveContainer, Tooltip, XAxis, BarChart, Bar } from 'recharts';
import moment from 'moment';
import { getOrderHistory } from '../../actions/orderHistory';
import { getOrderHistoryByMonth, getOrderHistoryByProduct, getOrderHistoryByDesign } from '../../actions/analytics';
import { logout } from '../../actions/auth';
import PaginatedTable from '../PaginatedTable';
import RecentOrder from '../RecentOrder';

import DashboardSvg from './images/dashboard-icon--large.svg';
import AnalyticsSvg from './images/analytics-icon.svg';

import {
  Wrapper,
  SubHeading,
  SectionHeader,
  SectionDescription,
  ChartContainer,
  DashboardIconSmall,
  SectionIcon,
  Container,
  Heading,
  Flex,
} from './Styled';

class Dashboard extends Component {
  state = { loading: true };

  componentWillMount() {
    const year = moment(new Date()).format('YYYY');
    Promise.all([
      this.props.getOrderHistory(),
      this.props.getOrderHistoryByMonth(year),
      this.props.getOrderHistoryByDesign(),
      this.props.getOrderHistoryByProduct(),
    ])
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.props.logout();
      });
  }

  render() {
    const { showAlertMessage, analytics } = this.props;
    const { byMonth, byDesign, byProduct } = analytics;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    byMonth.sort((a, b) => months.indexOf(a.name) - months.indexOf(b.name));

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
              <SectionHeader>
                <SectionIcon src={AnalyticsSvg} alt="Analytics Icon" />Analytics
              </SectionHeader>
              <SectionDescription>Quantities By Category</SectionDescription>
              <Flex>
                <ChartContainer>
                  <SubHeading>By Month</SubHeading>
                  <ResponsiveContainer width={'100%'} height={150}>
                    <BarChart data={byMonth}>
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                      <Bar dataKey="Qty" fill="fill" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <ChartContainer>
                  <SubHeading>By Design</SubHeading>
                  <ResponsiveContainer width={'100%'} height={150}>
                    <BarChart data={byDesign}>
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                      <Bar dataKey="Qty" fill="fill" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <ChartContainer>
                  <SubHeading>By Product</SubHeading>
                  <ResponsiveContainer width={'100%'} height={150}>
                    <BarChart data={byProduct}>
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                      <Bar dataKey="Qty" fill="fill" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Flex>
              <Flex>
                <PaginatedTable />
                <RecentOrder />
              </Flex>
            </div>
          )}
        </Container>
      </Wrapper>
    );
  }
}

const { bool, func, shape } = PropTypes;
Dashboard.propTypes = {
  showAlertMessage: bool.isRequired,
  getOrderHistory: func.isRequired,
  getOrderHistoryByMonth: func.isRequired,
  getOrderHistoryByDesign: func.isRequired,
  getOrderHistoryByProduct: func.isRequired,
  logout: func.isRequired,
  analytics: shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    showAlertMessage: state.message.alert,
    isAuthenticated: !!state.user.token,
    orderHistory: state.orderHistory,
    analytics: state.analytics,
  };
}

export default connect(mapStateToProps, {
  getOrderHistory,
  getOrderHistoryByProduct,
  getOrderHistoryByDesign,
  logout,
  getOrderHistoryByMonth,
})(Dashboard);
