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
//import {BoxShadow} from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Loader, KeyboardSafeArea } from "src/components"
import { Config, Theme, Style } from "src/util"

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: '',
        password: '',
        formContainerHeight: 0
      }
    }

    //componentDidMount = () => {}
    //componentWillUnmount = () => {}


    signup = () => {
      //self.props.navigation.replace('Login');
    }

    centralizeButton = (event) => {
      let {x, y, width, height} = event.nativeEvent.layout;
      if(this.state.formContainerHeight!=height)
        this.setState({formContainerHeight: height})
    }


    render() {
      
      return (
        <View style={styles.container}>
              <TouchableOpacity onPress={()=>this.props.navigation.replace('Signup')} style={styles.button}>
                <Image
                source={require('src/assets/button.png')}
                resizeMethod="resize"
                resizeMode="contain"
                />
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
    
            <KeyboardSafeArea style={styles.wrapper}>
              <Text style={styles.title}>Login</Text>
              {this.form()}
            </KeyboardSafeArea>
          
          <Image
            style={styles.cornerTop}
            source={require('src/assets/cornertop.png')}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Image
            style={styles.cornerBottom}
            source={require('src/assets/cornerbottom.png')}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
      );
    }

    form(){
      let top = (this.state.formContainerHeight/2) - 27
      return(
                <View style={styles.formContainer} onLayout={(event)=>this.centralizeButton(event)}>  
                  <View style={styles.buttonGroup}>
                    <Icon name="mobile" size={32} color={Theme.grey} style={styles.icon} />
                    <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({user: text})}
                    value={this.state.user}
                    placeholder="Mobile"
                    onSubmitEditing={() => this.passwordRef.focus()}
                    blurOnSubmit={true}
                    />
                  </View>

                    <LinearGradient
                    start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                    locations={[0,0.9999]}
                    colors={Theme.hr}
                    style={styles.hr} />

                  <View style={styles.buttonGroup}>
                    <Icon name="lock" size={32} color={Theme.grey} style={styles.icon} />
                    <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password: text})}
                    value={this.state.password}
                    ref={ref => this.passwordRef = ref} 
                    placeholder="Password"
                    />
                  </View>

                    <TouchableOpacity onPressIn={()=>this.signup()} style={[styles.touchableButton, {top: top}]}>
                      <LinearGradient
                      start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                      locations={[0,0.9]}
                      colors={Theme.circularButton}
                      style={styles.touchableWrapper} >
                      <Icon name="sign-in" size={32} color={Theme.white} />
                      </LinearGradient>
                    </TouchableOpacity>

                </View>
      );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Config.statusBarHeight,
    position: 'relative',
    overflow: 'hidden'
  },
  wrapper:{
    paddingTop: 200 * Config.relativeHeight,
    flex: 1,
  },
  button:{
    width: 200 ,
    height: 100 ,
    position: 'absolute',
    transform: [{ rotate: '0deg' }],
    right: -40,
    top: (Config.deviceHeight + Config.statusBarHeight) - 190,
    zIndex: 1,
  },
  buttonText:{
    color: Theme.white,
    position: 'absolute',
    top: 36,
    left: 42,
    fontSize: 20,
    fontWeight: 'bold', 
    letterSpacing: 2
  },
  title:{
    textAlign: 'center',
    fontSize: 30 * Config.relativeWidth,
    color: Theme.red, 
  },
  formContainer:{
    width: Config.deviceWidth - (50*Config.relativeWidth),
    marginTop: 50 * Config.relativeHeight,
    backgroundColor: '#FFF',
    borderBottomRightRadius: 100 * Config.relativeHeight,
    borderTopRightRadius: 100 * Config.relativeHeight,
    elevation: 10,
    overflow: 'visible' ,
  },
  buttonGroup:{
    flexDirection: 'row',
    width: Config.deviceWidth - (130*Config.relativeWidth),
    marginTop: 20 * Config.relativeHeight,
    marginBottom: 10 * Config.relativeHeight,
  },
  icon:{
    paddingLeft: 10*Config.relativeWidth,
    paddingRight: 10*Config.relativeWidth,
  },
  input:{ height: 40, flex: 1, fontSize: 16*Config.relativeWidth, color: '#A1A4A5' },
  hr:{
    height: 1.5 * Config.relativeHeight,
    width: Config.deviceWidth - (54*Config.relativeWidth),
  },
  cornerTop:{
    height: 285*1.2*Config.relativeHeight,
    width: 500*1.2*Config.relativeWidth,
    transform: [{ rotate: '0deg' }],
    position: 'absolute', 
    top: -100*Config.relativeHeight,
    left: -80*Config.relativeWidth, 
  },
  cornerBottom:{
    position:'absolute',
    left: 0,
    top: Config.deviceHeight - 150,
    height: 189,
    width: 500,
  },
  cornerBottom_old:{
    height: 189*1.4*Config.relativeHeight,
    width: 500*1.4*Config.relativeWidth,
    transform: [{ rotate: '15deg' }],
    position: 'absolute', 
    top: (Config.deviceHeight - (189*1.4*Config.relativeHeight)) + (75*Config.relativeHeight) + Config.statusBarHeight,
    left: -90*Config.relativeWidth, 
  },
  touchableButton:{
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    borderRadius:50,
    position: 'absolute',
    right: -15,
    //top: 45,
    elevation: 15,
  },
  touchableWrapper:{
    flex:1,
    width:50,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
  }
});

export { Login }