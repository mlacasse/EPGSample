import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { calculateTime } from '../../../../../../utils';

import ACImage from '../../../../../ACImage'

import PropTypes from 'prop-types';

import {
  ACDefaultTitleTextStyle,
  ACDefaultBodyTextStyle,
  ACModalBodyTextStyle,
  ACModalImageStyle,
} from '../../../../../../styles';

class ACModal extends PureComponent {
  static propTypes = {
    style: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
  };

  renderReleaseYear = releaseYear => {
    if (!releaseYear) return '';

    return ` | ${releaseYear}`;
  };

  renderDurationText = duration => {
    if (!duration) return null;

    return (
      `${Math.floor(duration / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping:false })} min`
    );
  };

  renderScheduledTime = (startTime, endTime) => {
    if (!startTime || !endTime) return null;

    return ` | ${calculateTime(startTime)} - ${calculateTime(endTime)}`;
  };

  renderGenres = genres => {
    if (!genres) return null;

    return (
        genres.map((genre) => {
          return ' | ' + genre;
        })
    );
  };

  renderParentalRating = parentalRating => {
    if (!parentalRating) return null;

    return ` | ${parentalRating}`;
  };

  renderTagLine = data => {
    const { parentalRating, consumables, releaseYear, genres } = data;

    const { duration, startTime, endTime } = consumables[0];

    return (
      <Text style={ACDefaultBodyTextStyle}>
        {this.renderDurationText(duration)}
        {this.renderGenres(genres)}
        {this.renderReleaseYear(releaseYear)}
        {this.renderScheduledTime(startTime, endTime)}
        {this.renderParentalRating(parentalRating)}
      </Text>
    );
  };

  renderAdvisory = tvAdvisories => {
    if (!tvAdvisories) return null;

    return (
      <Text style={ACDefaultBodyTextStyle}>
        Content Advisory : {tvAdvisories.map((advisory, index) => {
          const separator = index > 0 ? ' | ' : '';

          return separator + advisory;
        })}
      </Text>
    );
  };

  renderDescription = description => {
    return <Text style={ACModalBodyTextStyle}>{description}</Text>;
  };

  render() {
    const { data, style } = this.props;

    if (!data) return null;

    const { title, description, tvAdvisories, images } = data;

    const { imageId } = images[0];

    return (
      <View style={{...style, flexDirection: 'row', justifyContent: 'flex-start' }}>
        <ACImage
          style={ACModalImageStyle}
          source={{ uri: `res://drawable/default/${imageId}.jpeg` }}
          default={{ uri: 'res://drawable/default/default.jpeg' }}
        />
        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 5 }}>
          <Text style={ACDefaultTitleTextStyle}>{title}</Text>
          {this.renderTagLine(data)}
          {this.renderDescription(description)}
          {this.renderAdvisory(tvAdvisories)}
        </View>
      </View>
    );
  }
}

export default ACModal;
