import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import api from '../../../api';
import constants from '../../constants';

class CreateCsr extends React.Component {
  state = {
    open: false,
    products: [],
    data: {
      name: '',
      height: '',
      width: '',
      product: '',
    },
    errors: {},
  };

  componentWillMount() {
    api.product
      .getProducts()
      .then(products => {
        this.setState({ products });
      })
      .catch(err => {});
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
      api.size
        .create({
          displayName: data.name,
          height: data.height,
          width: data.width,
          productId: data.product,
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
    if (!data.name) errors.name = 'Cannot be blank';
    if (!data.height) errors.height = 'Cannot be blank';
    if (!data.width) errors.width = 'Cannot be blank';
    if (!data.product) errors.product = 'Cannot be blank';

    return errors;
  };

  render() {
    const { name, height, width, product } = this.state.data;
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
            Add Size
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new size.</DialogContentText>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              id="name"
              name="name"
              error={!!errors.name}
              label={errors.name ? errors.name : 'Name'}
              type="text"
              value={name}
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              id="height"
              name="height"
              error={!!errors.height}
              label={errors.height ? errors.height : 'Height'}
              type="text"
              value={height}
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              id="width"
              name="width"
              error={!!errors.width}
              label={errors.width ? errors.width : 'Width'}
              type="text"
              value={width}
              fullWidth
            />
            <FormControl fullWidth style={{ marginTop: '10px' }} error={!!errors.product}>
              <InputLabel htmlFor="csr">{errors.product ? errors.product : 'Product'}</InputLabel>
              <Select
                value={product}
                onChange={this.handleChange}
                inputProps={{
                  name: 'product',
                  id: 'product',
                }}
              >
                {this.state.products.map(productRecord => (
                  <MenuItem key={productRecord.id} value={productRecord.id}>
                    {productRecord.name}
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
CreateCsr.propTypes = {
  refresh: func.isRequired,
};

export default CreateCsr;
