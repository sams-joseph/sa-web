import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Text, Image, Line } from 'react-konva';
import Konva from 'konva';
import { StageContainer } from './Styled';
import constants from '../constants';

class CanvasStage extends Component {
  state = {
    image: new window.Image(),
    dims: {
      height: 300,
      width: 300,
    },
  };

  componentDidMount() {
    this.state.image.src = 'https://www.fillmurray.com/600/600';
    // eslint-disable-next-line
    this.setState({
      dims: { width: this.divElement.clientWidth },
    });
  }

  onClick = e => {
    if (!e.target.hasName('stage')) {
      this.stage._stage.find('Transformer').destroy();
      const tr = new Konva.Transformer();
      this.layer.add(tr);
      tr.attachTo(e.target);
      this.layer.draw();
    } else if (e.target.hasName('stage')) {
      this.stage._stage.find('Transformer').destroy();
      this.layer.draw();
    }
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
    const { name, date, img, width, height, bleed } = this.props;
    const { dims, image } = this.state;
    const scaledHeight = dims.width * (height / width);
    const safety = bleed * (height / width);

    return (
      <StageContainer
        innerRef={divElement => {
          this.divElement = divElement;
        }}
        img={img}
        width="100%"
        height={isNaN(scaledHeight) ? 0 : scaledHeight}
      >
        <Stage
          name="stage"
          ref={node => {
            this.stage = node;
          }}
          width={dims.width}
          height={isNaN(scaledHeight) ? 0 : scaledHeight}
          onClick={this.onClick}
        >
          <Layer
            ref={node => {
              this.layer = node;
            }}
            onMouseEnter={this.mouseEnter}
            onMouseOut={this.mouseLeave}
          >
            <Image
              name="portrait"
              ref={node => {
                this.canvasImage = node;
              }}
              image={image}
              draggable
            />
            <Text
              name="name"
              fill={this.props.color}
              text={name}
              fontSize="30"
              fontFamily={constants.fontFamily}
              draggable
            />
            <Text
              name="date"
              fill={this.props.color}
              text={date}
              fontSize="20"
              fontFamily={constants.fontFamily}
              draggable
            />
          </Layer>
          <Layer>
            <Line
              fillEnabled={false}
              points={[
                safety,
                safety,
                dims.width - safety,
                safety,
                dims.width - safety,
                scaledHeight - safety,
                safety,
                scaledHeight - safety,
              ]}
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

const { string, number } = PropTypes;
CanvasStage.propTypes = {
  name: string.isRequired,
  date: string.isRequired,
  img: string,
  width: number.isRequired,
  height: number.isRequired,
  color: string.isRequired,
};

CanvasStage.defaultProps = {
  img: '',
};

export default CanvasStage;
