import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import 'react-native-gesture-handler';
import Router from 'src/navigation';
import { Config, Theme, Style } from "src/util";
import { ErrorPopup } from "src/components";

/* Set global dimensions */
      Config.deviceHeight = Dimensions.get('window').height
      Config.deviceWidth = Dimensions.get('window').width
      Config.relativeHeight = Config.deviceHeight/Config.standardHeight
      Config.relativeWidth = Config.deviceWidth/Config.standardWidth
      Config.statusBarHeight = StatusBar.currentHeight
/*------------------------*/

export default class AppContainer extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
        connectionInfo: 1,
        underMaintenance: 0,
      }
  	}

    componentDidMount(){
      var self = this
      NetInfo.configure({
        reachabilityUrl: 'https://clients3.google.com/generate_204',
        reachabilityTest: async (response) => response.status === 204,
        reachabilityLongTimeout: 60 * 1000, 
        reachabilityShortTimeout: 5 * 1000, 
        reachabilityRequestTimeout: 15 * 1000, 
      });
      this.unsubscribe = NetInfo.addEventListener(state => {
        self.setState({connectionInfo: state.isConnected ? 1 : 0})
      });
    }

    componentWillUnmount(){
      this.unsubscribe()
    }

    retry(){
      var self = this
      NetInfo.fetch().then(state => {
        self.setState({connectionInfo: state.isConnected ? 1 : 0})
      });
    }

    CheckUnderMaintenance(){
      //Check if server under maintenance
    }

    render(){
    	return(
    		<View style={Style.flex1}>
          {(!this.state.connectionInfo)? <ErrorPopup type="noInternet" onPress={this.retry.bind(this)} /> : (this.state.underMaintenance)? <ErrorPopup type="underMaintenance" /> : null}
	    		<Router />
		    </View>
    	);
    }
}