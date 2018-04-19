import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Popover from 'material-ui/Popover';
import { CircularProgress } from 'material-ui/Progress';
import moment from 'moment';
import api from '../../../api';
import CreateLayout from './CreateLayout';

class Layouts extends Component {
  state = { loading: true, layouts: [], anchorEl: null, image: null };

  componentWillMount() {
    this.refresh();
  }

  refresh = () => {
    this.setState({ loading: true });
    api.designSize
      .getAll()
      .then(layouts => {
        const data = layouts.map(layout => ({
          id: layout.id,
          design: layout.design.name,
          size: layout.size.displayName,
          imageUrl: layout.imageUrl,
          createdAt: moment(layout.createdAt).format('MMMM DD, YYYY'),
        }));

        this.setState({
          loading: false,
          layouts: data,
        });
      })
      .catch(() => {
        this.props.logout();
      });
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target, image: event.target.innerText });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { loading, layouts, anchorEl } = this.state;
    const open = !!anchorEl;

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
                  <TableCell>Design</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell numeric>Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {layouts.map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.design}</TableCell>
                    <TableCell>{n.size}</TableCell>
                    <TableCell onMouseOver={this.handlePopoverOpen} onMouseOut={this.handlePopoverClose}>
                      {n.imageUrl}
                    </TableCell>
                    <TableCell numeric>{n.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <Popover
                style={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={this.handlePopoverClose}
                disableRestoreFocus
              >
                <img style={{ margin: '5px 5px 3px 5px' }} src={this.state.image} alt="Thumbnail" height="150" />
              </Popover>
            </Table>
            <CreateLayout refresh={this.refresh} />
          </div>
        )}
      </div>
    );
  }
}

const { func } = PropTypes;
Layouts.propTypes = {
  logout: func.isRequired,
};

export default Layouts;
