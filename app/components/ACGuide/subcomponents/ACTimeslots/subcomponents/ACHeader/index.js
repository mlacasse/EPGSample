import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from '@youi/react-native-youi';

import PropTypes from 'prop-types';

import ACSlot from '../ACSlot';
import ACCurrentTimeIndicator from '../ACCurrentTimeIndicator';

import {
  ACTimeslotStyle,
  ACDefaultTextStyle,
  ACTimeslotHeaderHeight,
} from '../../../../../../styles';

class ACHeader extends PureComponent {
  static propTypes = {
    timeslots: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.currentDay = new Date();
    this.currentDay.setMinutes(0);
  }

  calculateTime = (ordinal) => {
    // TODO: Use date-fns module for date calculations
    const delta = 60 * 60000 * ordinal;
    const newDateTime = new Date(this.currentDay.getTime() + delta);

    let hours = newDateTime.getHours();
    let minutes = newDateTime.getMinutes();

    const ampm = hours >= 12 ? 'p' : 'a';

    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ampm;
  }

  render = () => {
    const columns = [...Array(this.props.duration).keys()];

    const headerStyle = {
      ...ACDefaultTextStyle,
      height: ACTimeslotHeaderHeight,
    };

    const headerViewStyle = {
      ...ACTimeslotStyle,
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderWidth: 0,
    };

    return (
      <View style={{ height: ACTimeslotHeaderHeight }}>
        <ScrollView horizontal scrollEnabled={false}>
          {columns.map((index) => {
            return (
              <ACSlot key={index} style={headerViewStyle}>
                <Text style={headerStyle}>{this.calculateTime(index)}</Text>
              </ACSlot>
            );
          })}
        </ScrollView>
        <ACCurrentTimeIndicator duration={this.props.duration} currentDay={this.currentDay.getTime()} />
      </View>
    );
  }
};

export default ACHeader;
