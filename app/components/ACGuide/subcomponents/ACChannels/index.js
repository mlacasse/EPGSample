import React, { PureComponent } from 'react';
import { Text, FlatList } from 'react-native';
import { ACChannel } from './subcomponents';
import { ACChannelTextStyle } from './styles';

class ACChannels extends PureComponent {
  constructor(props) {
    super(props);

    this.listRef = null;
  }

  scrollToIndex = (index) => {
    this.listRef.scrollToIndex({ animated: true, index });
  }

  renderChannel = (data) => {
    const { resourceId, name } = data.item.channel;

    return (
      <ACChannel resourceId={resourceId}>
        <Text style={ACChannelTextStyle}>{name}</Text>
      </ACChannel>
    );
  }

  render = () => {
    return (
      <FlatList
        ref={(ref) => {this.listRef = ref}}
        scrollEnabled={false}
        data={this.props.channels}
        keyExtractor={(data, index) => '' + index}
        renderItem={this.renderChannel}
        initialNumToRender={10}
        maxToRenderPerBatch={1}
        updateCellsBatchingPeriod={2000}
        windowSize={5}
      />
    );
  }
};

export default ACChannels;
