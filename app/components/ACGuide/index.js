import React, { createRef, PureComponent } from 'react';
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
      focusedItem: null,
    }

    this.epgChannels = createRef();
    this.epgTimeslots = createRef();
  }

  componentDidMount = () => {
    this.setState({
      channels: schedules,
      timeslots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      ready: true
    });
  }

  handleOnFocus= (xOffset, row) => {
    console.log(xOffset, row);

    this.epgChannels.value.scrollToIndex(row);
    this.epgTimeslots.value.scrollTo(row, xOffset);
  }

  render = () => {
    if (!this.state.ready) return <View />;

    const { channels, timeslots } = this.state;

    return(
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'top',
      }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: ACChannelDefaultHeight }} />
          <ACChannels ref={this.epgChannels} channels={channels} />
        </View>
        <View style={{ flex: 7 }}>
          <ACTimeslots
            ref={this.epgTimeslots}
            timeslots={timeslots}
            channels={channels}
            onFocus={this.handleOnFocus} />
        </View>
      </View>
    );
  }
};
