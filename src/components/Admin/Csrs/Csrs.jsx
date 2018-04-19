import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import api from '../../../api';
import CreateCsr from './CreateCsr';

class Csrs extends Component {
  state = { loading: true, csrs: [] };

  componentWillMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({ loading: true });
    api.csr
      .getAll()
      .then(csrs => {
        const data = csrs.map(csr => ({
          id: csr.id,
          firstName: csr.firstName,
          lastName: csr.lastName,
          email: csr.email,
          createdAt: moment(csr.createdAt).format('MMMM DD, YYYY'),
          phone: csr.phone,
        }));

        this.setState({
          loading: false,
          csrs: data,
        });
      })
      .catch(() => {
        this.props.logout();
      });
  };

  render() {
    const { loading, csrs } = this.state;
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
                  <TableCell>Phone</TableCell>
                  <TableCell numeric>Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csrs.map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.firstName}</TableCell>
                    <TableCell>{n.lastName}</TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{n.phone}</TableCell>
                    <TableCell numeric>{n.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CreateCsr refresh={this.refresh} />
          </div>
        )}
      </div>
    );
  }
}

const { func } = PropTypes;
Csrs.propTypes = {
  logout: func.isRequired,
};

export default Csrs;
