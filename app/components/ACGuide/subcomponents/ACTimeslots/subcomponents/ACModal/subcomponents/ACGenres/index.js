import React, { PureComponent } from 'react';
import { Text } from 'react-native';

import PropTypes from 'prop-types';

class ACGenres extends PureComponent {
  static propTypes = {
    style: PropTypes.object.isRequired,
    genres: PropTypes.array,
  };

  constructor(props) {
    super(props);
  }

  render = () => {
    const { genres, style } = this.props;

    if (!genres) return null;

    return (
      <Text style={style}>
        {genres.map((genre) => {
          return ' | ' + genre;
        })}
      </Text>
    );
  }
}

export default ACGenres;

