import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Validator from 'validator';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import api from '../../../api';
import constants from '../../constants';

class CreateCsr extends React.Component {
  state = {
    open: false,
    data: {
      first: '',
      last: '',
      email: '',
      phone: '',
    },
    errors: {},
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ data: { ...this.state.data, [event.target.name]: event.target.value } });
  };

  submit = () => {
    const data = this.state.data;
    const errors = this.validate(data);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      api.csr
        .create({
          firstName: data.first,
          lastName: data.last,
          email: data.email,
          phone: data.phone,
        })
        .then(() => {
          this.props.refresh();
          this.setState({ open: false });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid Email';
    if (!data.first) errors.firstName = 'Cannot be blank';
    if (!data.last) errors.lastName = 'Cannot be blank';
    if (!data.phone) errors.phone = 'Cannot be blank';

    return errors;
  };

  render() {
    const { first, last, email, phone } = this.state.data;
    const { errors } = this.state;

    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          variant="fab"
          color="primary"
          aria-label="add"
          style={{ marginTop: '70px' }}
        >
          <AddIcon />
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" style={{ color: constants.almostBlack }}>
            Add CSR
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new CSR.</DialogContentText>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              id="first-name"
              name="first"
              error={!!errors.firstName}
              label={errors.firstName ? errors.firstName : 'First Name'}
              type="text"
              value={first}
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              id="last-name"
              name="last"
              error={!!errors.lastName}
              label={errors.lastName ? errors.lastName : 'Last Name'}
              type="text"
              value={last}
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              id="email"
              name="email"
              error={!!errors.email}
              label={errors.email ? errors.email : 'Email'}
              type="email"
              value={email}
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              id="phone"
              name="phone"
              error={!!errors.phone}
              label={errors.phone ? errors.phone : 'Phone'}
              type="text"
              value={phone}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const { func } = PropTypes;
CreateCsr.propTypes = {
  refresh: func.isRequired,
};

export default CreateCsr;
