import React, { createRef, PureComponent, Fragment } from 'react';
import { NativeModules } from 'react-native';
import { View, FlatList, ScrollView, FormFactor } from '@youi/react-native-youi';

import PropTypes from 'prop-types';

import { ACModal, ACTimeslotHeader, ACTimeslotRow } from './subcomponents';

import {
  ACTimeslotDefaultWidth,
  ACTimeslotHeaderHeight,
  ACDefaultHeight,
} from '../../../../styles';

const { Dimensions } = NativeModules;

class ACTimeslots extends PureComponent {
  static propTypes = {
    timeslots: PropTypes.array.isRequired,
    channels: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      grid: {
        width: this.props.timeslots.length * ACTimeslotDefaultWidth,
      },
    };

    this.viewRef = createRef();
    this.listRef = createRef();

    this.timer = null;
  }

  scrollTo = (x, offset) => {
    this.viewRef.value.scrollTo({ animated: FormFactor.isTV, x });
    this.listRef.value.scrollToOffset({ animated: FormFactor.isTV, offset });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  showModal = (data) => {
    clearTimeout(this.timer);

    this.setState({ showModal: true, data });

    this.timer = setTimeout(this.hideModal, 5000);
  }

  handleOnScroll = event => {
    const { onScroll } = this.props;
    const { contentOffset } = event.nativeEvent;

    onScroll(contentOffset.y);
  };

  renderTimeslotRow = (data) => {
    const { item, index } = data;

    return (
      <ACTimeslotRow contents={item.contents} grid={this.state.grid} row={index} onFocus={this.props.onFocus}/>
    );
  }

  renderModal = () => {
    if (!FormFactor.isTV || !this.state.showModal) return null;

    const { grid } = this.state;

    const width = grid.width > Dimensions.window.width ? '100%' : grid.width;

    return (
      <ACModal
        data={this.state.data}
        style={{
          backgroundColor: 'white',
          borderColor: '#4DB8FF',
          borderWidth: 3,
          position: 'absolute',
          top: ACDefaultHeight + ACTimeslotHeaderHeight,
          width,
        }} />
    );
  }

  render = () => {
    const { channels, timeslots, duration } = this.props;
    
    return (
      <Fragment>
        <ScrollView
          horizontal
          ref={this.viewRef}
          scrollEnabled={!FormFactor.isTV}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <ACTimeslotHeader timeslots={timeslots} duration={duration} />
            <FlatList
              ref={this.listRef}
              scrollEnabled={!FormFactor.isTV}
              data={channels}
              keyExtractor={(data, index) => '' + index}
              renderItem={this.renderTimeslotRow}
              decelerationRate='fast'
              snapToAlignment='start'
              snapToInterval={ACDefaultHeight}
              windowSize={20}
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
