import React, { createRef, PureComponent } from 'react';
import { View, Text, FlatList, FormFactor } from '@youi/react-native-youi';

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

    this.state = {
      renderToIndex: {
        min: 0,
        max: !FormFactor.isTV ? props.channels.length : 10,
      },
    };

    this.viewabilityConfig = {
      waitForInteraction: false,
      minimumViewTime: 250,
      viewAreaCoveragePercentThreshold: 0,
    };

    this.listRef = createRef();
  }

  scrollTo = offset => {
    this.listRef.value.scrollToOffset({ animated: true, offset });
  };

  handleOnViewableItemsChanged = ({ viewableItems }) => {
    const visibleKeys = viewableItems.map(item => item.index);
    const renderToIndex = {
      min: Math.min(...visibleKeys) - 1,
      max: Math.max(...visibleKeys) + 1,
    };

    if (isFinite(renderToIndex.min) && 
        isFinite(renderToIndex.max) && 
        renderToIndex !== this.state.renderToIndex) {
      this.setState({ renderToIndex });
    }
  };

  renderChannel = ({ item, index }) => {
    const { renderToIndex } = this.state;

    if (index > renderToIndex.max || index < renderToIndex.min) { 
      return <View style={ACChannelStyle} />;
    }

    const { name, majorChannelNumber } = item.channel;

    const uri = majorChannelNumber ? `res://drawable/default/${majorChannelNumber}.png` : null;

    return (
      <View style={ACChannelStyle}>
        <ACImage style={ACChannelImageStyle} source={{ uri }}>
          <Text style={{ ...ACDefaultTextStyle, alignSelf: 'center' }}>{name}</Text>
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
        extraData={this.state.renderToIndex}
        keyExtractor={(data, index) => '' + index}
        renderItem={this.renderChannel}
        decelerationRate='fast'
        snapToAlignment='start'
        snapToInterval={ACDefaultHeight}
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={this.handleOnViewableItemsChanged}
      />
    );
  };
};

export default ACChannels;
