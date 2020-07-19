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

/* Set global dimensions */
      Config.deviceHeight = Dimensions.get('window').height
      Config.deviceWidth = Dimensions.get('window').width
      Config.relativeHeight = Config.deviceHeight/Config.standardHeight
      Config.relativeWidth = Config.deviceWidth/Config.standardWidth
      Config.statusBarHeight = StatusBar.currentHeight
/*------------------------*/

class ErrorPopup extends React.Component {
	constructor(props) {
    super(props);
  }

  componentDidMount = () => {}
  componentWillUnmount = () => {}

  render() {
    return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={()=>this.setState({visible: false})}
          style={{ marginTop: Config.statusBarHeight }}
      >
        { (this.props.type=='noInternet') ? <NoInternet props={this.props} /> : <UnderMaintenance /> }
        
      </Modal>
    );
  }

}

export { ErrorPopup }

/*
 * Functional Components
*/

const UnderMaintenance = ()=>{
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

const NoInternet = ({props})=>{
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
          onPress={()=>props.onPress()}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
}

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