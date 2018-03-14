import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Text, Line, Image } from 'react-konva';
import Konva from 'konva';
import { connect } from 'react-redux';
import { StageContainer } from './Styled';
import KonvaImage from './KonvaImage';
import constants from '../constants';
import { setOrderImage, setOrderPortrait } from '../../actions/order';

class CanvasStage extends Component {
  state = {
    image: new window.Image(),
    bkgImage: null,
    dims: {
      height: 300,
      width: 300,
    },
  };

  componentDidMount() {
    this.props.onRef(this);
    // eslint-disable-next-line
    this.setState({
      dims: { width: this.divElement.clientWidth },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.img !== this.props.img) {
      const bkg = new window.Image();
      bkg.setAttribute('crossOrigin', 'anonymous');
      bkg.src = nextProps.img;
      bkg.onload = () => {
        this.setState({
          bkgImage: bkg,
        });
      };
    }
  }

  onClick = e => {
    if (e.target.hasName('stage') || e.target.hasName('bkg')) {
      this.stage
        .getStage()
        .find('Transformer')
        .destroy();
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

  getData = () => {
    this.stage
      .getStage()
      .find('Transformer')
      .destroy();
    this.layer.draw();
    const dataUrl = this.stage.getStage().toDataURL();
    this.props.setOrderImage(dataUrl);
    this.props.setOrderPortrait(this.props.portraitImage);
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
    const { name, date, width, height, bleed, portraitImage } = this.props;
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
          <Layer>
            <Image
              name="bkg"
              ref={node => {
                this.imageNode = node;
              }}
              image={this.state.bkgImage}
              width={dims.width}
              height={isNaN(scaledHeight) ? 0 : scaledHeight}
            />
          </Layer>
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

const { string, number, func } = PropTypes;
CanvasStage.propTypes = {
  name: string.isRequired,
  date: string.isRequired,
  img: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  color: string.isRequired,
  bleed: number.isRequired,
  portraitImage: string.isRequired,
  setOrderImage: func.isRequired,
  setOrderPortrait: func.isRequired,
};

CanvasStage.defaultProps = {
  name: '',
  date: '',
};

export default connect(null, { setOrderImage, setOrderPortrait })(CanvasStage);
