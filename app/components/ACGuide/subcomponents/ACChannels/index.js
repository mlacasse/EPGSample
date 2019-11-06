import React, { createRef, PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';

import ACImage from '../../../ACImage';

import {
  ACDefaultHeight,
  ACDefaultTextStyle,
  ACChannelStyle,
  ACChannelImageStyle,
  ACTimeslotHeaderHeight
} from '../../../../styles';

class ACChannels extends PureComponent {
  constructor(props) {
    super(props);

    this.listRef = createRef();
  }

  scrollTo = offset => {
    this.listRef.value.scrollToOffset({ animated: true, offset });
  };

  renderChannel = data => {
    const { name, majorChannelNumber } = data.item.channel;

    return (
      <View style={ACChannelStyle}>
        <ACImage style={ACChannelImageStyle} source={{ uri: `res://drawable/default/${majorChannelNumber}.png`}}>
          <Text style={{ ...ACDefaultTextStyle, alignSelf: 'center' }}>{name}</Text>
        </ACImage>
      </View>
    );
  };

  render = () => {
    return (
      <FlatList
        ref={this.listRef}
        style={{ marginTop: ACTimeslotHeaderHeight }}
        scrollEnabled={false}
        data={this.props.channels}
        keyExtractor={(data, index) => '' + index}
        renderItem={this.renderChannel}
        decelerationRate='fast'
        snapToAlignment='start'
        snapToInterval={ACDefaultHeight}
        windowSize={20}
      />
    );
  };
};

export default ACChannels;
