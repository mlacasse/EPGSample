import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from '@youi/react-native-youi';

import PropTypes from 'prop-types';

import ACTimeslot from '../ACTimeslot';

import {
  ACTimeslotStyle,
  ACDefaultHeight,
  ACDefaultTextStyle,
} from '../../../../../../styles';

class ACTimeslotHeader extends PureComponent {
  static propTypes = {
    timeslots: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.currentDay = new Date();
    this.currentDay.setMinutes(0);
  }

  calculateTime = (ordinal) => {
    const options = {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    };

    const delta = 60 * 60000 * ordinal;
    const newDateTime = new Date(this.currentDay.getTime() + delta);

    return newDateTime.toLocaleTimeString('en-US', options);
  }

  render = () => {
    const { timeslots } = this.props;

    return (
      <View style={{ height: ACDefaultHeight }}>
        <ScrollView horizontal scrollEnabled={false}>
          {timeslots.map((index) => {
            return (
              <ACTimeslot key={index} style={ACTimeslotStyle}>
                <Text style={ACDefaultTextStyle}>{this.calculateTime(index)}</Text>
              </ACTimeslot>
            );
          })}
        </ScrollView>
      </View>
    );
  }
};

export default ACTimeslotHeader;
