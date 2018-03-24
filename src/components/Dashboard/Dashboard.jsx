import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { ResponsiveContainer, Tooltip, XAxis, BarChart, Bar } from 'recharts';
import { getOrderHistory } from '../../actions/orderHistory';
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
    this.props
      .getOrderHistory()
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
        // this.props.logout();
      });
  }

  render() {
    const { showAlertMessage } = this.props;
    const data = [
      { name: 'Jan', value: 12, fill: '#448AFF', Qty: 3 },
      { name: 'Feb', value: 20, fill: '#2979FF', Qty: 6 },
      { name: 'Mar', value: 20, fill: '#2962FF', Qty: 2 },
      { name: 'Apr', value: 20, fill: '#BBDEFB', Qty: 8 },
      { name: 'May', value: 20, fill: '#90CAF9', Qty: 4 },
      { name: 'Jun', value: 20, fill: '#64B5F6', Qty: 3 },
      { name: 'Jul', value: 20, fill: '#42A5F5', Qty: 12 },
      { name: 'Aug', value: 20, fill: '#2196F3', Qty: 5 },
      { name: 'Sep', value: 20, fill: '#1E88E5', Qty: 0 },
      { name: 'Oct', value: 20, fill: '#1976D2', Qty: 7 },
      { name: 'Nov', value: 20, fill: '#1565C0', Qty: 2 },
      { name: 'Dec', value: 20, fill: '#0D47A1', Qty: 9 },
    ];

    const sizeData = [
      { name: '14 x 48', value: 12, fill: '#0D47A1', Qty: 3 },
      { name: '30 Sheet', value: 20, fill: '#1565C0', Qty: 6 },
      { name: '10 x 40', value: 20, fill: '#1976D2', Qty: 2 },
      { name: '10 x 36', value: 20, fill: '#1E88E5', Qty: 4 },
    ];

    const designData = [
      { name: 'Victim', value: 12, fill: '#0D47A1', Qty: 3 },
      { name: 'Survivor', value: 20, fill: '#1565C0', Qty: 6 },
      { name: 'Action', value: 20, fill: '#1976D2', Qty: 2 },
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
                <SectionHeader>
                  <SectionIcon src={AnalyticsSvg} alt="Analytics Icon" />Analytics
              </SectionHeader>
                <SectionDescription>Quantities By Category</SectionDescription>
                <Flex>
                  <ChartContainer>
                    <SubHeading>By Month</SubHeading>
                    <ResponsiveContainer width={'100%'} height={150}>
                      <BarChart data={data}>
                        <XAxis dataKey="name" hide />
                        <Tooltip />
                        <Bar dataKey="Qty" fill="fill" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <ChartContainer>
                    <SubHeading>By Design</SubHeading>
                    <ResponsiveContainer width={'100%'} height={150}>
                      <BarChart data={designData}>
                        <XAxis dataKey="name" hide />
                        <Tooltip />
                        <Bar dataKey="Qty" fill={data.fill} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <ChartContainer>
                    <SubHeading>By Product</SubHeading>
                    <ResponsiveContainer width={'100%'} height={150}>
                      <BarChart data={sizeData}>
                        <XAxis dataKey="name" hide />
                        <Tooltip />
                        <Bar dataKey="Qty" fill={data.fill} />
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
    orderHistory: state.orderHistory,
  };
}

export default connect(mapStateToProps, { getOrderHistory, logout })(Dashboard);
