import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { ACImage } from '../../../../../index'
import { ACContentAdvisory, ACTagLine } from './subcomponents';

import PropTypes from 'prop-types';

import { ACDefaultTitleTextStyle, ACDefaultBodyTextStyle } from '../../../../../../styles';

class ACModal extends PureComponent {
  static propTypes = {
    style: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render = () => {
    const { data, style } = this.props;

    const { parentalRating, title, description, tvAdvisories, images, consumables, releaseYear, genres } = data;

    const { width, height, imageUrl } = images[2];

    const { parentalRatingStyle, titleStyle, bodyStyle } = styles;

    return (
      <View style={style}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <ACImage style={{ width, height, marginLeft: 15 }} source={{ uri: imageUrl }} />
          </View>
          <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
            <Text style={parentalRatingStyle}>{parentalRating}</Text>
            <Text style={titleStyle}>{title}</Text>
            <ACTagLine
              style={bodyStyle}
              duration={consumables[0].duration}
              startTime={consumables[0].startTime}
              endTime={consumables[0].endTime}
              releaseYear={releaseYear}
              genres={genres}
            />
            <Text style={bodyStyle}>{description}</Text>
            <ACContentAdvisory style={bodyStyle} tvAdvisories={tvAdvisories} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  parentalRatingStyle: {
    ...ACDefaultTitleTextStyle,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  titleStyle: {
    ...ACDefaultTitleTextStyle,
    marginTop: 10,
  },
  bodyStyle: {
    ...ACDefaultBodyTextStyle,
    marginTop: 10,
  },
};

export default ACModal;
