import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, FocusManager } from '@youi/react-native-youi';

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

    const retentionOffset = { top: 0, left: 0, right: 0, bottom: 0 };

    return (
      <View
        ref={this.setFocusable}
        style={viewStyle}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        onLayout={this.handleOnLayout}
        >
        <TouchableWithoutFeedback
          onPress={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          pressRetentionOffset={retentionOffset}
        >
          {this.props.children}
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

export default ACTimeslot;
