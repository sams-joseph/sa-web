import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Text, Image } from 'react-konva';
import { StageContainer } from './Styled';
import constants from '../constants';

function CanvasStage({ name, date, img }) {
  const image = new window.Image(300, 229);
  image.src = 'https://source.unsplash.com/user/erondu';

  return (
    <StageContainer img={img}>
      <Stage width="787" height="229">
        <Layer>
          <Image image={image} draggable />
          <Text text={name} fontSize="30" fontFamily={constants.fontFamily} draggable />
          <Text text={date} fontSize="20" fontFamily={constants.fontFamily} draggable />
        </Layer>
      </Stage>
    </StageContainer>
  );
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
