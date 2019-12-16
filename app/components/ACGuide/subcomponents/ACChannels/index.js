import React, { createRef, PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

import ACImage from '../../../ACImage';

import {
  ACDefaultHeight,
  ACDefaultTextStyle,
  ACChannelStyle,
  ACChannelTextStyle,
  ACChannelImageStyle,
  ACTimeslotHeaderHeight
} from '../../../../styles';

class ACChannels extends PureComponent {
  constructor(props) {
    super(props);

    this.listRef = createRef();
  }

  scrollTo = offset => {
    this.listRef.current.scrollToOffset({ animated: FormFactor.isTV, offset });
  };

  renderChannel = ({ item }) => {
    const { name, majorChannelNumber } = item.channel;

    const uri = majorChannelNumber ? `res://drawable/default/${majorChannelNumber}.png` : null;

    return (
      <View style={ACChannelStyle}>
        <ACImage style={ACChannelImageStyle} source={{ uri }}>
          <Text style={{ ...ACChannelTextStyle, alignSelf: 'center' }}>{name}</Text>
        </ACImage>
      </View>
    );
  };

  render() {
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
      />
    );
  };
};

export default ACChannels;
