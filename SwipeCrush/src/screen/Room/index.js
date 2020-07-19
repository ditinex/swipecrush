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
import {BoxShadow} from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Loader, KeyboardSafeArea } from "src/components";
import { Global, Config, Theme, Style } from "src/util";

import { Header } from "./Header";
import { RoomTextInput } from "./RoomTextInput";
import { ChatBox } from "./ChatBox";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Anna Smith',
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2820%29.jpg',
    message: 'Chat room is a virtual room where a chat session takes place. Technically, a chat room is really a .',
    age: 20,
    gender: 'female'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Jonathan Doe',
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%289%29.jpg',
    message: 'Technically, a chat room is really a .',
    age: 23,
    gender: 'male'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Maria Portman',
    image: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2819%29.jpg',
    message: 'chat session takes place. Technically, a chat room is really a .',
    age: 22,
    gender: 'female'
  }
];

class Room extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    componentDidMount = () => {
    }
    componentWillUnmount = () => {}

    onFlatlistScroll = (event)=>{}
    
/*
 * Layout desgin starts
 */


    render() {
      return (
        <View style={styles.container}>
          <Header self={this} />
          <FlatList
          inverted={true}
          data={DATA}
          renderItem={({ item }) => <ChatBox item={item} /> }
          keyExtractor={item => item.id}
          numColumns={1}
          contentContainerStyle={{ justifyContent: 'center'  }}
          onScroll={(e)=>this.onFlatlistScroll(e.nativeEvent)}
          />
          <RoomTextInput />
        </View>
      );
    }
  
}


export { Room }


/* Functional Components */



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightblue,
    position: 'relative',
    overflow: 'hidden',
  },
});