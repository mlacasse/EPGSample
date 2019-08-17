import React, { PureComponent } from 'react';
import { View, Text, FocusManager } from '@youi/react-native-youi';

import PropTypes from 'prop-types';

class ACTimeslot extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.array.isRequired,
    focusStyle: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.isFocused = false;
    this.xOffset = 0;
  }

  handleOnFocus = () => {
    if (this.props.focusable && this.props.onFocus) {
      this.props.onFocus(this.xOffset, this.props.row);
    }

    this.isFocused = true;
  }

  handleOnBlur = () => {
    if (this.props.focusable && this.props.onBlur) {
      this.props.onBlur();
    }

    this.isFocused = false;
  }

  handleOnLayout = (event) => {
    this.xOffset = event.nativeEvent.layout.x;
  }

  render = () => {
    const focusStyle = this.props.focusable && this.isFocused ? (this.props.focusStyle || this.props.style) : this.props.style;

    return (
      <View
        style={focusStyle}
        ref={ref => {
          if (this.props.focusable && ref) {
            FocusManager.setFocusable(ref, true);
          }
        }}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        onLayout={this.handleOnLayout}>  
        {this.props.children}
      </View>
    );
  }
};

export default ACTimeslot;
