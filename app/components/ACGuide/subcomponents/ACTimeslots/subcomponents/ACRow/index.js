import React, { PureComponent } from 'react';
import { Text, ScrollView } from '@youi/react-native-youi';

import PropTypes from 'prop-types';

import ACSlot from '../ACSlot';

import {
  ACTimeslotFocusStyle,
  ACTimeslotStyle,
  ACTimeslotDefaultInterval,
  ACTimeslotDefaultWidth,
  ACDefaultTextStyle,
} from '../../../../../../styles';

class ACRow extends PureComponent {
  static propTypes = {
    contents: PropTypes.array.isRequired,
    grid: PropTypes.object.isRequired,
    row: PropTypes.number.isRequired,
  };

  calculateWidth = duration => {
    const { width } = ACTimeslotStyle;
    const slots = duration / ACTimeslotDefaultInterval;

    return slots * width;
  };

  render = () => {
    const { contents, grid, row } = this.props;

    let cumulativeWidth = 0;

    return (
      <ScrollView
        horizontal
        scrollEnabled={false}>
        {contents.map((content) => {
          let width = this.calculateWidth(content.consumables[0].duration);

          if (cumulativeWidth + width > grid.width) {
            width = grid.width - cumulativeWidth;
          }

          if (width > 0) {
            cumulativeWidth += width;

            return (
              <ACSlot
                focusable={!content.empty}
                key={content.resourceId}
                data={content}
                row={row}
                style={{...ACTimeslotStyle, width }}
                focusStyle={{...ACTimeslotFocusStyle, width }}
                onFocus={this.props.onFocus}
                onHighlight={this.props.highlight}
                onUnhighlight={this.props.unhighlight}
                {...this.props}
              >
                <Text style={ACDefaultTextStyle}>
                  {/* No point rendering the title if width is so small */}
                  {width < ACTimeslotDefaultWidth / 4 ? '...' : content.title}
                </Text>
              </ACSlot>
            );
          }
        })}
      </ScrollView>
    );
  };
};

export default ACRow;
