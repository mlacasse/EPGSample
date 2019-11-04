import React, { createRef, PureComponent } from 'react';
import { FlatList } from 'react-native';
import { ACChannel } from './subcomponents';

import { ACDefaultHeight, ACTimeslotHeaderHeight } from '../../../../styles';

class ACChannels extends PureComponent {
  constructor(props) {
    super(props);

    this.listRef = createRef();
  }

  scrollTo = (offset) => {
    this.listRef.value.scrollToOffset({ animated: true, offset });
  }

  renderChannel = (data) => {
    const { channel } = data.item;

    return (
      <ACChannel channel={channel} />
    );
  }

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
  }
};

export default ACChannels;
