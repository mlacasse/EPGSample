import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { ACChannels, ACTimeslots } from './subcomponents';
import { ACChannelDefaultHeight } from './subcomponents/ACChannels/styles';

const schedules = require('../../store/schedules.json');

export default class ACGuide extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      timeslots: null,
    }
  }

  setChannelsRef = (ref) => {
    if (ref) {
      this.epgChannels = ref;
    }
  }

  setTimeslotsRef = (ref) => {
    if (ref) {
      this.epgTimeslots = ref;
    }
  }

  componentDidMount = () => {
    this.setState({
      channels: schedules,
      timeslots: [0, 1, 2, 3, 4], //5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      ready: true
    });
  }

  handleOnFocus= (xOffset, row) => {
    // onLayout event does not return a valid yOffset so we need to calculate it based on
    // the index value of the vertical list.
    const yOffset = row * ACChannelDefaultHeight;

    this.epgTimeslots.scrollTo(xOffset, yOffset);
    this.epgChannels.scrollTo(yOffset);
  }

  render = () => {
    const { channels, timeslots, ready } = this.state;

    if (!ready) return null;

    return(
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ACChannels ref={this.setChannelsRef} channels={channels} />
        </View>
        <View style={{ flex: 11 }}>
          <ACTimeslots
            ref={this.setTimeslotsRef}
            timeslots={timeslots}
            channels={channels}
            onFocus={this.handleOnFocus} />
        </View>
      </View>
    );
  }
};
