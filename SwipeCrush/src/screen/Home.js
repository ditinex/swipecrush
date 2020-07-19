import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BoxShadow} from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Loader, KeyboardSafeArea } from "src/components"
import { Config, Theme, Style } from "src/util"

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    componentDidMount = () => {
    }
    componentWillUnmount = () => {}

    render() {
      return (
        <View style={styles.container}>
          {this.header()}
        </View>
      );
    }

    header(){
      return(
        <View style={styles.header}>
          <LinearGradient
          start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
          locations={[0,0.9]}
          colors={Theme.dpborder}
          style={styles.dpWrapper}>
            <Image
            style={styles.dp}
            resizeMode="cover"
            source={{uri: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg'}}
            />
          </LinearGradient>
          <Text style={styles.name}>Hello, Aantika</Text>
          <TouchableOpacity style={styles.settings} >
            <Icon name='cog' size={32} color={Theme.deepgrey} />
          </TouchableOpacity>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Config.statusBarHeight,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: Theme.lightblue
  },
  header:{ flexDirection: 'row' },
  dpWrapper:{
    width: 80,
    height: 80,
    padding: 3,
    borderRadius: 80,
    margin: 10
  },
  dp:{
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  name:{ paddingTop: 35, fontSize: 16, color: Theme.green, flex: 1 },
  settings: {
    marginTop: 25, marginRight: 10, borderRadius: 50, borderWidth: 1, borderColor: Theme.grey,
    paddingHorizontal: 5, paddingVertical: 3, height: 40,
  }
});


export { Home }