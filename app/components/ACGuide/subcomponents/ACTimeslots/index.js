import React, { PureComponent } from 'react';
import { View, Text, FlatList, ScrollView } from '@youi/react-native-youi';

import { ACTimeslot } from './subcomponents';
import {
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  ACTimeslotDefaultHeight,
  ACTimeslotDefaultWidth,
  baseTextStyle,
} from './styles';

class ACTimeslots extends PureComponent {
  constructor(props) {
    super(props);

    const { timeslots } = this.props;

    this.grid = {
      width: timeslots.length * ACTimeslotDefaultWidth,
    };

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

  scrollTo = (x, y) => {
    this.viewRef.scrollTo({ animated: true, x });
    this.listRef.scrollToOffset({ animated: true, offset: y });
  }

  renderTimeslotsHeader = () => {
    const { timeslots } = this.props;

    return (
      <View style={{ height: ACTimeslotDefaultHeight }}>
        <ScrollView horizontal scrollEnabled={false}>
          {timeslots.map((index) => {
            return (
              <ACTimeslot key={index} style={ACTimeslotStyle}>
                <Text style={baseTextStyle}>{this.calculateTime(index)}</Text>
              </ACTimeslot>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  renderTimeBlockItem = (data) => {
    const { item, index } = data;

    let cumulativeWidth = 0;
    let width = 0;

    return (
      <ScrollView
        horizontal
        scrollEnabled={false}>
        {item.contents.map((content) => {
          width = this.calculateWidth(content.consumables[0].duration);

          if (cumulativeWidth + width > this.grid.width) {
            width = this.grid.width - cumulativeWidth;
          }

          if (width < 0) return null;

          cumulativeWidth += width;

          return (
            <ACTimeslot
              focusable
              key={content.resourceId} 
              row={index}
              style={[ACTimeslotStyle, { width }]}
              focusStyle={[ACTimeslotFocusStyle, { width }]}
              onFocus={this.props.onFocus}>
              <Text style={baseTextStyle}>{content.title}</Text>
            </ACTimeslot>
          );
        })}
      </ScrollView>
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
            maxToRenderPerBatch={3}
            updateCellsBatchingPeriod={500}
            windowSize={20}
          />
        </View>
      </ScrollView>
    );
  }
};

export default ACTimeslots;
