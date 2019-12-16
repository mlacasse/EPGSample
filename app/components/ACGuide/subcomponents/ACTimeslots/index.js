import React, { createRef, PureComponent, Fragment } from 'react';
import { View, FlatList, ScrollView, NativeModules } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

import _debounce from 'lodash.debounce';

import PropTypes from 'prop-types';

import ACModal from './subcomponents/ACModal';
import ACHeader from './subcomponents/ACHeader';
import ACRow from './subcomponents/ACRow';

import {
  ACTimeslotDefaultWidth,
  ACDefaultHeight,
  ACModalStyle,
} from '../../../../styles';

const { Dimensions } = NativeModules;

class ACTimeslots extends PureComponent {
  static propTypes = {
    channels: PropTypes.array.isRequired,
    duration: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      grid: {
        width: this.props.duration * ACTimeslotDefaultWidth,
      },
    };

    this.viewRef = createRef();
    this.listRef = createRef();

    this.timer = null;
  }

  scrollTo = (x, offset) => {
    this.hideModal();

    this.viewRef.current.scrollTo({ animated: true, x });
    this.listRef.current.scrollToOffset({ animated: true, offset });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  showModal = _debounce(data => {
    clearTimeout(this.timer);

    this.setState({ showModal: true, data });

    this.timer = setTimeout(this.hideModal, 5000);
  }, 250, { leading: true, trailing: false });

  handleOnScroll = event => {
    const { onScroll } = this.props;
    const { contentOffset } = event.nativeEvent;

    onScroll(contentOffset.y);
  };

  renderTimeslotRow = ({ item, index }) => {
    return (
      <ACRow
        contents={item.contents}
        grid={this.state.grid}
        row={index}
        onFocus={this.props.onFocus}
      />
    );
  };

  renderModal = () => {
    if (!this.state.showModal) return null;

    const { grid } = this.state;

    const width = grid.width > Dimensions.window.width ? '100%' : grid.width;

    return (
      <ACModal data={this.state.data} style={{ ...ACModalStyle, width }} />
    );
  };

  render() {
    const { channels, duration } = this.props;

    return (
      <Fragment>
        <ScrollView
          horizontal
          ref={this.viewRef}
          scrollEnabled={!FormFactor.isTV}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <ACHeader duration={duration} />
            <FlatList
              ref={this.listRef}
              scrollEnabled={!FormFactor.isTV}
              data={channels}
              keyExtractor={(data, index) => '' + index}
              renderItem={this.renderTimeslotRow}
              decelerationRate='fast'
              snapToAlignment='start'
              snapToInterval={ACDefaultHeight}
              scrollEventThrottle={16}
              onScroll={this.handleOnScroll}
            />
          </View>
        </ScrollView>
        {this.renderModal()}
      </Fragment>
    );
  }
};

export default ACTimeslots;
