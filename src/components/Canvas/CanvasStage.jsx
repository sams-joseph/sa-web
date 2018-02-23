import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Text, Image, Line } from 'react-konva';
import { StageContainer } from './Styled';
import constants from '../constants';

class CanvasStage extends Component {
  state = {
    dims: {
      height: 300,
      width: 300,
    },
    portrait: {
      strokeEnabled: false,
      shadowEnabled: false,
      opacity: 1,
    },
    name: {
      strokeEnabled: false,
      shadowEnabled: false,
    },
    date: {
      strokeEnabled: false,
      shadowEnabled: false,
    },
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      dims: { width: this.divElement.clientWidth },
    });
  }

  onMouseDown = e => {
    this.canvasImage.moveUp();
    this.setState({
      ...this.state,
      [e.target.attrs.name]: {
        strokeEnabled: true,
        shadowEnabled: true,
        opacity: 0.5,
      },
    });
  };

  onMouseUp = e => {
    this.setState({
      ...this.state,
      [e.target.attrs.name]: {
        strokeEnabled: false,
        shadowEnabled: false,
        opacity: 1,
      },
    });
  };

  dragBoundFunc = pos => {
    const stageWidth = this.stage.props.width;
    const stageHeight = this.stage.props.height;
    const imageWidth = this.canvasImage.width();
    const imageHeight = this.canvasImage.height();
    // eslint-disable-next-line
    const newY = pos.y < 0 ? 0 : pos.y > stageHeight - imageHeight ? stageHeight - imageHeight : pos.y;
    // eslint-disable-next-line
    const newX = pos.x < 0 ? 0 : pos.x > stageWidth - imageWidth ? stageWidth - imageWidth : pos.x;

    return {
      x: newX,
      y: newY,
    };
  };

  mouseEnter = () => {
    this.stage._stage.container().style.cursor = 'move';
  };

  mouseLeave = () => {
    this.stage._stage.container().style.cursor = 'default';
  };

  render() {
    const { name, date, img, width, height } = this.props;
    const { dims, portrait } = this.state;
    const scaledHeight = dims.width * (height / width);
    const image = new window.Image(300, 229);
    image.src = 'https://www.fillmurray.com/300/229';

    return (
      <StageContainer
        innerRef={divElement => {
          this.divElement = divElement;
        }}
        img={img}
        width="100%"
        height={scaledHeight}
      >
        <Stage
          ref={node => {
            this.stage = node;
          }}
          width={dims.width}
          height={scaledHeight}
        >
          <Layer onMouseEnter={this.mouseEnter} onMouseOut={this.mouseLeave}>
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
            <Text name="name" fill="white" text={name} fontSize="30" fontFamily={constants.fontFamily} draggable />
            <Text name="date" fill="white" text={date} fontSize="20" fontFamily={constants.fontFamily} draggable />
          </Layer>
          <Layer>
            <Line
              fillEnabled={false}
              points={[10, 10, dims.width - 10, 10, dims.width - 10, scaledHeight - 10, 10, scaledHeight - 10]}
              stroke="lightgrey"
              dash={[10, 5]}
              strokeWidth="1"
              closed
            />
          </Layer>
        </Stage>
      </StageContainer>
    );
  }
}

const { string } = PropTypes;
CanvasStage.propTypes = {
  name: string.isRequired,
  date: string.isRequired,
  img: string,
  width: string.isRequired,
  height: string.isRequired,
};

CanvasStage.defaultProps = {
  img: '',
};

export default CanvasStage;
