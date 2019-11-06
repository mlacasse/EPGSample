import React, { PureComponent } from 'react';
import { View, FocusManager, FormFactor } from '@youi/react-native-youi';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

class ACSlot extends PureComponent {
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

    this.xOffset = 0;
    this.yOffset = 0;
  }

  setFocusable = (ref) => {
    if (this.props.focusable && ref) {
      FocusManager.setFocusable(ref, true);
    }
  }

  handleOnFocus = () => {
    if (this.props.focusable && this.props.onFocus) {
      this.props.onFocus(this.xOffset, this.yOffset, this.props.data);
    }

    this.setState({ isFocused: true });
  };

  handleOnBlur = () => {
    if (this.props.focusable && this.props.onBlur) {
      this.props.onBlur();
    }

    this.setState({ isFocused: false });
  };

  handleOnPress = () => {
    if (this.props.focusable && this.props.onFocus) {
      this.props.onFocus(this.xOffset, this.yOffset, this.props.data);
    }
  };

  handleOnLayout = (event) => {
    const { row, style } = this.props;

    this.yOffset = row * style.height;
    this.xOffset = event.nativeEvent.layout.x;
  };

  renderForMobile = () => {
    return (
      <Touchable onPress={this.handleOnPress} onLayout={this.handleOnLayout}>
        <View style={this.props.style}>{this.props.children}</View>
      </Touchable>
    );
  };

  renderForTV = () => {
    const viewStyle = this.state.isFocused ? (this.props.focusStyle || this.props.style) : this.props.style;

    return (
      <View
        ref={this.setFocusable}
        style={viewStyle}
        onFocus={this.handleOnFocus}
        onBlur={this.handleOnBlur}
        onLayout={this.handleOnLayout}>
        {this.props.children}
      </View>
    );
  };

  render = () => {
    return FormFactor.isTV ? this.renderForTV() : this.renderForMobile();
  };
};

export default ACSlot;
