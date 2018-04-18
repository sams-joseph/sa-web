import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import moment from 'moment';
import api from '../../api';

class Csrs extends Component {
  state = { loading: true, csrs: [] };

  componentWillMount() {
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
  }

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
            <Button variant="fab" color="primary" aria-label="add" style={{ marginTop: '40px' }}>
              <AddIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Csrs;
