import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import CreateUser from './CreateUser';
import api from '../../../api';

class Users extends Component {
  state = { loading: true, users: [] };

  componentWillMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({
      loading: true,
    });

    api.user
      .getAll()
      .then(users => {
        const data = users.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: moment(user.createdAt).format('MMMM DD, YYYY'),
          csr: `${user.csr.firstName} ${user.csr.lastName}`,
          role: user.role.name,
        }));

        this.setState({
          loading: false,
          users: data,
        });
      })
      .catch(() => {
        this.props.logout();
      });
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div>
        {loading ? (
          <CircularProgress
            style={{ left: '50%', position: 'absolute', transform: 'translateX(-50%)', marginTop: '50px' }}
          />
        ) : (
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>CSR</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell numeric>Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.firstName}</TableCell>
                    <TableCell>{n.lastName}</TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{n.csr}</TableCell>
                    <TableCell>{n.role}</TableCell>
                    <TableCell numeric>{n.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CreateUser refresh={this.refresh} />
          </div>
        )}
      </div>
    );
  }
}

const { func } = PropTypes;
Users.propTypes = {
  logout: func.isRequired,
};

export default Users;
