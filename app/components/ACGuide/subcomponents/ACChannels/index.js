import React, { createRef, PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ACChannel } from './subcomponents';
import { ACChannelTextStyle } from './styles';

class ACChannels extends PureComponent {
  constructor(props) {
    super(props);

    this.listRef = createRef();
  }

  scrollToIndex = (index) => {
    this.listRef.value.scrollToIndex({ animated: true, index });
  }

  renderChannel = (item) => {
    const { resourceId, name } = item.item.channel;

    return (
      <ACChannel resourceId={resourceId}>
        <Text style={ACChannelTextStyle}>{name}</Text>
      </ACChannel>
    );
  }

  render = () => {
    return (
      <FlatList
        ref={this.listRef}
        scrollEnabled={false}
        data={this.props.channels}
        keyExtractor={data => data.resourceId}
        renderItem={this.renderChannel}
        snapToAlignment='start'
        snapToInterval={0}
        initialNumToRender={50}
      />
    );
  }
};

export default ACChannels;
