import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import constants from '../constants';

const StyledDiv = styled.div`
  font-family: ${constants.fontFamily};
  color: white;
  padding: 20px;
  width: 100%;
  background: #2979ff;
  position: relative;
  z-index: 0;
`;

const AlertContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  & h4 {
    margin: 0 0 5px 0;
    padding: 0;
    font-weight: normal;
  }

  & ul {
    margin: 0;
    padding: 0 18px;
    list-style-type: square;

    & li {
      font-size: 12px;
      font-weight: 100;
    }
  }
`;

class Alert extends Component {
  constructor() {
    super();

    this.state = {
      title: String,
      body: String,
      number: Number,
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://api.github.com/search/issues?q=repo:sams-joseph/sa-web+type:pr+label:release&order=desc&page=1&per_page=1',
        { headers: { authorization: null } }
      )
      .then(data => {
        this.setState({
          title: data.data.items[0].title,
          body: data.data.items[0].body,
          number: data.data.items[0].number,
        });
      })
      .catch(err => {});
  }

  onClick = () => {
    if (localStorage) {
      localStorage.setItem('dismiss', this.state.number);
    }
    this.setState({ dismissed: true });
  };

  render() {
    const updateBody = this.state.body.toString().split('-');
    const update = updateBody.splice(1, updateBody.length);

    if (localStorage && !this.state.dismissed && Number(localStorage.getItem('dismiss')) < this.state.number) {
      return (
        <StyledDiv>
          <AlertContainer>
            <div>
              <h4>{this.state.title}</h4>
              <ul>{update.map((listItem, index) => <li key={`enhancements_${index}`}>{listItem}</li>)}</ul>
            </div>
            <div>
              <Button variant="raised" color="primary" onClick={this.onClick}>
                Dismiss
              </Button>
            </div>
          </AlertContainer>
        </StyledDiv>
      );
    }

    return null;
  }
}

export default Alert;
