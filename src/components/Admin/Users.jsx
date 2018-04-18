import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import moment from 'moment';
import api from '../../api';

class Users extends Component {
  state = { loading: true, users: [] };

  componentWillMount() {
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
  }

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
            <Button variant="fab" color="primary" aria-label="add" style={{ marginTop: '40px' }}>
              <AddIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Users;
