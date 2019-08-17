import React, { PureComponent, Fragment } from 'react';
import {
  findNodeHandle,
  View, 
  Image, 
  NativeModules
} from 'react-native';

const { ImageUtilityModule } = NativeModules;

class ACImage extends PureComponent {
  constructor(props) {
    super(props);

    this.imageRef = null;
    this.tombstoneRef = null;
  }

  componentDidMount = () => {
    const imageHandle = findNodeHandle(this.imageRef);

    ImageUtilityModule.setImage(imageHandle, this.props.source.uri);
  }

  handleImageOnLoad = () => {
    const tombstoneHandle = findNodeHandle(this.tombstoneRef);

    ImageUtilityModule.show(tombstoneHandle, false);
  };

  render() {
    return (
      <Fragment>
        <View
          ref={(ref) => {this.tombstoneRef = ref}}
          style={[{ display: 'flex', justifyContent: 'center' }, this.props.style]}>
            {this.props.children}
        </View>
        <View style={{ position: 'absolute', backgroundColor: 'transparent' }}>
          <Image
            ref={(ref) => {this.imageRef = ref}}
            style={[{ resizeMode: 'contain' }, this.props.style ]}
            onLoad={this.handleImageOnLoad}
          />
        </View>
      </Fragment>
    );
  }
}

export default ACImage;
