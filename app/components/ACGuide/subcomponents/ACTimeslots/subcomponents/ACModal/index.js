import React, { PureComponent } from 'react';
import { View, Image, Text } from 'react-native';

import { ACImage } from '../../../../../index'

import PropTypes from 'prop-types';

import { ACTimeslotDefaultWidth, ACDefaultHeight, ACDefaultTitleTextStyle, ACDefaultBodyTextStyle, ACDefaultTextStyle } from '../../../../../../styles';

/*
{ resourceType: 'CONTENT',
  resourceId: '2998ac9a-2c52-2507-43c4-b926255df8e8',
  itemType: 'VIDEO_PROGRAM',
  images: 
   [ { imageId: 'SH026066070000',
       imageType: 'poster',
       width: '297',
       height: '223',
       imageUrl: 'https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/show/SH026066070000/poster/297/223',
       defaultImageUrl: 'https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/show/default/poster/297/223' },
     { imageId: 'SH026066070000',
       imageType: 'bg-fplayer',
       width: '1920',
       height: '1080',
       imageUrl: 'https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/show/SH026066070000/bg-fplayer/1920/1080',
       defaultImageUrl: 'https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/show/default/bg-fplayer/1920/1080' },
     { imageId: 'SH026066070000',
       imageType: 'top-drawer',
       width: '300',
       height: '225',
       imageUrl: 'https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/show/SH026066070000/top-drawer/300/225',
       defaultImageUrl: 'https://dfwfis-sponsored.secure.footprint.net/catalog/image/imageserver/v1/service/show/default/top-drawer/300/225' } ],
  contentType: 'SPECIALSHOW',
  title: 'R. Kelly: Not Guilty',
  description: 'Singer R. Kelly has long been plagued by rumors that he has an affinity for underage girls.',
  metadataLanguage: 'en',
  parentalRating: 'TVPG',
  genres: [ 'Entertainment', 'Special', 'Documentary' ],
  originalAirDate: '2017-02-09',
  releaseYear: 2017,
  tmsId: 'SH026066070000',
  tmsConnectorId: 'SH026066070000',
  apgId: 'SH026066070000',
  canonicalId: '790e455d-70a1-4828-c419-253d3b8c27ec',
  categories: [ 'TV Show' ],
  consumables: 
   [ { consumableType: 'LINEAR',
       resourceId: '2998ac9a-2c52-2507-43c4-b926255df8e8',
       duration: 3600,
       startTime: '2019-08-12T20:00:00Z',
       endTime: '2019-08-12T21:00:00Z',
       parentalRating: 'TVPG',
       augmentation: 
        { constraints: 
           { isPlayable: true,
             isRecordable: true,
             isDAI: false,
             isFastForwardDisabled: false } },
       programChannelId: 'c3fbdc9f-44b7-76e3-23e9-cde81c5b3117',
       scheduleId: 'b70562d6-891d-38d9-a8b7-802e4d12fc6b',
       badges: [ 'AiringOn' ] } ] }
*/

class ACModal extends PureComponent {
  static propTypes = {
    style: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
  }

