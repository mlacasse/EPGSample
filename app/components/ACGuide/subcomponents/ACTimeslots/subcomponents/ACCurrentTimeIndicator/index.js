import React, { PureComponent } from 'react';
import { View, NativeModules } from 'react-native';

import PropTypes from 'prop-types';

import {
  ACTimeslotHeaderHeight,
  ACTimeslotDefaultWidth,
  ACTimeslotDefaultInterval
} from '../../../../../../styles';

const { Dimensions } = NativeModules;

class ACCurrentTimeIndicator extends PureComponent {
  static propTypes = {
    duration: PropTypes.array.isRequired,
    currentDay: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      grid: {
        width: this.props.duration * ACTimeslotDefaultWidth,
        height: Dimensions.window.height,
      },
    };

    this.offset = 1.5;
    this.interval = 60000; // 60 seconds

    this.currentDay = new Date(this.props.currentDay);
  }

  componentDidMount() {
    this.setPosition();

    this.intervalHandler = setInterval(() => this.setPosition(), this.interval);
  }

  componentWillUnmount() {
    if (this.intervalHandler) {
      clearInterval(this.intervalHandler);
      this.intervalHandler = null;
    }
  }

  setPosition = () => {
    this.setState({
      position: this.state.grid.width * ((Date.now() - this.currentDay) / (this.props.duration * ACTimeslotDefaultInterval * 1000)) - this.offset,
    });
  };

  render() {
    const currentTimeIndicator = {
      height: this.state.grid.height,
      width: 2,
      backgroundColor: '#009FDB',
      position: 'absolute',
      left: this.state.position + 4,
      top: ACTimeslotHeaderHeight,
    };

    return (
      <View style={currentTimeIndicator} />
    );
  }
}

export default ACCurrentTimeIndicator;
