import React, { PureComponent } from 'react';
import { View, Text, FlatList, ScrollView } from '@youi/react-native-youi';

import { ACTimeslot } from './subcomponents';
import {
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  ACTimeslotDefaultHeight,
  baseTextStyle,
} from './styles';

class ACTimeslots extends PureComponent {
  constructor(props) {
    super(props);

    this.currentDay = new Date();
    this.currentDay.setMinutes(this.currentDay.getMinutes() >= 30 ? 30 : 0);

    this.listRef = null;
    this.viewRef = null;
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
    this.viewRef.scrollTo({ animated: true, x: offset });
    this.listRef.scrollToIndex({ animated: true, index });
  }

  // Normally, we'd render this using the ListHeaderComponent callback and inherit
  // any margin/padding from the FlatList.  Unfortunately, You.i SDK's doesn't support
  // stickyHeaderIndices property so we can't freeze the header.
  renderTimeslotsHeader = () => {
    const { timeslots } = this.props;

    return (
      <View style={{ height: ACTimeslotDefaultHeight, marginLeft: 2 }}>
        <ScrollView horizontal scrollEnabled={false}>
          {timeslots.map((index) => {
            return (
              <ACTimeslot key={index} style={[ACTimeslotStyle]}>
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

    return (
      <ScrollView
        horizontal
        scrollEnabled={false}>
        {item.contents.map((content) => {
          const width = this.calculateWidth(content.consumables[0].duration);
                    
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
        ref={(ref) => {this.viewRef = ref}}
        scrollEnabled={false}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          {this.renderTimeslotsHeader()}
          <FlatList
            ref={(ref) => {this.listRef = ref}}
            scrollEnabled={false}
            data={channels}
            keyExtractor={(data, index) => '' + index}
            renderItem={this.renderTimeBlockItem}
            maxToRenderPerBatch={1}
            updateCellsBatchingPeriod={2000}
            windowSize={5}
          />
        </View>
      </ScrollView>
    );
  }
};

export default ACTimeslots;
