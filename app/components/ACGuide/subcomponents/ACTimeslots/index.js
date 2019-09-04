import React, { Fragment, PureComponent } from 'react';
import { View, Text, FlatList, ScrollView } from '@youi/react-native-youi';

import PropTypes from 'prop-types';

import { ACTimeslot, ACModal } from './subcomponents';

import {
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  ACTimeslotDefaultWidth,
  ACDefaultHeight,
  ACDefaultTextStyle,
} from '../../../../styles';

class ACTimeslots extends PureComponent {
  static propTypes = {
    timeslots: PropTypes.array.isRequired,
    channels: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    const { timeslots } = this.props;

    this.state = {
      showModal: false,
      grid: {
        width: timeslots.length * ACTimeslotDefaultWidth,
      },
    };

    this.timer = null;

    this.currentDay = new Date();
    this.currentDay.setMinutes(this.currentDay.getMinutes() >= 30 ? 30 : 0);
  }

  setViewRef = (ref) => {
    if (ref) {
      this.viewRef = ref;
    }
  }

  setListRef = (ref) => {
    if (ref) {
      this.listRef = ref;
    }
  }

  calculateTime = (ordinal) => {
    const options = {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    };

    const delta = 30 * 60000 * ordinal;
    const newDateTime = new Date(this.currentDay.getTime() + delta);

    return newDateTime.toLocaleTimeString('en-US', options);
  }

  calculateWidth = (duration) => {
    const { width } = ACTimeslotStyle;
    const slots = Math.floor(duration / ACTimeslotDefaultInterval);

    return slots * width;
  }

  scrollTo = (x, offset) => {
    this.viewRef.scrollTo({ animated: true, x });
    this.listRef.scrollToOffset({ animated: true, offset });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  showModal = (data, yOffset) => {
    clearTimeout(this.timer);

    this.setState({ showModal: true, data });

    this.timer = setTimeout(this.hideModal, 30000);
  }

  renderTimeslotsHeader = () => {
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

  renderTimeBlockItem = (data) => {
    const { item, index } = data;

    if (item.empty) {
      const { width } = this.state.grid;

      return (
        <ScrollView horizontal scrollEnabled={false}>
          <ACTimeslot style={{...ACTimeslotStyle, width }}>
            <Text style={ACDefaultTextStyle}>No Programming</Text>
          </ACTimeslot>
        </ScrollView>
      );
    }

    let cumulativeWidth = 0;

    return (
      <ScrollView
        horizontal
        scrollEnabled={false}>
        {item.contents.map((content) => {
          let width = this.calculateWidth(content.consumables[0].duration);

          if (cumulativeWidth + width > this.state.grid.width) {
            width = this.state.grid.width - cumulativeWidth;
          }

          if (width > 0) {
            cumulativeWidth += width;

            return (
              <ACTimeslot
                focusable
                key={content.resourceId}
                data={content}
                row={index}
                style={{...ACTimeslotStyle, width }}
                focusStyle={{...ACTimeslotFocusStyle, width }}
                onFocus={this.props.onFocus}>
                <Text style={ACDefaultTextStyle}>{content.title}</Text>
              </ACTimeslot>
            );
          }
        })}
      </ScrollView>
    );
  }

  renderModal = () => {
    if (!this.state.showModal) return null;

    return (
      <ACModal
        ref={this.setModalRef}
        data={this.state.data}
        style={{
          width: this.state.grid.width,
          backgroundColor: 'black',
          borderColor: 'white',
          borderWidth: 1,
          position: 'absolute',
          top: 2 * ACDefaultHeight,
          }} />
    );
  }

  render = () => {
    const { channels } = this.props;
    
    return (
      <ScrollView
        horizontal
        ref={this.setViewRef}
        scrollEnabled={false}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {this.renderTimeslotsHeader()}
          <FlatList
            ref={this.setListRef}
            scrollEnabled={false}
            data={channels}
            keyExtractor={(data, index) => '' + index}
            renderItem={this.renderTimeBlockItem}
            snapToAlignment='start'
            snapToInterval={ACDefaultHeight}
            decelerationRate='fast'
            maxToRenderPerBatch={3}
            updateCellsBatchingPeriod={500}
            windowSize={20}
          />
          {this.renderModal()}
        </View>
      </ScrollView>
    );
  }
};

export default ACTimeslots;
