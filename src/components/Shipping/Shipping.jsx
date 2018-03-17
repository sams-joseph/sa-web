import React, { Component } from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Alert from '../Alert';

import { Heading, Form } from './Styled';

class Shipping extends Component {
  handleChange = e => {
    this.props.onChange(e.target.name, e.target.value);
  };

  checkForErrors = errors => {
    if (Object.keys(errors).length !== 0) {
      return true;
    }
    return false;
  };

  render() {
    const { data, errors } = this.props;

    return (
      <Form>
        <Heading>Shipping</Heading>
        {this.checkForErrors(errors) && <Alert margin type="danger" text="Cannot be left blank" />}
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name" error={!!errors.name}>
            Name
          </InputLabel>
          <Input name="name" id="name" value={data.name} onChange={this.handleChange} error={!!errors.name} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="address" error={!!errors.address}>
            Address
          </InputLabel>
          <Input
            name="address"
            id="address"
            value={data.address}
            onChange={this.handleChange}
            error={!!errors.address}
          />
        </FormControl>
        <FormControl margin="normal" style={{ marginRight: '20px' }}>
          <InputLabel htmlFor="city" error={!!errors.city}>
            City
          </InputLabel>
          <Input name="city" id="city" value={data.city} onChange={this.handleChange} error={!!errors.city} />
        </FormControl>
        <FormControl margin="normal" style={{ marginRight: '20px' }}>
          <InputLabel htmlFor="state" error={!!errors.state}>
            State
          </InputLabel>
          <Input name="state" id="state" value={data.state} onChange={this.handleChange} error={!!errors.state} />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="zip" error={!!errors.zip}>
            Zipcode
          </InputLabel>
          <Input name="zip" id="zip" value={data.zip} onChange={this.handleChange} error={!!errors.zip} />
        </FormControl>
      </Form>
    );
  }
}

export default Shipping;
