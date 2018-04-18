import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import { getCsrInformation } from '../../actions/csr';
import { logout } from '../../actions/auth';
import { Wrapper, Container, Heading, AccountIconSmall } from './Styled';
import SecurityIcon from './images/security-icon.svg';
import Users from './Users';
import Csrs from './Csrs';
import Products from './Products';
import Sizes from './Sizes';
import Designs from './Designs';

class Admin extends Component {
  state = { loading: true, value: 0 };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Wrapper>
        <Container padding="30px 0">
          <Heading>
            <AccountIconSmall src={SecurityIcon} />Admin
          </Heading>
          <Tabs
            style={{ width: '100%', marginBottom: '40px', borderBottom: '1px solid #e0e0e0' }}
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="User" />
            <Tab label="CSR" />
            <Tab label="Product" />
            <Tab label="Size" />
            <Tab label="Design" />
          </Tabs>
          {value === 0 && <Users logout={this.props.logout} />}
          {value === 1 && <Csrs logout={this.props.logout} />}
          {value === 2 && <Products logout={this.props.logout} />}
          {value === 3 && <Sizes logout={this.props.logout} />}
          {value === 4 && <Designs logout={this.props.logout} />}
        </Container>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    csr: state.csr,
    user: state.user,
  };
}

export default connect(mapStateToProps, { getCsrInformation, logout })(Admin);
