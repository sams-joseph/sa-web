import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CircularProgress } from 'material-ui/Progress';
import Tabs, { Tab } from 'material-ui/Tabs';
import { getCsrInformation } from '../../actions/csr';
import { logout } from '../../actions/auth';
import { Wrapper, Container, Heading, AccountIconSmall, StyledList, StyledListItem, ListHeading } from './Styled';
import AccountIcon from './images/settings-icon--large.svg';

class Account extends Component {
  state = { loading: true, value: 0 };

  componentWillMount() {
    this.props
      .getCsrInformation(this.props.user.csrId)
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        this.props.logout();
      });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { loading, value } = this.state;
    const { user, csr } = this.props;
    return (
      <Wrapper>
        <Container padding="30px 0">
          <Heading>
            <AccountIconSmall src={AccountIcon} />Account
          </Heading>
          {loading ? (
            <CircularProgress
              style={{ left: '50%', position: 'absolute', transform: 'translateX(-50%)', marginTop: '50px' }}
            />
          ) : (
            <div>
              <Tabs
                style={{ width: '100%', borderBottom: '1px solid #e0e0e0' }}
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Profile" />
                <Tab label="CSR" />
              </Tabs>
              {value === 0 && (
                <div>
                  <StyledList>
                    <StyledListItem>
                      <ListHeading>Name</ListHeading>
                      {user.firstName} {user.lastName}
                    </StyledListItem>
                    <StyledListItem>
                      <ListHeading>Email</ListHeading>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </StyledListItem>
                  </StyledList>
                  <Link to="/reset-password">Reset password</Link>
                </div>
              )}
              {value === 1 &&
                csr !== null && (
                  <div>
                    <StyledList>
                      <StyledListItem>
                        <ListHeading>Name</ListHeading>
                        {csr.firstName} {csr.lastName}
                      </StyledListItem>
                      <StyledListItem>
                        <ListHeading>Email</ListHeading>
                        <a href={`mailto:${csr.email}`}>{csr.email}</a>
                      </StyledListItem>
                      <StyledListItem>
                        <ListHeading>Phone</ListHeading>
                        {csr.phone}
                      </StyledListItem>
                    </StyledList>
                  </div>
                )}
              {value === 1 &&
                csr === null && (
                  <div>
                    <StyledList>
                      <StyledListItem>
                        <ListHeading>No CSR has been assigned to you.</ListHeading>
                      </StyledListItem>
                    </StyledList>
                  </div>
                )}
            </div>
          )}
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

export default connect(mapStateToProps, { getCsrInformation, logout })(Account);
