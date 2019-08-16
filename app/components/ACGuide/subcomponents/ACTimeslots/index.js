import React, { createRef, PureComponent, Fragment } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

import ACTimeslot from '../ACTimeslot';

const intervalWidth = 450 * 0.25;
const interval = 1800; // half an hour

class ACTimeslots extends PureComponent {
  constructor(props) {
    super(props);

    this.currentDay = this.props.currentDay;

    this.epgTimeslots = createRef();
    this.epgEpisodes = createRef();
  }

  renderTimeBlockItem = (data) => {
    const delta = 30 * 60000 * data.index;
    const newDateTime = new Date(this.currentDay.getTime() + delta);

    const options = {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    };

    return (
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{newDateTime.toLocaleTimeString('en-US', options)}</Text>
      </View>
    );
  }

  renderTimeslotsHeader = (timeslots) => {
    return (
      <FlatList
        horizontal
        scrollEnabled={false}
        ref={this.epgTimeslots}
        data={timeslots}
        keyExtractor={data => '' + data}
        renderItem={this.renderTimeBlockItem}
        snapToAlignment='start'
        snapToInterval={0}
        initialNumToRender={5}
        updateCellsBatchingPeriod={2000}
        maxToRenderPerBatch={5}
      />
    );
  }

  renderEpisodeBlockItem = (data) => {
    return (
      <ScrollView horizontal>
        {data.item.contents.map((content) => {
          const { duration } = content.consumables[0];

          const slots = duration / interval;
          const width = (slots * intervalWidth) + (styles.containerStyle.borderWidth * (slots - 1));

          return (
            <Fragment>
              <View style={[styles.containerStyle, { width }]}>
                <Text style={styles.textStyle}>{content.title}</Text>
              </View>
              <View style={styles.separatorStyle} />
            </Fragment>
          );
        })}
      </ScrollView>
    );
  }

  render = () => {
    const { timeslots, channels } = this.props;
    const { containerStyle, imageStyle, textStyle } = styles;
    
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <FlatList
          scrollEnabled={false}
          ref={this.epgEpisodes}
          data={channels}
          keyExtractor={data => '' + data.resourceId}
          renderItem={this.renderEpisodeBlockItem}
          ListHeaderComponent={this.renderTimeslotsHeader(timeslots)}
          snapToAlignment='start'
          snapToInterval={0}
          initialNumToRender={5}
          updateCellsBatchingPeriod={2000}
          maxToRenderPerBatch={5}
        />
      </View>
    );
  }
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: intervalWidth,
    borderColor: 'black',
    borderWidth: 1,
    height: 42,
  },
  textStyle: {
    fontSize: 12,
    color: 'white',
  },
};

export default ACTimeslots;
