import React, { createRef, PureComponent, Fragment } from 'react';
import { View, Text, Image, FlatList, NativeModules } from 'react-native';

import { ACChannel } from './subcomponents';

const { Dimensions } = NativeModules;

class ACChannels extends PureComponent {
  constructor(props) {
    super(props);

    this.epgChanneList = createRef();
  }

  renderHeader = () => {
    return (
      <View style={styles.headerStyle} />
    );
  }

  renderChannel = (item) => {
    const { resourceId, name } = item.item.channel;

    return (
      <ACChannel resourceId={resourceId} channelName={name} />
    );
  }

  render = () => {
    return (
      <FlatList
        scrollEnabled={false}
        ref={this.epgChanneList}
        data={this.props.channels}
        keyExtractor={data => data.resourceId}
        renderItem={this.renderChannel}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.renderEmpty}
        snapToAlignment='start'
        snapToInterval={0}
        initialNumToRender={50}
      />
    );
  }
};

const styles = {
  headerStyle: {
    flex: 1,
    height: 42,
  },
  emptyStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    height: Dimensions.window.height,
  },
  textStyle: {
    fontSize: 14,
    color: 'black',
  },
};

export default ACChannels;