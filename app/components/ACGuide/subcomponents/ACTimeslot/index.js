import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';

class ACTimeslot extends PureComponent {
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
  },
  imageStyle: {
    width: 56,
    height: 42,
  },
  textStyle: {
    fontSize: 14,
    color: 'blue',
  },
};

export default ACTimeslot;