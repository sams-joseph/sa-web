import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Validator from 'validator';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import api from '../../../api';
import constants from '../../constants';

class CreateUser extends React.Component {
  state = {
    open: false,
    csrs: [],
    roles: [],
    data: {
      csr: '',
      role: '',
      first: '',
      last: '',
      email: '',
      pass: '',
      confirm: '',
    },
    errors: {},
  };

  componentWillMount() {
    const csrData = [];
    const roleData = [];
    Promise.all([api.csr.getAll(), api.role.getAll()])
      .then(results => {
        results[0].forEach(csr => {
          csrData.push({ id: csr.id, name: `${csr.firstName} ${csr.lastName}` });
        });

        results[1].forEach(role => {
          roleData.push({ id: role.id, name: role.name });
        });
      })
      .catch(err => { });

    this.setState({ csrs: csrData, roles: roleData });
  }

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
      api.user
        .create({
          firstName: data.first,
          lastName: data.last,
          email: data.email,
          password: data.pass,
          roleId: data.role,
          csrId: data.csr,
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
    if (!data.pass) errors.password = 'Cannot be blank';
    if (!data.confirm) errors.password = 'Cannot be blank';
    if (data.pass !== data.confirm) errors.password = 'Both passwords must match';

    return errors;
  };

  render() {
    const { first, last, email, pass, confirm, csr, role } = this.state.data;
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
            Add User
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new user.</DialogContentText>
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
              id="pass"
              name="pass"
              error={!!errors.password}
              label={errors.password ? errors.password : 'Password'}
              type="password"
              value={pass}
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              id="confirm-pass"
              name="confirm"
              error={!!errors.password}
              label={errors.password ? errors.password : 'Confirm Password'}
              type="password"
              value={confirm}
              fullWidth
            />
            <FormControl fullWidth style={{ marginTop: '10px' }}>
              <InputLabel htmlFor="csr">Csr</InputLabel>
              <Select
                value={csr}
                onChange={this.handleChange}
                inputProps={{
                  name: 'csr',
                  id: 'csr',
                }}
              >
                {this.state.csrs.map(csrRecord => (
                  <MenuItem key={csrRecord.id} value={csrRecord.id}>
                    {csrRecord.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '10px' }}>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                value={role}
                onChange={this.handleChange}
                inputProps={{
                  name: 'role',
                  id: 'role',
                }}
              >
                {this.state.roles.map(roleRecord => (
                  <MenuItem key={roleRecord.id} value={roleRecord.id}>
                    {roleRecord.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
CreateUser.propTypes = {
  refresh: func.isRequired,
};

export default CreateUser;
