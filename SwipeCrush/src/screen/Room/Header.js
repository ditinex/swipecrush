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


const Header = ({self})=>{
      let icons = Global.icons
      return(
        <LinearGradient
        start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
        locations={[0,0.9]}
        colors={Theme.splashScreen}
        style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <Icon name={icons.headphones} size={40} color={Theme.white} style={{marginLeft: 5, marginTop: 5, opacity: 0.3}} />
            <View style={styles.titleContainer}>
              <Text style={{color: Theme.white, fontSize: 16,}}> Music Lovers </Text>
              <Text style={{color: Theme.white, fontSize: 12,}}> ID : 3ac68afcc60548d3 </Text>
            </View>
            <TouchableOpacity style={styles.follow}>
              <Icon name="thumbs-o-up" size={20} color={Theme.lightblue} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.follow}>
              <Icon name="share" size={20} color={Theme.lightblue} />
            </TouchableOpacity>
          </View>
          <HostBar self={self} />
        </LinearGradient>
      );
}

const HostBar = ({self})=>{
      return(
        <View style={styles.hostBar}>
          <View style={styles.hostWrapper}>
            <LinearGradient
            start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
            locations={[0,0.9]}
            colors={Theme.dpborder}
            style={styles.dpWrapper}>
              <Image
              style={styles.dp}
              resizeMode="cover"
              source={{uri: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg'}}
              />
              <Text style={styles.hostLabel}>Host</Text>
            </LinearGradient>
            <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
              <Text style={{ color: Theme.white, opacity: 0.6, fontSize: 14 }}> Ayantika </Text>
            </View>
          </View>
          <View style={styles.hostSettings}>
            <OnlineUser index={0} />
            <OnlineUser index={1} />
            <OnlineUser index={2} />
            <OnlineNumber index={3} count={21} />
          </View>
        </View>
      );
}

const OnlineUser = ({index,user})=>{
      return(
        <LinearGradient
        start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
        locations={[0,0.9]}
        colors={Theme.splashScreen}
        style={[styles.dpWrapper, { position: 'relative', left: index*(-10) } ]}>
          <Image
          style={styles.dp}
          resizeMode="cover"
          source={{uri: 'https://mdbootstrap.com/img/Photos/Avatars/img%20%2819%29.jpg'}}
          />
        </LinearGradient>
        );
}

const OnlineNumber = ({index,count})=>{
      return(
        <LinearGradient
        start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
        locations={[0,0.9]}
        colors={Theme.splashScreen}
        style={[styles.dpWrapper, { position: 'relative', left: index*(-10) } ]}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: Theme.white, fontWeight: 'bold', fontSize: 18, opacity: 0.5 }}>{count}</Text>
        </View>
        </LinearGradient>
        );
}

export { Header }


const styles = StyleSheet.create({
  header:{ paddingTop: Config.statusBarHeight, },
  titleContainer:{
    marginLeft: 5, marginTop: 5, opacity: 0.4,
    flex: 1
  },
  follow:{ backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 10,
    paddingVertical: 5, borderRadius: 100, alignItems: 'center', justifyContent: 'center', color: Theme.lightblue,
    fontSize: 14, marginTop: 5, marginRight: 10, opacity: 0.5
  },
  hostBar:{ backgroundColor: 'rgba(0,0,0,0.1)', flexDirection: 'row', marginTop: 5 },
  hostWrapper:{ backgroundColor: 'rgba(0,0,0,0.15)', borderTopRightRadius: 100,
    borderBottomRightRadius: 100, padding: 5, alignItems: 'center', justifyContent: 'center',
    flexDirection: 'row' },
  hostLabel:{ backgroundColor: Theme.violet, color: Theme.white, width: 50, textAlign: 'center',
    borderRadius: 5, fontSize: 12, position: 'relative', top: -15, left: -2},
  dpWrapper:{ width: 50, height: 50, padding: 2, borderRadius: 80 },
  dp:{ width: '100%', height: '100%', borderRadius: 80 },
  hostSettings:{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  onlineUser:{ position: 'absolute', left: -20 }
});