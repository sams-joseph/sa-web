import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import api from '../../../api';

class Roles extends Component {
  state = { loading: true, roles: [] };

  componentWillMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({ loading: true });
    api.role
      .getAll()
      .then(roles => {
        const data = roles.map(role => ({
          id: role.id,
          name: role.name,
          createdAt: moment(role.createdAt).format('MMMM DD, YYYY'),
        }));

        this.setState({
          loading: false,
          roles: data,
        });
      })
      .catch(() => {
        this.props.logout();
      });
  };

  render() {
    const { loading, roles } = this.state;
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
                  <TableCell>Name</TableCell>
                  <TableCell numeric>Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell numeric>{n.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

const { func } = PropTypes;
Roles.propTypes = {
  logout: func.isRequired,
};

export default Roles;
