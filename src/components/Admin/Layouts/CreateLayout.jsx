import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import upload from 'superagent';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Dropzone from 'react-dropzone';
import AddIcon from 'material-ui-icons/Add';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import api from '../../../api';
import constants from '../../constants';

import { DropzoneText } from '../Styled';

class CreateDesign extends React.Component {
  state = {
    open: false,
    data: {
      design: '',
      size: '',
      image: '',
    },
    errors: {},
    uploading: false,
    imageFile: '',
    designs: [],
    sizes: [],
  };

  componentWillMount() {
    Promise.all([api.size.getSizes(), api.design.getAllDesigns()])
      .then(results => {
        this.setState({ sizes: results[0], designs: results[1] });
      })
      .catch(err => {});
  }

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
        .post(`${process.env.REACT_APP_API_HOST}/api/design-sizes/upload`)
        .set('Authorization', `Bearer ${this.props.token}`)
        .attach('layout', this.state.imageFile)
        .end((err, res) => {
          if (err) console.log(err);
          api.designSize
            .create({
              designId: data.design,
              sizeId: data.size,
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
    if (!data.design) errors.design = 'Cannot be blank';
    if (!data.size) errors.size = 'Cannot be blank';

    return errors;
  };

  render() {
    const { design, size } = this.state.data;
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
            Add Design
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new design.</DialogContentText>
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
                <FormControl fullWidth style={{ marginTop: '10px' }} error={!!errors.design}>
                  <InputLabel htmlFor="csr">{errors.design ? errors.design : 'Design'}</InputLabel>
                  <Select
                    value={design}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'design',
                      id: 'design',
                    }}
                  >
                    {this.state.designs.map(designRecord => (
                      <MenuItem key={designRecord.id} value={designRecord.id}>
                        {designRecord.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginTop: '10px' }} error={!!errors.size}>
                  <InputLabel htmlFor="csr">{errors.size ? errors.size : 'Size'}</InputLabel>
                  <Select
                    value={size}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'size',
                      id: 'size',
                    }}
                  >
                    {this.state.sizes.map(sizeRecord => (
                      <MenuItem key={sizeRecord.id} value={sizeRecord.id}>
                        {sizeRecord.displayName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
CreateDesign.propTypes = {
  refresh: func.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

export default connect(mapStateToProps)(CreateDesign);
