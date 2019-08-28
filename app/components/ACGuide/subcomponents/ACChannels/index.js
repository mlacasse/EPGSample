import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { ACChannel } from './subcomponents';

import { ACDefaultHeight } from '../../../../styles';

class ACChannels extends PureComponent {
  constructor(props) {
    super(props);

    this.listRef = null;
  }

  setListRef = (ref) => {
    this.listRef = ref;
  }

  scrollTo = (offset) => {
    this.listRef.scrollToOffset({ animated: true, offset });
  }

  renderChannel = (data) => {
    const { resourceId } = data.item.channel;

    return (
      <ACChannel resourceId={resourceId} />
    );
  }

  render = () => {
    return (
      <FlatList
        ref={this.setListRef}
        style={{marginTop: ACDefaultHeight }}
        scrollEnabled={false}
        data={this.props.channels}
        keyExtractor={(data, index) => '' + index}
        renderItem={this.renderChannel}
        snapToAlignment='start'
        snapToInterval={ACDefaultHeight}
        decelerationRate='fast'
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={500}
        windowSize={20}
      />
    );
  }
};

export default ACChannels;
