import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import upload from 'superagent';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Dropzone from 'react-dropzone';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import api from '../../../api';
import constants from '../../constants';

import { DropzoneText } from '../Styled';

class CreateProduct extends React.Component {
  state = {
    open: false,
    data: {
      name: '',
      description: '',
      image: '',
    },
    errors: {},
    uploading: false,
    imageFile: '',
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      this.setState({
        errors: { global: 'This file type is not supported.' },
      });
      return;
    }
    this.setState({
      imageFile: acceptedFiles[0],
    });
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
    this.setState({ errors, loading: true });
    if (Object.keys(errors).length === 0) {
      upload
        .post(`${process.env.REACT_APP_API_HOST}/api/products/upload`)
        .set('Authorization', `Bearer ${this.props.token}`)
        .attach('product', this.state.imageFile)
        .end((err, res) => {
          if (err) console.log(err);
          api.product
            .create({
              name: data.name,
              description: data.description,
              imageUrl: res.body.file.location,
            })
            .then(() => {
              this.props.refresh();
              this.setState({ open: false, loading: false });
            })
            .catch(err => {
              console.log(err);
            });
        });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.name) errors.name = 'Cannot be blank';
    if (!data.description) errors.description = 'Cannot be blank';

    return errors;
  };

  render() {
    const { name, description } = this.state.data;
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
            Add Product
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new product.</DialogContentText>
            {this.state.uploading ? (
              <div
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  width: '100%',
                  height: '200px',
                  border: `1px dashed ${constants.almostBlack}`,
                  borderRadius: '2px',
                  background: '#F5F5F5',
                  position: 'relative',
                }}
              >
                <CircularProgress
                  style={{ left: '50%', top: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}
                />
              </div>
            ) : (
                <div>
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
                    id="description"
                    name="description"
                    error={!!errors.description}
                    label={errors.description ? errors.description : 'Description'}
                    type="text"
                    value={description}
                    fullWidth
                  />
                  <Dropzone
                    accept="image/bmp, image/gif, image/jpeg, image/png"
                    onDrop={this.onDrop}
                    multiple={false}
                    style={{
                      marginTop: '20px',
                      marginBottom: '10px',
                      width: '100%',
                      height: '150px',
                      border: `1px dashed ${constants.almostBlack}`,
                      borderRadius: '2px',
                      background: '#F5F5F5',
                    }}
                    acceptStyle={{
                      border: `1px dashed ${constants.colorSuccess}`,
                      background: 'rgba(51, 178, 87, 0.25)',
                    }}
                    rejectStyle={{
                      border: `1px dashed ${constants.colorDanger}`,
                      background: 'rgba(234, 35, 63, 0.25)',
                    }}
                  >
                    <DropzoneText>Drop image or click to browse</DropzoneText>
                  </Dropzone>
                </div>
              )}
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
CreateProduct.propTypes = {
  refresh: func.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

export default connect(mapStateToProps)(CreateProduct);
