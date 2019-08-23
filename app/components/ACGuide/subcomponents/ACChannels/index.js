import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { ACChannel } from './subcomponents';

import { ACChannelDefaultHeight } from './styles';

class ACChannels extends PureComponent {
  constructor(props) {
    super(props);

    this.listRef = null;
  }

  setListRef = (ref) => {
    this.listRef = ref;
  }

  scrollTo = (y) => {
    this.listRef.scrollToOffset({ animated: true, offset: y });
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
        style={{marginTop: ACChannelDefaultHeight }}
        scrollEnabled={false}
        data={this.props.channels}
        keyExtractor={(data, index) => '' + index}
        renderItem={this.renderChannel}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={500}
        windowSize={20}
      />
    );
  }
};

export default ACChannels;
