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
import { Global, Config, Theme, Style } from "src/util"


const ChatBox = ({item})=>{

  return(
    <View style={styles.chatBox}>
      <Image
      resizeMode="cover"
      source={{uri: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg'}}
      />
      <Text style={{color: '#7D889C'}}>{item.id}</Text>
    </View>
  );
}


export { ChatBox }


const styles = StyleSheet.create({
  chatBox:{
    backgroundColor: '#F6F9F6', marginBottom: 5, padding: 10, minWidth: 200, marginLeft: 50,
    alignSelf: 'flex-start', borderRadius: 15, borderColor: '#FEDCC5', borderWidth: 1
  }
});