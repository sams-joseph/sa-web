import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Text, Line } from 'react-konva';
import Konva from 'konva';
import { StageContainer } from './Styled';
import KonvaImage from './KonvaImage';
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
    // eslint-disable-next-line
    this.setState({
      dims: { width: this.divElement.clientWidth },
    });
  }

  onClick = e => {
    if (e.target.hasName('stage')) {
      this.stage._stage.find('Transformer').destroy();
      this.layer.draw();
      return;
    }

    if (!e.target.hasName('selectable')) {
      return;
    }

    this.stage._stage.find('Transformer').destroy();

    const tr = new Konva.Transformer();
    this.layer.add(tr);
    tr.attachTo(e.target);
    this.layer.draw();
  };

  setRefImage = node => {
    this.canvasImage = node;
  };

  mouseEnter = () => {
    this.stage._stage.container().style.cursor = 'move';
  };

  mouseLeave = () => {
    this.stage._stage.container().style.cursor = 'default';
  };

  render() {
    const { name, date, img, width, height, bleed, portraitImage } = this.props;
    const { dims } = this.state;
    const scaledHeight = dims.width * (height / width);
    const safety = bleed * (height / width);
    const image = new window.Image();
    image.src = portraitImage;

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
            <KonvaImage name="selectable" setRef={this.setRefImage} image={image} />
            <Text
              name="selectable"
              fill={this.props.color}
              text={name}
              fontSize="30"
              fontFamily={constants.fontFamily}
              draggable
            />
            <Text
              name="selectable"
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
                scaledHeight - safety - 3,
                safety,
                scaledHeight - safety - 3,
              ]}
              stroke="cyan"
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
  img: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  color: string.isRequired,
  bleed: number.isRequired,
  portraitImage: string.isRequired,
};

CanvasStage.defaultProps = {
  name: '',
  date: '',
};

export default CanvasStage;
