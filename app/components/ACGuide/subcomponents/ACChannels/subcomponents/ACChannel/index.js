import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import ACImage from '../../../../../ACImage';
import PropTypes from 'prop-types';

import { ACChannelStyle, ACChannelImageStyle, ACDefaultTextStyle } from '../../../../../../styles';

class ACChannel extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
  }

  getChannelImageLogoUrl = () => {
    if (!this.props.channel.resourceId) return { uri: null };

    const { width, height } = ACChannelImageStyle;

    const uri = `https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/channel/${this.props.channel.resourceId}/chlogo-clb-guide/${width}/${height}`;
    
    console.log('CHANNEL LOGO', uri);

    return { uri };
  };
  
  render = () => {
    const { name } = this.props.channel;

    return (
      <View style={ACChannelStyle}>
        <ACImage style={ACChannelImageStyle} source={this.getChannelImageLogoUrl()}>
          <Text style={{ ...ACDefaultTextStyle, alignSelf: 'center' }}>{name}</Text>
        </ACImage>
      </View>
    );
  }
};

export default ACChannel;
