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
  ToastAndroid,
  Picker,
  Modal,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BoxShadow} from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-date-picker'


import { Loader, KeyboardSafeArea } from "src/components"
import { Config, Theme, Style, Countries } from "src/util"
import { Popups } from "src/components"


class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fullname: '',
        mobile: '',
        password: '',
        gender: 'Male',
        form: 3,
        toVerifyOtp: false,
        country: '+91',
        dob: new Date(),
        viewDobPicker: false,
        about: '',
        city: '',
        formContainerHeight: 0,
      }
    }

    componentDidMount = () => {
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButton
      );
    }
    
    componentWillUnmount = () => {
      this.backHandler.remove();
    }

    handleBackButton = () => {
      let currentForm = this.state.form
      if(this.state.form!=1){
        this.setState({form: currentForm-1})
        return true;
      }
      return false;
    };


    signup = () => {
      if(this.state.form == 1 && this.state.fullname != '' && this.state.mobile.length == 10 && this.state.password != ''){
        this.setState({toVerifyOtp: true})
      }
      else if(this.state.form == 2 && this.state.city != ''){
        if(this.state.dob == '')
          this.setState({dob: new Date(2000, 1, 1)})
        this.setState({form: 3})
      }
      else if(this.state.form == 3 && this.state.about != ''){
        //CALL API TO SIGNUP AND REDIRECT TO CHANGE PROFILE PICTURE PAGE
        //SET LOGIN SESSION
        //SAVE USER DATE
      }
      else
        ToastAndroid.show("No fields can be blank!", ToastAndroid.SHORT);
    }

    verifyOtp = (otp) => {
      //console.log(otp)
      //First verify then change state
      this.setState({toVerifyOtp: false, form: 2})
    }

    humanreadableDob = ()=>{
      let date = (this.state.dob) ? new Date(this.state.dob) : new Date()
      let dob = ('0'+(date.getDate())).slice(-2) +'/'+ ('0'+(date.getMonth()+1)).slice(-2) +'/'+ date.getFullYear()
      return dob
    }

    displayForm = ()=>{
      switch(this.state.form){
        case 2:
          return this.step2();
        case 3:
          return this.step3();
        break;
        default:
          return this.step1();
      }
    }

    centralizeButton = (event) => {
      let {x, y, width, height} = event.nativeEvent.layout;
      if(this.state.formContainerHeight!=height)
        this.setState({formContainerHeight: height})
    }


    render() {
      return this.displayForm();
    }

    step3(){
      let top = (this.state.formContainerHeight/2) - 27
      return(
        <View style={styles.container}>
            <KeyboardSafeArea style={styles.wrapper}>
              <Text style={styles.title}>Register</Text>
              <View style={styles.formContainer} onLayout={(event)=>this.centralizeButton(event)}>

                  <View style={[styles.buttonGroup, {justifyContent: 'flex-start' }]}>
                    <TextInput
                    style={[styles.input,{height: 170, textAlignVertical: 'top'}]}
                    onChangeText={text => this.setState({about: text})}
                    value={this.state.about} 
                    placeholder="About Me"
                    multiline={true}
                    />
                  </View>

                  <TouchableOpacity onPressIn={()=>this.signup()} style={[styles.touchableButton, {top: top}]}>
                      <LinearGradient
                      start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                      locations={[0,0.9]}
                      colors={Theme.circularButton}
                      style={styles.touchableWrapper} >
                      <Icon name="check" size={32} color={Theme.white} />
                      </LinearGradient>
                    </TouchableOpacity>

                </View>
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
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.viewDobPicker}
          onRequestClose={()=>this.setState({viewDobPicker: false})}
          style={{ paddingTop: Config.statusBarHeight, alignItems: 'center', justifyContent: 'center', flex: 1}}
          >
            <View style={styles.modal}>
              <DatePicker
              date={(this.state.dob)? this.state.dob :new Date()}
              mode='date'
              maximumDate={new Date()}
              onDateChange={(date)=>this.setState({dob: date})}
              textColor={Theme.lightred}
              />
              <TouchableOpacity
              onPress={()=>this.setState({viewDobPicker: false})}
              style={{marginTop: 50, width: 100, backgroundColor: Theme.lightred, padding: 10, borderRadius: 20 }}
              >
                <Text style={{color: Theme.white, fontSize: 20, textAlign: 'center'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }

    step2(){
      var radio_props = [
        {label: 'Male', value: 'Male' },
        {label: 'Female', value: 'Female' }
      ];
      let top = (this.state.formContainerHeight/2) - 27
      return(
        <View style={styles.container}>
            <KeyboardSafeArea style={styles.wrapper}>
              <Text style={styles.title}>Register</Text>
              <View style={styles.formContainer} onLayout={(event)=>this.centralizeButton(event)}>
                  <View style={styles.buttonGroup}>
                    <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={Theme.grey}
                    labelStyle={{color: '#A1A4A5', marginRight: 20}}
                    selectedlabelColor={Theme.grey}
                    selectedButtonColor={Theme.grey}
                    style={{marginLeft: 10}}
                    animation={true}
                    onPress={(value) => {this.setState({gender:value})}}
                    />
                  </View>

                    <LinearGradient
                    start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                    locations={[0,0.9999]}
                    colors={Theme.hr}
                    style={styles.hr} />

                  <TouchableOpacity onPress={()=>this.setState({viewDobPicker: true})}>
                  <View style={styles.buttonGroup}>
                    <Icon name="calendar" size={32} color={Theme.grey} style={styles.icon} />
                    <Text style={{flex: 1, fontSize: 16, color: '#A1A4A5', marginTop: 5}}>
                      DOB : {this.humanreadableDob()}
                    </Text>
                  </View>
                  </TouchableOpacity>

                    <LinearGradient
                    start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                    locations={[0,0.9999]}
                    colors={Theme.hr}
                    style={styles.hr} />

                  <View style={styles.buttonGroup}>
                    <Icon name="address-card" size={32} color={Theme.grey} style={styles.icon} />
                    <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({city: text})}
                    value={this.state.city} 
                    placeholder="City"
                    />
                  </View>

                  <TouchableOpacity onPressIn={()=>this.signup()} style={[styles.touchableButton, {top: top}]}>
                      <LinearGradient
                      start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                      locations={[0,0.9]}
                      colors={Theme.circularButton}
                      style={styles.touchableWrapper} >
                      <Icon name="chevron-right" size={32} color={Theme.white} />
                      </LinearGradient>
                    </TouchableOpacity>

                </View>
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
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.viewDobPicker}
          onRequestClose={()=>this.setState({viewDobPicker: false})}
          style={{ paddingTop: Config.statusBarHeight, alignItems: 'center', justifyContent: 'center', flex: 1}}
          >
            <View style={styles.modal}>
              <DatePicker
              date={(this.state.dob)? this.state.dob :new Date()}
              mode='date'
              maximumDate={new Date()}
              onDateChange={(date)=>this.setState({dob: date})}
              textColor={Theme.lightred}
              />
              <TouchableOpacity
              onPress={()=>this.setState({viewDobPicker: false})}
              style={{marginTop: 50, width: 100, backgroundColor: Theme.lightred, padding: 10, borderRadius: 20 }}
              >
                <Text style={{color: Theme.white, fontSize: 20, textAlign: 'center'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }

    step1(){
      let top = (this.state.formContainerHeight/2) - 27
      let otpForm = (this.state.toVerifyOtp) ? <Popups type="verifyOtp" onPress={this.verifyOtp.bind(this)} /> : null
      return(
        <View style={styles.container}>
            
              <TouchableOpacity onPress={()=>this.props.navigation.replace('Login')} style={styles.button}>
                <Image
                source={require('src/assets/button.png')}
                resizeMethod="resize"
                resizeMode="contain"
                />
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
    
            <KeyboardSafeArea style={styles.wrapper}>
              <Text style={styles.title}>Register</Text>
              <View style={styles.formContainer} onLayout={(event)=>this.centralizeButton(event)}>
                  <View style={styles.buttonGroup}>
                    <Icon name="user" size={32} color={Theme.grey} style={styles.icon} />
                    <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({fullname: text})}
                    value={this.state.fullname}
                    placeholder="Full Name"
                    onSubmitEditing={() => this.mobileRef.focus()}
                    blurOnSubmit={true}
                    />
                  </View>

                    <LinearGradient
                    start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                    locations={[0,0.9999]}
                    colors={Theme.hr}
                    style={styles.hr} />

                  <View style={styles.buttonGroup}>
                    <Icon name="mobile" size={32} color={Theme.grey} style={styles.icon} />
                    <Picker
                    selectedValue='+91'
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}
                    >
                    {Countries.map((v, i) => (
                      <Picker.Item key={i} label={v.flag+' '+v.name+' ('+v.dial_code+')'} value={v.dial_code} />
                    ))}
                    </Picker>
                    <TextInput
                    style={styles.input}
                    onChangeText={text => this.setState({mobile: text})}
                    value={this.state.mobile}
                    placeholder="Mobile"
                    keyboardType="numeric"
                    ref={ref => this.mobileRef = ref}
                    maxLength={10}
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
                      <Icon name="chevron-right" size={32} color={Theme.white} />
                      </LinearGradient>
                    </TouchableOpacity>

                </View>
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
          {otpForm}
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
    left: 55,
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
    marginTop: 20,
    marginBottom: 10,
  },
  icon:{
    paddingLeft: 10*Config.relativeWidth,
    paddingRight: 10*Config.relativeWidth,
  },
  input:{ height: 40, flex: 1, fontSize: 16, color: '#A1A4A5' },
  picker:{ height: 40, width: 95, fontSize: 16,
    color: '#A1A4A5', padding: 0, },
  hr:{
    height: 1.5,
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
  touchableButton:{
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    borderRadius:50,
    position: 'absolute',
    right: -15,
    //top: 80,
    elevation: 15,
  },
  touchableWrapper:{
    flex:1,
    width:50,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
  },
  modal:{
    width: Config.deviceWidth,
    alignItems: 'center',  
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  viewDobPicker:{flex: 1, height: 40*Config.relativeHeight,},


});

export { Signup }