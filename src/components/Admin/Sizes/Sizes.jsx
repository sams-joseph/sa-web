import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import CreateSize from './CreateSize';
import api from '../../../api';

class Sizes extends Component {
  state = { loading: true, sizes: [] };

  componentWillMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({ loading: true });

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
  };

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
            <CreateSize refresh={this.refresh} />
          </div>
        )}
      </div>
    );
  }
}

const { func } = PropTypes;
Sizes.propTypes = {
  logout: func.isRequired,
};

export default Sizes;
