import React, { createRef, PureComponent } from 'react';
import { View, Text, FlatList, ScrollView, FocusManager } from '@youi/react-native-youi';

import { ACTimeslot } from './subcomponents';
import {
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  baseTextStyle
} from './styles';

class ACTimeslots extends PureComponent {
  constructor(props) {
    super(props);

    this.currentDay = new Date();
    this.currentDay.setMinutes(this.currentDay.getMinutes() >= 30 ? 30 : 0);

    this.listRef = createRef();
    this.viewRef = createRef();
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
    const { width, borderWidth } = ACTimeslotStyle;

    const slots = duration / ACTimeslotDefaultInterval;

    return (slots * width) + (borderWidth * (slots - 1));
  }

  scrollTo = (index, offset) => {
    this.listRef.value.scrollToIndex({ animated: true, index });
    this.viewRef.value.scrollTo({ animated: true, x: offset });
  }

  renderTimeslotsHeader = () => {
    const { timeslots } = this.props;

    return (
      <ScrollView
        horizontal
        scrollEnabled={false}
        style={{ marginLeft: 2 }}>
        {timeslots.map((index) => {
          return (
            <ACTimeslot style={ACTimeslotStyle}>
              <Text style={baseTextStyle}>{this.calculateTime(index)}</Text>
            </ACTimeslot>
          );
        })}
      </ScrollView>
    );
  }

  renderTimeBlockItem = (data) => {
    const { item, index } = data;

    return (
      <ScrollView
        horizontal
        scrollEnabled={false}>
        {item.contents.map((content) => {
          const width = this.calculateWidth(content.consumables[0].duration);
          
          return (
            <ACTimeslot
              row={index}
              focusable
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
        ref={this.viewRef}
        scrollEnabled={false}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {this.renderTimeslotsHeader()}
          <FlatList
            ref={this.listRef}
            scrollEnabled={false}
            data={channels}
            keyExtractor={data => '' + data.resourceId}
            renderItem={this.renderTimeBlockItem}
            snapToAlignment='start'
            initialNumToRender={30}
          />
        </View>
      </ScrollView>
    );
  }
};

export default ACTimeslots;
