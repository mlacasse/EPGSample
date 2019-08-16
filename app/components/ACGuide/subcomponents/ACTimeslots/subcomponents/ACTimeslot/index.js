import React, { PureComponent } from 'react';
import { View, Text, FocusManager } from '@youi/react-native-youi';

import PropTypes from 'prop-types';

class ACTimeslot extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object.isRequired,
    focusStyle: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  getStyle = () => {
    if (!this.props.focusable) return this.props.style;
    if (!this.state.isFocused) return this.props.style;

    return this.props.focusStyle || this.props.style;
  }

  handleOnFocus = () => {
    if (this.props.focusable && this.props.onFocus) {
      this.props.onFocus(this.xOffset, this.props.row);
    }

    this.setState({ isFocused: true });
  }

  handleOnBlur = () => {
    if (this.props.focusable && this.props.onBlur) {
      this.props.onBlur();
    }

    this.setState({ isFocused: false });
  }

  handleOnLayout = (event) => {
    this.xOffset = event.nativeEvent.layout.x;
  }

  render = () => {
    return (
      <View
        style={this.getStyle()}
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
