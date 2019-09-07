import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import PropTypes from 'prop-types';

class ACTagLine extends PureComponent {
  static propTypes = {
    style: PropTypes.object.isRequired,
    duration: PropTypes.number.isRequired,
    genres: PropTypes.array,
    releaseYear: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  createDurationText = (duration) => {
    if (!duration) return null;

    return (
      `${Math.floor(duration / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping:false })} min`
    );
  }

  calculateTime = (timestamp) => {
    const options = {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    };

    const newDateTime = new Date(timestamp);

    return newDateTime.toLocaleTimeString('en-US', options);
  }

  renderReleaseYear = () => {
    const { releaseYear } = this.props;

    if (!releaseYear) return '';

    return ` | ${releaseYear}`;
  }

  renderDurationText = () => {
    const { style, duration } = this.props;

    if (!style || !duration) return '';

    return this.createDurationText(duration);
  }

  renderTimeWindow = () => {
    const { startTime, endTime } = this.props;
    if (!startTime || !endTime) return '';

    return ` | ${this.calculateTime(startTime)} - ${this.calculateTime(endTime)}`;
  }

  renderGenres = () => {
    const { genres } = this.props;

    if (!genres) return null;

    return (
        genres.map((genre) => {
          return ' | ' + genre;
        })
    );
  }

  renderParentalRating = () => {
    const { parentalRating } = this.props;

    if (!parentalRating) return null;

    return ` | ${parentalRating}`;
  }

  render = () => {
    const { style } = this.props;

    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={style}>
          {this.renderDurationText()}{this.renderGenres()}{this.renderReleaseYear()}{this.renderTimeWindow()}{this.renderParentalRating()}
        </Text>
      </View>
    );
  }
}

export default ACTagLine;
