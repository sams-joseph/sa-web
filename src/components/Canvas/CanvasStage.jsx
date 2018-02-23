import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Text, Image, Line } from 'react-konva';
import { StageContainer } from './Styled';
import constants from '../constants';

class CanvasStage extends Component {
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

  render() {
    const { name, date, img, width, height } = this.props;
    const image = new window.Image(300, 229);
    image.src = 'https://www.fillmurray.com/300/229';

    return (
      <StageContainer img={img} width={width} height={height}>
        <Stage
          ref={node => {
            this.stage = node;
          }}
          width={width}
          height={height}
        >
          <Layer>
            <Image
              ref={node => {
                this.canvasImage = node;
              }}
              image={image}
              draggable
              // dragBoundFunc={this.dragBoundFunc}
            />
            <Text text={name} fontSize="30" fontFamily={constants.fontFamily} draggable />
            <Text text={date} fontSize="20" fontFamily={constants.fontFamily} draggable />
            <Line
              fillEnabled={false}
              points={[10, 10, width - 10, 10, width - 10, height - 10, 10, height - 10]}
              stroke="magenta"
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
};

CanvasStage.defaultProps = {
  img: '',
};

export default CanvasStage;
