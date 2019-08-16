import React, { createRef, PureComponent, Fragment } from 'react';
import { View, Text, Image, FlatList } from 'react-native';

import { ACChannels, ACTimeslots } from './subcomponents';

const schedules = require('../../store/schedules.json');

export default class ACGuide extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      liveguide: null,
      timeslots: null,
      focusedItem: null,
      channelItems: {}
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

    // track the last chunk index retrieved
    this.lastChunkRetrieved = 0;

    this.epgChanneList = createRef();
    this.epgTimeSlowList = createRef();
  }

  componentDidMount = () => {
    const currentDay = getDateObject(schedules[0].contents[0].consumables[0].startTime);

    this.setState({
      channels: schedules,
      timeslots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      currentDay,
      ready: true
    });
  }

  componentDidUnmount = () => {
  }

  componentDidUpdate = (prevProps, prevState) => {
  }

  render = () => {
    // The EPG scrolling list is achieved by nesting ScrollViews within each other. If you are
    // using a mouse or touch, the result is a container that can you scroll horizontally or vertically.
    // because this is 10-foot, we rely on focus events to drive scrolling behaviour. There is currently
    // a design decision in the engine that determines focus can only drive scroll in a single direction,
    // the direction of the items immediate parent. So by default, a Vertical ScrollView within a horizontal
    // ScrollView can only scroll vertically due to focus changes.
    // To work around this current behaviour, scrolling is disabled on the lists and it is left entirely to
    // programmatic scrolling based on the currently focused item. Scroll direction and item are tracked to
    // determine where the user is intending to go, and toggles and re-renders are used to scroll the list
    // to the appropriate location.
    if (!this.state.ready) return <View />;

    const { channels, currentDay, timeslots } = this.state;

    return(
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'top',
      }}>
        <View style={{ flex: 1 }}>
          <ACChannels channels={channels} />
        </View>
        <View style={{ flex: 4 }}>
          <ACTimeslots timeslots={timeslots} channels={channels} currentDay={currentDay} />
        </View>
      </View>
    );
  }
};

const getDateObject = (dateTime) => {
  try {
    return new Date(dateTime); // 2019-08-12T21:00:00Z
  } catch(err) {
    return new Date();
  }
};

