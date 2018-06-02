import React, { Component } from 'react';

import { SelectFieldSingle } from 'components/Select/SelectComponents';

export default class CyclesDropdown extends Component {
  static defaultProps = {
    value: '',
    onChange: () => {},
    clearable: false,
  };

  render() {
    return (
      <SelectFieldSingle
        async
        api="/api/cycles"
        onChange={this.props.onChange}
        value={this.props.value}
        placeholder="Select Cycle"
        clearable={this.props.clearable}
      />
    );
  }
}
