import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FormatColorText from 'material-ui-icons/FormatColorText';
import { Container, ColorBox, SelectedColorBar, SelectedColor } from './Styled';

const availableColors = ['#ffffff', '#000000', 'pink', 'magenta', 'blue'];

const Color = ({ hex, onClick }) => <ColorBox hex={hex} onClick={() => onClick(hex)} />;

class ColorSelect extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      hex: availableColors[0],
    };
  }

  onToggle = () => {
    if (!this.state.open) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState({
      open: !this.state.open,
    });
  };

  onClick = hex => {
    this.props.onSelect(hex);
    this.setState({
      hex,
    });
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    this.onToggle();
  };

  render() {
    const colors = availableColors.map(color => <Color key={color} hex={color} onClick={this.onClick} />);

    return (
      <div
        ref={node => {
          this.node = node;
        }}
      >
        <IconButton onClick={this.onToggle}>
          <FormatColorText />
        </IconButton>
        <Container open={this.state.open}>
          {colors}
          <SelectedColorBar>
            <SelectedColor hex={this.state.hex} />
          </SelectedColorBar>
        </Container>
      </div>
    );
  }
}

const { string, func } = PropTypes;
ColorSelect.propTypes = {
  onSelect: func.isRequired,
};

Color.propTypes = {
  hex: string.isRequired,
  onClick: func.isRequired,
};

export default ColorSelect;
