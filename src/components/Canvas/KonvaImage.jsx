import React, { Component } from 'react';
import { Image } from 'react-konva';

export default class KonvaImage extends Component {
  state = {};
  render() {
    const { portrait, image } = this.props;

    return (
      <Image
        name="portrait"
        ref={node => {
          this.canvasImage = node;
        }}
        opacity={portrait.opacity}
        stroke="cyan"
        strokeWidth="2"
        strokeEnabled={portrait.strokeEnabled}
        shadowEnabled={portrait.shadowEnabled}
        shadowColor="black"
        shadowBlur="20"
        image={image}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        draggable
      />
    );
  }
}
