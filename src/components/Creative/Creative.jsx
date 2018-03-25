import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import upload from 'superagent';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Dropzone from 'react-dropzone';
import InputGroup from '../inputs/InputGroup';
import CanvasStage from '../Canvas';
import { setOrderInputs, setOrderPortrait } from '../../actions/order';

import { Container, DropzoneText } from './Styled';
import ColorSelect from '../ColorSelect';
import constants from '../constants';

class Creative extends Component {
  state = {
    text: {
      name: '',
      date: '',
    },
    fontColor: '#FFFFFF',
    error: '',
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  onChange = name => event => {
    this.setState({
      text: {
        ...this.state.text,
        [name]: event.target.value,
      },
    });
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      this.setState({
        error: 'This file type is not supported.',
      });
      return;
    }
    acceptedFiles.forEach(file => {
      this.setState({
        image: file,
      });
    });

    upload
      .post(`${process.env.REACT_APP_API_HOST}/api/uploads/portrait`)
      .attach('portrait', acceptedFiles[0])
      .end((err, res) => {
        if (err) console.log(err);
        this.props.setOrderPortrait(res.body.file.location);
      });
  };

  onNextClick = () => {
    this.child.getData();
  };

  setColor = color => {
    this.setState({
      fontColor: color,
    });
  };

  getImageData = () => {
    this.props.setOrderInputs(this.state.text);
    return this.child.getData();
  };

  render() {
    const { designUrl, order } = this.props;

    return (
      <Container padding="0 20px 0 20px">
        <CanvasStage
          onRef={ref => (this.child = ref)}
          portraitImage={this.state.image ? this.state.image : ''}
          img={designUrl}
          name={this.state.text.name}
          date={this.state.text.date}
          width={order.size.sizeWidth}
          height={order.size.sizeHeight}
          color={this.state.fontColor}
          bleed={12}
        />
        <AppBar position="static" color="default" elevation={1} square>
          <Toolbar>
            <div style={{ flex: 1, display: 'flex' }}>
              <ColorSelect onSelect={this.setColor} />
            </div>
          </Toolbar>
        </AppBar>
        <form style={{ display: 'flex', marginTop: '20px' }}>
          <FormControl fullWidth margin="normal" style={{ marginRight: '10px', marginTop: '10px' }}>
            <TextField
              id="name"
              label="Name"
              placeholder="John Doe"
              value={this.state.text.name}
              onChange={this.onChange('name')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" style={{ marginLeft: '10px', marginTop: '10px' }}>
            <TextField
              id="date"
              label="Date"
              placeholder="1987-2018"
              value={this.state.text.date}
              onChange={this.onChange('date')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </form>
        <InputGroup label="Image">
          <Dropzone
            accept="image/bmp, image/gif, image/jpeg, image/png"
            onDrop={this.onDrop}
            multiple={false}
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              width: '100%',
              height: '200px',
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
        </InputGroup>
      </Container>
    );
  }
}

const { shape, number, string } = PropTypes;
Creative.propTypes = {
  order: shape({
    sizeID: number,
    productID: number,
    designID: number,
  }),
  designUrl: string.isRequired,
};

Creative.defaultProps = {
  order: {
    productID: 0,
    sizeID: 0,
    designID: 0,
  },
};

function mapStateToProps(state) {
  return {
    order: state.order,
    designUrl: state.designSize,
  };
}

export default connect(mapStateToProps, { setOrderInputs, setOrderPortrait })(Creative);
