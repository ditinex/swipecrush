import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Loader, OverlayLoader } from "src/components"
import { Config, Theme, Style } from "src/util"

/* Set global dimensions */
      Config.deviceHeight = Dimensions.get('window').height
      Config.deviceWidth = Dimensions.get('window').width
      Config.relativeHeight = Config.deviceHeight/Config.standardHeight
      Config.relativeWidth = Config.deviceWidth/Config.standardWidth
      Config.statusBarHeight = StatusBar.currentHeight
/*------------------------*/

//console.log('H:'+Config.deviceHeight)
//console.log('W:'+Config.relativeWidth)

class Splash extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {}
  	}

    componentDidMount(){
      self = this
      setTimeout(function(){
        self.props.navigation.replace('Home');
      }, 3000);
    }


  	render() {
    	return (
        <View style={Style.flex1}>
          <LinearGradient
          start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
          locations={[0,0.6]}
          colors={Theme.splashScreen}
          style={styles.container}>
            <Image
              style={styles.image}
              source={require('src/assets/splash.png')}
              resizeMethod="resize"
              resizeMode="contain"
            />
            <Text style={styles.logo}>Swipe  Crush</Text>
            <Text style={styles.tagline}>Swipe To Find Your Crush</Text>
            <Loader style={styles.loader} />
          </LinearGradient>
        </View>
    	);
  	}

    
}


export { Splash }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: Config.statusBarHeight
  },
  image: {
    width: Config.relativeWidth * 180,
    height: Config.relativeHeight * 200,
  },
  loader: {
    marginTop: Config.relativeHeight * 50
  },
  logo: {
    color: '#FFF',
    fontSize: Config.relativeHeight * 30,
    letterSpacing: Config.relativeWidth * 3,
    fontWeight: 'bold',
    marginTop: Config.relativeHeight * 20
  },
  tagline: {
    color: '#FFF',
    fontSize: Config.relativeHeight * 16,
    marginTop: Config.relativeHeight * 10
  }
});
