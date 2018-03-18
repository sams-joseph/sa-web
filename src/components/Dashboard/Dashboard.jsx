import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { ResponsiveContainer, Tooltip, PieChart, Pie } from 'recharts';
import { getOrderHistory } from '../../actions/orderHistory';
import { logout } from '../../actions/auth';
import PaginatedTable from '../PaginatedTable';
import RecentOrder from '../RecentOrder';

import api from '../../api';
import DashboardSvg from './images/dashboard-icon--large.svg';

import { Wrapper, PieHeading, PieContainer, DashboardIconSmall, Container, Heading, Flex } from './Styled';

class Dashboard extends Component {
  state = { loading: true, parts: [], recentOrderNumber: '' };

  componentWillMount() {
    this.props
      .getOrderHistory()
      .then(() => {
        api.order.getOrderParts(this.props.orderHistory[this.props.orderHistory.length - 1].id).then(parts => {
          this.setState({
            loading: false,
            parts,
            recentOrderNumber: this.props.orderHistory[this.props.orderHistory.length - 1].id + 100000,
          });
        });
      })
      .catch(err => {
        this.props.logout();
      });
  }

  render() {
    const { showAlertMessage } = this.props;
    const data = [
      { name: 'Jan', value: 12, fill: '#FF6D00', Qty: 3 },
      { name: 'Feb', value: 20, fill: '#F57C00', Qty: 6 },
      { name: 'Mar', value: 20, fill: '#FB8C00', Qty: 2 },
      { name: 'Apr', value: 20, fill: '#FFE0B2', Qty: 8 },
      { name: 'May', value: 20, fill: '#FFCC80', Qty: 4 },
      { name: 'Jun', value: 20, fill: '#FFB74D', Qty: 3 },
      { name: 'Jul', value: 20, fill: '#FFA726', Qty: 12 },
      { name: 'Aug', value: 20, fill: '#FF9800', Qty: 5 },
      { name: 'Sep', value: 20, fill: '#FB8C00', Qty: 0 },
      { name: 'Oct', value: 20, fill: '#F57C00', Qty: 7 },
      { name: 'Nov', value: 20, fill: '#EF6C00', Qty: 2 },
      { name: 'Dec', value: 20, fill: '#E65100', Qty: 9 },
    ];

    const sizeData = [
      { name: '14 x 48', value: 12, fill: '#FB8C00', Qty: 3 },
      { name: '30 Sheet', value: 20, fill: '#F57C00', Qty: 6 },
      { name: '10 x 40', value: 20, fill: '#E65100', Qty: 2 },
      { name: '10 x 36', value: 20, fill: '#FF6D00', Qty: 4 },
    ];

    const designData = [
      { name: 'Victim', value: 12, fill: '#F57C00', Qty: 3 },
      { name: 'Survivor', value: 20, fill: '#E65100', Qty: 6 },
      { name: 'Action', value: 20, fill: '#FF6D00', Qty: 2 },
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
                <PieContainer>
                  <PieHeading>
                    By<br />Month
                  </PieHeading>
                  <ResponsiveContainer width={250} height={250}>
                    <PieChart>
                      <Pie data={data} dataKey="Qty" label nameKey="name" innerRadius={70} fill={data.fill} />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </PieContainer>
                <PieContainer>
                  <PieHeading>
                    By<br />Design
                  </PieHeading>
                  <ResponsiveContainer width={250} height={250}>
                    <PieChart>
                      <Pie data={designData} dataKey="Qty" label nameKey="name" innerRadius={70} fill={data.fill} />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </PieContainer>
                <PieContainer>
                  <PieHeading>
                    By<br />Product
                  </PieHeading>
                  <ResponsiveContainer width={250} height={250}>
                    <PieChart>
                      <Pie data={sizeData} dataKey="Qty" label nameKey="name" innerRadius={70} fill={data.fill} />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </PieContainer>
              </Flex>
              <Flex>
                <PaginatedTable />
                <RecentOrder orderNumber={this.state.recentOrderNumber} parts={this.state.parts} />
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
