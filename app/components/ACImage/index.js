import React, { PureComponent, Fragment, createRef } from 'react';
import {
  findNodeHandle,
  View, 
  Image, 
  NativeModules
} from 'react-native';

import PropTypes from 'prop-types';

const { ImageUtilityModule } = NativeModules;

class ACImage extends PureComponent {
  static propTypes = {
    style: PropTypes.array.isRequired,
    source: PropTypes.object.isRequired,
    default: PropTypes.object,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.imageRef = createRef();
    this.tombstoneRef = createRef();
  }

  componentDidMount = () => {
    const imageHandle = this.getImageHandle();

    if (imageHandle) {
      ImageUtilityModule.setImage(imageHandle, this.props.source.uri);
    }
  };

  componentDidUpdate = (prevProps, _prevState) => {
    if (prevProps.source.uri === this.props.source.uri) return;

    const imageHandle = this.getImageHandle();
    const tombstoneHandle = this.getTombstoneHandle();

    if (tombstoneHandle && imageHandle) {
      ImageUtilityModule.show(tombstoneHandle, true);
      ImageUtilityModule.reset(imageHandle);
      ImageUtilityModule.setImage(imageHandle, this.props.source.uri);
    }
  };

  getTombstoneHandle = () => {
    return findNodeHandle(this.tombstoneRef.current);
  };

  getImageHandle = () => {
    return findNodeHandle(this.imageRef.current);
  };

  handleImageOnLoad = () => {
    const tombstoneHandle = this.getTombstoneHandle();

    if (tombstoneHandle) {
      ImageUtilityModule.show(tombstoneHandle, false);
    }
  };

  handleOnError = () => {
    if (!this.props.default) return null;

    const imageHandle = this.getImageHandle();
    const tombstoneHandle = this.getTombstoneHandle();

    if (tombstoneHandle && imageHandle) {
      ImageUtilityModule.show(tombstoneHandle, true);
      ImageUtilityModule.reset(imageHandle);
      ImageUtilityModule.setImage(imageHandle, this.props.default.uri);
    }
  };

  render() {
    return (
      <Fragment>
        <View
          ref={this.tombstoneRef}
          style={{ display: 'flex', justifyContent: 'center', ...this.props.style}}>
            {this.props.children}
        </View>
        <View style={{ position: 'absolute', backgroundColor: 'transparent' }}>
          <Image
            ref={this.imageRef}
            style={{ resizeMode: 'contain', ...this.props.style }}
            onLoad={this.handleImageOnLoad}
            onError={this.handleOnError}
          />
        </View>
      </Fragment>
    );
  }
}

export default ACImage;
