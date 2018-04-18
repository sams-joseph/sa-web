import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import moment from 'moment';
import api from '../../api';

class Sizes extends Component {
  state = { loading: true, sizes: [] };

  componentWillMount() {
    api.size
      .getSizes()
      .then(sizes => {
        const data = sizes.map(size => ({
          id: size.id,
          name: size.displayName,
          height: size.height,
          width: size.width,
          createdAt: moment(size.createdAt).format('MMMM DD, YYYY'),
        }));

        this.setState({
          loading: false,
          sizes: data,
        });
      })
      .catch(() => {
        this.props.logout();
      });
  }

  render() {
    const { loading, sizes } = this.state;
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
                  <TableCell numeric>Height</TableCell>
                  <TableCell numeric>Width</TableCell>
                  <TableCell numeric>Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizes.map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell numeric>{n.height}</TableCell>
                    <TableCell numeric>{n.width}</TableCell>
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

export default Sizes;
