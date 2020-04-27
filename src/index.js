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
import { Config, Theme, Style, ChangeTheme } from "src/util";
import { Popups } from "src/components";

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
      ChangeTheme('dark')
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

    }

    switchPopup(){
      if(this.state.connectionInfo == 0)
        return(<Popups type="noInternet" onPress={this.retry.bind(this)} config={Config} theme={Theme} />);
      else if(this.state.underMaintenance == 1 )
        return(<Popups type="underMaintenance" config={Config} theme={Theme} />);
    }

    render(){
    	return(
    		<View style={Style.flex1}>
          {this.switchPopup()}
	    		<Router config={Config} theme={Theme} />
		    </View>
    	);
    }
}