import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Dimensions,
  StatusBar,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Config, Theme } from "src/util"

var config = {}
var styles = {}
var theme = {}

class Popups extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      visible: true,
      otp: Array(6).fill('')
    }
    this.otpRef = Array(6).fill('')
    config = (this.props.config) ? this.props.config : Config
    theme = (this.props.theme) ? this.props.theme : Theme
    this.createStyle()
  }

  componentDidMount = () => {
    //this.setState({visible: true})
  }

  switchPopup = () => {
    switch(this.props.type){
      case 'noInternet':
        return this.noInternet()
      break;
      case 'underMaintenance':
        return this.underMaintenance()
      break;
      case 'verifyOtp':
        return this.verifyOtp()
      break;
    }
  }

  onChangeOTP = (text,index) => {
    let t = this.state.otp;
    t[index] = text;
    this.setState({otp: t})
    if(index+1 < this.otpRef.length)
      this.otpRef[index+1].focus()
  }

  render() {
    return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={()=>this.setState({visible: false})}
          style={{ paddingTop: config.statusBarHeight }}
      >
        {this.switchPopup()}
        
      </Modal>
    );
  }

  noInternet(){
    return(
      <View style={styles.modal}>
        <Image
          style={styles.image}
          source={require('src/assets/nointernet.png')}
          resizeMethod="resize"
          resizeMode="contain"
        />
        <Text style={styles.title}>Oops!</Text>    
        <Text style={styles.message}>Looks like internet connection broke up with you.</Text>
        <Text style={styles.solution}>Check your connection and try again.</Text>
        <TouchableOpacity
          style={styles.retry}
          onPress={()=>this.props.onPress()}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  underMaintenance(){
    return(
      <View style={styles.modal}>
        <Image
          style={styles.image}
          source={require('src/assets/undermaintenance.png')}
          resizeMethod="resize"
          resizeMode="contain"
        />
        <Text style={styles.title}>Sorry!</Text>

        <Text style={styles.message}>Hold your emotions, App is under Maintenance.</Text>
        <Text style={styles.solution}>Come Back After Sometime</Text>
      </View>
    );
  }

  verifyOtp(){
    const items = this.state.otp.map((item,index) => {
      let focus = (index)? false : true
        return <TextInput
          style={styles.otpBox}
          autoFocus={focus}
          clearTextOnFocus={true}
          keyboardType="numeric"
          maxLength={1}
          ref={ref => this.otpRef[index] = ref} 
          onChangeText={(text)=>this.onChangeOTP(text, index)}
          value={this.state.otp[index]}
          />
    });

    return(
      <View style={styles.modal}>
        <Text style={styles.title}>Enter OTP</Text>
        <View style={styles.otpWrapper}>
          {items}
        </View>   
        
        <TouchableOpacity
          style={styles.retry}
          onPress={()=>this.props.onPress(this.state.otp.join(''))}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  createStyle(){
    styles = StyleSheet.create({
      modal:{
        width: '100%',
        height: config.relativeHeight * 300,
        backgroundColor: theme.lightblue,
        position: 'absolute',
        bottom: 0,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 24,
      },
      image:{
        width: config.relativeHeight * 100,
        height: config.relativeHeight * 112,
      },
      title:{
        fontSize: config.relativeWidth * 30,
        color: theme.deepred,
      },
      message:{
        fontSize: config.relativeWidth * 15,
        color: theme.green,
      },
      solution:{
        fontSize: config.relativeWidth * 12,
        color: theme.red,
      },
      retry:{
        backgroundColor: theme.green,
        borderRadius: config.relativeWidth * 10,
        padding: config.relativeHeight * 10,
        margin: config.relativeHeight * 10,
        width: config.relativeWidth * 100,
      },
      buttonText:{
        color: theme.white,
        textAlign: 'center',
        fontSize: config.relativeWidth * 20
      },
      otpBox:{
        width: 50*config.relativeWidth, borderColor: theme.green, borderBottomWidth: 1, color: theme.green,
        textAlign: 'center', fontWeight: '900', fontSize: 20*config.relativeWidth
      },
      otpWrapper:{width: '100%', flexDirection: 'row', justifyContent: 'space-around',
      marginTop: 10*config.relativeHeight, marginBottom: 10*config.relativeHeight },
    });
  }

}

export { Popups }