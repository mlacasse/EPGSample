import React, { PureComponent, createRef } from 'react';
import { View, NativeModules } from 'react-native';
import { ACChannels, ACTimeslots } from './subcomponents';

import PropTypes from 'prop-types';
import { ACDefaultHeight, ACTimeslotDefaultWidth } from '../../styles';

const schedules = require('../../store/schedules.json');

const { Dimensions } = NativeModules;

export default class ACGuide extends PureComponent {
  static propTypes = {
    duration: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      timeslots: null,
    }

    this.epgChannels = createRef();
    this.epgTimeslots = createRef();
  }

  componentDidMount = () => {
    const duration = this.props.duration ? this.props.duration : Math.ceil(Dimensions.window.width / ACTimeslotDefaultWidth);

    // Working under the assumption that duration is measured in seconds.
    const placeholder = {
      title: 'No Programming',
      images: [{}, {}, { width: 0, height: 0, imageUrl: null }],
      consumables: [{ duration: 3600 }],
    };

    // The modal doesn't move vertically.
    //
    // This block rips through the schedule and adds as many rows as necessary to 
    // ensure that the last row can be selected and renders above the modal's
    // location.
    const fillerRows = Math.floor(Dimensions.window.height / ACDefaultHeight);

    for (var i = 0; i < fillerRows; i++) {
      let contents = [];

      // We're using two magic numbers here - not great I know.
      //
      // We work under the assumption that a column is only 60 minutes.
      for (var j = 0; j < duration; j ++) contents.push({ ...placeholder, empty: true });

      schedules.push({ channel: { name: null, resourceId: null }, contents });
    }

    // Sometimes the data is garbage and we need to fill out what's missing in the
    // row.  This is yuck but it gets the job done.
    for (var k = 0; k < schedules.length; k++)
      for (var l = 0; l < duration; l++) schedules[k].contents.push(placeholder);

    // Once complete, we store the schedule, number of timeslot colums, and ready flag.
    this.setState({
      channels: schedules,
      timeslots: [...Array(duration).keys()],
      ready: true,
    });
  }

  handleOnScoll = () => {
    console.log('handleOnScroll');
  }

  handleOnFocus = (xOffset, yOffset, data) => {
    this.epgChannels.value.scrollTo(yOffset);
    this.epgTimeslots.value.scrollTo(xOffset, yOffset);
    this.epgTimeslots.value.showModal(data);
  }

  render = () => {
    const { channels, timeslots, ready } = this.state;

    // If ready is not set we return nothing - Dine & Dash!
    if (!ready) return null;

    const containerStyle = {
      ...this.props.style,
      flexDirection: 'row',
    };

    return(
      <View style={containerStyle}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ACChannels ref={this.epgChannels} channels={channels} />
        </View>
        <View style={{ flex: 11 }}>
          <ACTimeslots
            ref={this.epgTimeslots}
            timeslots={timeslots}
            channels={channels}
            onScoll={this.handleOnScoll}
            onFocus={this.handleOnFocus} />
        </View>
      </View>
    );
  }
};
