import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

class ACChannel extends PureComponent {
  constructor(props) {
    super(props);
  }

  getChannelImageLogoUrl = () => {
    const { width, height } = styles.imageStyle;

    return { uri: `https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/channel/${this.props.resourceId}/chlogo-clb-guide/${width}/${height}` };
  };
  
  render = () => {
    const { containerStyle, imageStyle, textStyle } = styles;

    return (
      <View style={containerStyle}>
        <Image style={imageStyle} source={this.getChannelImageLogoUrl()} />
        <Text style={textStyle}>{this.props.channelName}</Text>
      </View>
    );
  }
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderColor: 'black',
    borderWidth: 1,
  },
  imageStyle: {
    marginLeft: 10,
    width: 56,
    height: 42,
  },
  textStyle: {
    marginLeft: 15,
    fontSize: 14,
    color: 'black',
  },
};

export default ACChannel;