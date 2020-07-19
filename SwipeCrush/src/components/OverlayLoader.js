import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Config, Theme, Style } from "src/util";
import { Loader } from 'src/components';

class OverlayLoader extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
  }

  render() {
    return (
      <View style={styles.overlay}>
        <View style={{height: 200, width: 100}}></View>
        <Loader />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  overlay: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + StatusBar.currentHeight,
    backgroundColor: 'rgba(0,0,0,0.85)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999999,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { OverlayLoader }