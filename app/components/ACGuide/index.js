import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { ACChannels, ACTimeslots } from './subcomponents';

import PropTypes from 'prop-types';
import { ACDefaultHeight } from '../../styles';
  
const schedules = require('../../store/schedules.json');

export default class ACGuide extends PureComponent {
  static propTypes = {
    numColumns: PropTypes.number.isRequired,
    numRows: PropTypes.number.isRequired,
  };

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
    const { numRows, numColumns } = this.props;

    for (var i = 0; i < numRows; i++) schedules.push({ empty: true });

    this.setState({
      channels: schedules,
      timeslots: [...Array(numColumns).keys()],
      ready: true,
    });
  }

  handleOnFocus= (xOffset, yOffset, data) => {
    this.epgTimeslots.scrollTo(xOffset, yOffset);
    this.epgChannels.scrollTo(yOffset);
    this.epgTimeslots.showModal(data);
  }

  render = () => {
    const { channels, timeslots, ready } = this.state;

    if (!ready) return null;

    const { numRows } = this.props;

    const height = numRows * ACDefaultHeight;

    return(
      <View style={{ flexDirection: 'row', height }}>
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
