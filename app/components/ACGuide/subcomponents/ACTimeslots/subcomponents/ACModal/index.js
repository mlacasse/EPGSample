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

  render = () => {
    const { data, style } = this.props;

    const { parentalRating, title, description, tvAdvisories, images, consumables, releaseYear, genres } = data;

    const { width, height, imageUrl } = images[2];

    const { titleStyle, bodyStyle } = styles;

    return (
      <View style={style}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <ACImage style={{ width, height, marginLeft: 15 }} source={{ uri: imageUrl }}>
              <View style={{ flex: 1, backgroundColor: 'grey' }} />
            </ACImage>
          </View>
          <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={titleStyle}>{title}</Text>
            </View>
            <ACTagLine
              style={bodyStyle}
              duration={consumables[0].duration}
              startTime={consumables[0].startTime}
              endTime={consumables[0].endTime}
              releaseYear={releaseYear}
              genres={genres}
              parentalRating={parentalRating}
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
  titleStyle: {
    ...ACDefaultTitleTextStyle,
    marginTop: 10,
    flex: 0.8,
    flexShrink: 1,
  },
  bodyStyle: {
    ...ACDefaultBodyTextStyle,
    marginTop: 10,
    flexShrink: 1,
  },
};

export default ACModal;
