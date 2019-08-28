import React, { PureComponent } from 'react';
import { View, FocusManager } from '@youi/react-native-youi';

import PropTypes from 'prop-types';

class ACTimeslot extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.array.isRequired,
    focusStyle: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {      
      isFocused: false,
      xOffset: 0,
      yOffset: 0,
    };
  }

  setFocusable = (ref) => {
    if (this.props.focusable && ref) {
      FocusManager.setFocusable(ref, true);
    }
  }

  handleOnFocus = () => {
    if (this.props.focusable && this.props.onFocus) {
      this.props.onFocus(this.state.xOffset, this.state.yOffset, this.props.data);
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
    const { row, style } = this.props;

    const yOffset = row * style.height;
    const xOffset = event.nativeEvent.layout.x;

    this.setState({ xOffset, yOffset });
  }

  render = () => {
    const viewStyle = this.state.isFocused ? (this.props.focusStyle || this.props.style) : this.props.style;

    return (
      <View
        style={viewStyle}
        ref={this.setFocusable}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        onLayout={this.handleOnLayout}>
        {this.props.children}
      </View>
    );
  }
};

export default ACTimeslot;
