import React, { PureComponent } from 'react';
import { Text } from 'react-native';

import PropTypes from 'prop-types';

class ACContentAdvisory extends PureComponent {
  static propTypes = {
    style: PropTypes.object.isRequired,
    tvAdvisories: PropTypes.array,
  };

  constructor(props) {
    super(props);
  }

  render = () => {
    const { tvAdvisories, style } = this.props;

    if (!tvAdvisories) return null;

    return (
      <Text style={style}>
        Content Advisory : {tvAdvisories.map((advisory, index) => {
          const separator = index > 0 ? ' | ' : '';

          return separator + advisory;
        })}
      </Text>
    );
  }
}

export default ACContentAdvisory;
