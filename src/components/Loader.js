import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Config, Theme, Style } from "src/util"

class Loader extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
  }

  render() {
    return (
      <View style={[ this.props.style, {flexDirection: 'row' } ]}>
        <Bullet delay={0} />
        <Bullet delay={100} />
        <Bullet delay={200} />
      </View>
    );
  }
}






class Bullet extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
    }
  }

  componentDidMount(){
    this.fadeAnimation()
  }

  fadeAnimation = () => {
    this.state.animate.setValue(0)
    Animated.timing(this.state.animate, {
        toValue: 2,
        duration: 1000,
        delay: this.props.delay,
        useNativeDriver: true,
      })
    .start(()=>this.fadeAnimation());
  };

  render(){
    const opacity = this.state.animate.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0.3, 1, 0.3]
    })
    return(
      <Animated.View style={[styles.circle, { opacity: opacity } ]}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
          locations={[0,0.9]}
          colors={Theme.loader}
          style={[Style.flex1]}
        >
        </LinearGradient>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  circle:{
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#FFF',
    margin: 10,
    overflow: 'hidden' 
  }
});

export { Loader }