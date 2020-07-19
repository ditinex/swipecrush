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

class OtpPopup extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      visible: true,
      otp: Array(6).fill('')
    }
    this.otpRef = Array(6).fill('')
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
        {this.verifyOtp()}
        
      </Modal>
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

}

export { OtpPopup }

const styles = StyleSheet.create({
  modal:{
    width: '100%',
    height: 300,
    backgroundColor: Theme.lightblue,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 24,
  },
  image:{
    width: 100,
    height: 112,
  },
  title:{
    fontSize: 30,
    color: Theme.deepred,
  },
  message:{
    fontSize: 15,
    color: Theme.green,
  },
  solution:{
    fontSize: 12,
    color: Theme.red,
  },
  retry:{
    backgroundColor: Theme.green,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 100,
  },
  buttonText:{
    color: Theme.white,
    textAlign: 'center',
    fontSize: 20
  },
  otpBox:{
    width: 50, borderColor: Theme.green, borderBottomWidth: 1, color: Theme.green,
    textAlign: 'center', fontWeight: '900', fontSize: 20
  },
  otpWrapper:{width: '100%', flexDirection: 'row', justifyContent: 'space-around',
  marginTop: 10, marginBottom: 10 },
});