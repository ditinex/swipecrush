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

import { Loader } from "src/components"
import { Config, Theme, ChangeTheme } from "src/util"

/* Set global dimensions */
      Config.deviceHeight = Dimensions.get('window').height
      Config.deviceWidth = Dimensions.get('window').width
      Config.relativeHeight = Config.deviceHeight/Config.standardHeight
      Config.relativeWidth = Config.deviceWidth/Config.standardWidth
      Config.statusBarHeight = StatusBar.currentHeight
/*------------------------*/

//console.log('H:'+Config.deviceHeight)
//console.log('W:'+Config.relativeWidth)

var config = {}
var styles = {}
var theme = {}

class Splash extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {}
      config = (this.props.route.params.config) ? this.props.route.params.config : Config
      theme = (this.props.route.params.theme) ? this.props.route.params.theme : Theme
      this.createStyle()
  	}

    componentDidMount(){
      ChangeTheme('dark')
      self = this
      setTimeout(function(){
        self.props.navigation.replace('Home');
      }, 3000);
    }

  	render() {
    	return (
        <LinearGradient
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
        locations={[0,0.6]}
        colors={theme.splashScreen}
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
    	);
  	}

    createStyle(){
      styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingTop: config.statusBarHeight
        },
        image: {
          width: config.relativeWidth * 180,
          height: config.relativeHeight * 200,
        },
        loader: {
          marginTop: config.relativeHeight * 50
        },
        logo: {
          color: '#FFF',
          fontSize: config.relativeHeight * 30,
          letterSpacing: config.relativeWidth * 3,
          fontWeight: 'bold',
          marginTop: config.relativeHeight * 20
        },
        tagline: {
          color: '#FFF',
          fontSize: config.relativeHeight * 16,
          marginTop: config.relativeHeight * 10
        }
      });
    }
}



export { Splash }