  createDurationText = (minutes) => {
    const duration = Math.floor(minutes / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    return `${duration}`;
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

  renderTVAdvisory = (tvAdvisories) => {
    if (!tvAdvisories) return null;

    return (
      <Text style={{ ...ACDefaultBodyTextStyle, marginTop: 10 }}>TV Adviory : {tvAdvisories.map((advisory, index) => {
        if (index > 0) {
          return ' | ' + advisory;
        }

        return advisory;
      })}
      </Text>
    );
  }

  renderGenres = (genres) => {
    if (!genres) return null;

    return genres.map((genre, index) => {
      if (index > 0) {
        return ` | ${genre}`;
      }
      return genre;
    });
  }

  renderMovie = () => {
    const { data, style } = this.props;

    const { parentalRating, title, description, releaseYear, consumables, genres, tvAdvisories, images } = data;

    const { duration, startTime, endTime } = consumables[0];

    const { width, height, imageUrl } = images[2];

    return (
      <View style={style}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <ACImage style={{ width, height, marginLeft: 15 }} source={{ uri: imageUrl }} />
          </View>
          <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
            <Text style={{ ...ACDefaultTitleTextStyle, position: 'absolute', right: 10, top: 10 }}>{parentalRating}</Text>
            <Text style={{ ...ACDefaultTitleTextStyle, marginTop: 10 }}>{title}</Text>
            <Text style={{ ...ACDefaultBodyTextStyle, marginTop: 5 }}>
              {this.createDurationText(duration)} min | {this.renderGenres(genres)}{releaseYear ? ` | ${releaseYear} | ` : ' | '}{this.calculateTime(startTime)} - {this.calculateTime(endTime)}
            </Text>
            <Text style={{ ...ACDefaultBodyTextStyle, marginTop: 10 }}>{description}</Text>
            {this.renderTVAdvisory(tvAdvisories)}
          </View>
        </View>
      </View>
    );
  }

  renderEpisode = () => {
      const { data, style } = this.props;
  
      const { parentalRating, releaseYear, seasonNumber, episodeNumber, episodeTitle, title, description, consumables, tvAdvisories, genres, images } = data;
  
      const { startTime, endTime } = consumables[0];
  
      const { width, height, imageUrl } = images[2];
  
      const seasonEpisodeText = seasonNumber ? `S${seasonNumber} E${episodeNumber} | ${releaseYear ? releaseYear : ''} | ` : `${releaseYear ? releaseYear + ' | ' : ''}`;

      return (
        <View style={style}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
              <ACImage style={{ width, height, marginLeft: 15 }} source={{ uri: imageUrl }} />
            </View>
            <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
              <Text style={{ ...ACDefaultTitleTextStyle, position: 'absolute', right: 10, top: 10 }}>{parentalRating}</Text>
              <Text style={{ ...ACDefaultTitleTextStyle, marginTop: 10 }}>{title}</Text>
              <Text style={{ ...ACDefaultBodyTextStyle, marginTop: 5 }}>
                {seasonEpisodeText}{episodeTitle ? `${episodeTitle} | ` : ''}{this.calculateTime(startTime)} - {this.calculateTime(endTime)}
              </Text>
              <Text style={{ ...ACDefaultBodyTextStyle, marginTop: 10 }}>{description}</Text>
              {this.renderTVAdvisory(tvAdvisories)}
            </View>
          </View>
        </View>
      );
    }

  renderShow = () => {
    const { data, style } = this.props;
  
    const { parentalRating, releaseYear, seasonNumber, episodeNumber, episodeTitle, title, description, consumables, tvAdvisories, genres, images } = data;

    const { startTime, endTime } = consumables[0];

    const { width, height, imageUrl } = images[2];

    const seasonEpisodeText = seasonNumber ? `S${seasonNumber} E${episodeNumber} | ${releaseYear ? releaseYear : ''} | ` : `${releaseYear ? releaseYear + ' | ' : ''}`;

    return (
      <View style={style}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <ACImage style={{ width, height, marginLeft: 15 }} source={{ uri: imageUrl }} />
          </View>
          <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
            <Text style={{ ...ACDefaultTitleTextStyle, position: 'absolute', right: 10, top: 10 }}>{parentalRating}</Text>
            <Text style={{ ...ACDefaultTitleTextStyle, marginTop: 10 }}>{title}</Text>
            <Text style={{ ...ACDefaultBodyTextStyle, marginTop: 5 }}>
              {seasonEpisodeText}{episodeTitle ? `${episodeTitle}| ` : ''}{this.calculateTime(startTime)} - {this.calculateTime(endTime)}
            </Text>
            <Text style={{ ...ACDefaultBodyTextStyle, marginTop: 10 }}>{description}</Text>
            {this.renderTVAdvisory(tvAdvisories)}
          </View>
        </View>
      </View>
    );
  }

  render = () => {
    const { contentType } = this.props.data;

    switch(contentType) {
      case 'MOVIE':
        return this.renderMovie();
        return this.renderShow();
      case 'EPISODE':
        return this.renderEpisode();
      case 'SPECIALSHOW':
      case 'SHOW':
      case 'SPORT':
      default:
        return this.renderShow();
    }
  }
}

export default ACModal;
