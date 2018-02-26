import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-konva';

class KonvaImage extends Component {
  state = {};
  render() {
    const { image, name, setRef } = this.props;

    return <Image name={name} ref={setRef} image={image} draggable />;
  }
}

const { string, func, shape } = PropTypes;
KonvaImage.propTypes = {
  image: shape({}).isRequired,
  setRef: func.isRequired,
  name: string.isRequired,
};

export default KonvaImage;
