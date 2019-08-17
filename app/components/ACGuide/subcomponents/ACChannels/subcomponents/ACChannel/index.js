import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

import PropTypes from 'prop-types';

import { ACChannelStyle, ACChannelImageStyle } from '../../styles';

class ACChannel extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
  }

  getChannelImageLogoUrl = () => {
    const { width, height } = ACChannelImageStyle;

    return { uri: `https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/channel/${this.props.resourceId}/chlogo-clb-guide/${width}/${height}` };
  };
  
  render = () => {
    return (
      <View style={ACChannelStyle}>
        <Image style={ACChannelImageStyle} source={this.getChannelImageLogoUrl()} />
        {this.props.children}
      </View>
    );
  }
};

export default ACChannel;
