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
  TouchableHighlight,
  FlatList,
  UIManager,
  findNodeHandle
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Global, Config, Theme, Style } from "src/util";


const DATA = ["Asif","Akram","Andrew","Robert","Falcon", "Andrew","Robert","Falcon"]

class RoomTextInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: ''
      }
    }

    componentDidMount = () => {
    }
    componentWillUnmount = () => {}

    keyboardPressed = (text)=>{
      //console.log(text)
      this.setState({text})
    }

    onImageChange = (event) => {
      //const {uri, linkUri, mime, data} = event.nativeEvent;
      console.log(event)
      // Do something with this data
    }

    render() {
      return (
        <View>
          <FlatList
            data={DATA}
            renderItem={({ item,index }) => <TouchableOpacity><Text style={styles.mention}>@{item}</Text></TouchableOpacity> }
            keyExtractor={(item,index) => index}
            numColumns={1}
            contentContainerStyle={{ justifyContent: 'flex-start'  }}
            onScroll={null}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
          />
          <View style={styles.container}>
            <TouchableOpacity>
            <LinearGradient
              start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
              locations={[0,0.9]}
              colors={Theme.splashScreen}
              style={styles.prefix}>
                <Icon name="camera" size={20} color={Theme.white} />
            </LinearGradient>
            </TouchableOpacity>
            <TextInput
            style={styles.input}
            onChangeText={text => this.keyboardPressed(text)}
            onChange={(e)=>this.onImageChange(e)}
            onImageChange={(e)=>this.onImageChange(e)}
            value={this.state.text}
            multiline={true}
            />
            { (this.state.text.length>0) && 
              <TouchableOpacity style={[styles.prefix,styles.suffix]}>
                <Icon name="angle-double-right" size={30} color={Theme.splashRed} />
              </TouchableOpacity>
            }
          </View>
        </View>
      );
    }
  
}


export { RoomTextInput }



/* Functional Components */



const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.white, overflow: 'hidden', margin: 5, borderRadius: 30, elevation: 1,
    flexDirection: 'row', padding: 5, alignItems: 'center'
  },
  prefix: { height: 40, width: 40, borderRadius: 50, alignItems: 'center',  justifyContent: 'center' },
  suffix: { marginRight: 5, transform: [{ rotate: "0deg" }] },
  input: { flex: 1, padding: 5, paddingLeft: 10, margin: 0, fontSize: 16, maxHeight: 80, color: '#7D889C'  },
  mention: { color: Theme.green, fontWeight: 'bold', padding: 5, marginLeft: 10 }
});