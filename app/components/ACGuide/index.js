import React, { createRef, PureComponent, Fragment } from 'react';
import { View, Text, Image, FlatList } from 'react-native';

import { ACChannels, ACTimeslots } from './subcomponents';

const schedules = require('../../store/schedules.json');

export default class ACGuide extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      timeslots: null,
      focusedItem: null,
    }

    // class members to keep track of where we are in the EPG, and
    // how to react during re-renders. The approach taken for the EPG is
    // to not rely on state changes to drive behaviour, but instead to use
    // almost mutex switches to toggle certain behaviour on a forced re-render,
    // and then immediately toggle the switch back without a new re-render.
    // ex/ (1) indicate we wish to toggle scroll in horizontal direction, (2) force
    // re-render, (3) on update, perform a scrollTo due to toggle, (4) reset toggle
    // without re-render.
    this.toggleHorizontalScroll = false;
    this.xOffset = 0;
    this.yOffset = 0;
    this.toggleCurrentHorizontalBatchNumber = 0;
    this.toggleLastHorizontalScrollIndex = 0;
    this.toggleVerticalScroll = false;
    this.toggleCurrentVerticalBatchNumber = 0;
    this.toggleLastVerticalScrollIndex = 0;
    this.startChannelIndex = 0;
    this.endChannelIndex = 11;
    this.relationalVerticalIndex = 0;

    // timer callback to load additional information pane
    this.delayInfoPaneTimer = null;
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
          <ACChannels channels={channels} />
        </View>
        <View style={{ flex: 7 }}>
          <ACTimeslots timeslots={timeslots} channels={channels} onFocus={this.handleOnFocus}/>
        </View>
      </View>
    );
  }
};
