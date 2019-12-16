import React, { PureComponent } from 'react';
import { FocusManager, FormFactor } from '@youi/react-native-youi';
import { View, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

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
  }

  setFocusable = ref => {
    if (this.props.focusable && ref) {
      FocusManager.setFocusable(ref, true);
    }
  };

  handleOnFocus = () => {
    const { xOffset, yOffset, data, focusable, onFocus } = this.props;

    if (focusable && onFocus) {
      onFocus(xOffset, yOffset, data);
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
    const { xOffset, yOffset } = this.props;

    if (this.props.focusable && this.props.onFocus) {
      this.props.onFocus(xOffset, yOffset, this.props.data);
    }
  };

  renderForMobile = () => {
    return (
      <Touchable onPress={this.handleOnPress}>
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
        onBlur={this.handleOnBlur}>
        {this.props.children}
      </View>
    );
  };

  render = () => {
    return FormFactor.isTV ? this.renderForTV() : this.renderForMobile();
  };
};

export default ACSlot;
