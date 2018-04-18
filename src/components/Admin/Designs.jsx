import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Popover from 'material-ui/Popover';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import moment from 'moment';
import api from '../../api';

class Designs extends Component {
  state = { loading: true, designs: [], anchorEl: null, image: null };

  componentWillMount() {
    api.design
      .getAllDesigns()
      .then(designs => {
        const data = designs.map(design => ({
          id: design.id,
          name: design.name,
          description: design.description,
          imageUrl: design.imageUrl,
          createdAt: moment(design.createdAt).format('MMMM DD, YYYY'),
        }));

        this.setState({
          loading: false,
          designs: data,
        });
      })
      .catch(() => {
        this.props.logout();
      });
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target, image: event.target.innerText });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { loading, designs, anchorEl } = this.state;
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
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell numeric>Created On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {designs.map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.description}</TableCell>
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
            <Button variant="fab" color="primary" aria-label="add" style={{ marginTop: '40px' }}>
              <AddIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Designs;
