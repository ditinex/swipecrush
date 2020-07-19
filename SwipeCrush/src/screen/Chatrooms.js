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

import { Loader, KeyboardSafeArea } from "src/components"
import { Global, Config, Theme, Style } from "src/util"

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Coffee House',
    icon: 'music',
    gradient: 'expresso',
    description: 'Chat room is a virtual room where a chat session takes place. Technically, a chat room is really a .',
    online: 20,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Bong Crush',
    icon: 'heart',
    gradient: 'flare',
    description: 'Chat room is a virtual room where a chat.',
    online: 10,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    icon: 'globe',
    gradient: 'ultraviolet',
    description: 'Chat room is a .',
    online: 150,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
    icon: 'beer',
    gradient: 'violet',
    description: 'Chat room is a virtual room where a chat session takes place. Technically, a chat room is really a channel, but the term room is used to promote the chat metaphor. In a chat room, people communicate using on-screen text, typed in real-time.',
    online: 150,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
    icon: 'glass',
    gradient: 'quepal',
    online: 150,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item dfkhkjsdf hsdfd hdfds',
    icon: 'headphones',
    gradient: 'witching',
    online: 150,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Third Item',
    icon: 'music',
    gradient: 'purelust',
    online: 150,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
    icon: 'glass',
    gradient: 'quepal',
    online: 150,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item dfkhkjsdf hsdfd hdfds',
    icon: 'headphones',
    gradient: 'witching',
    online: 150,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Third Item',
    icon: 'music',
    gradient: 'purelust'
  },
];


class Chatrooms extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        activeTab: 0,
        headerIsFull: -1
      }
      this.tabs = ['Public', 'Hot', 'New']
      this.animatedValue = new Animated.Value(0)
    }

    componentDidMount = () => {
    }
    componentWillUnmount = () => {}

    onFlatlistScroll = (event) => {
      /*
      * Animation of the header gradient including search bar on scroll
      * Initialize headerIsFull to -1 to load default height before animation
      */
      if(event.contentOffset.y >= 110 && this.state.headerIsFull != 0){
        this.setState({headerIsFull: 0})
        Animated.timing(this.animatedValue, {
          toValue: Config.statusBarHeight,
          duration: 300,
          useNativeDriver: false, 
        }).start();
      }
      else if(event.contentOffset.y < 110 && this.state.headerIsFull != 1){
        this.setState({headerIsFull: 1})
        Animated.timing(this.animatedValue, {
          toValue: this.initialHeaderHeight,
          duration: 300,
          useNativeDriver: false, 
        }).start();
      }

    }

    onLayout = (e) => {
      if(this.state.headerIsFull == -1){
        this.initialHeaderHeight = e.nativeEvent.layout.height
        this.animatedValue.setValue(this.initialHeaderHeight)
      }
    }

/*
 * Layout desgin starts
 */


    render() {
      var self = this
      const tabs = this.tabs.map(function(item,index){
        return (index==self.state.activeTab) ? self.tab(item,index,true) : self.tab(item,index)
      })

      return (
        <View style={styles.container}>
          <Header self={this} />
          <View style={styles.tabContainer}>
            {tabs}
          </View>
          <View style={styles.listContainer}>
            {this.roomList()}
          </View>
          <TouchableOpacity style={styles.newRoomTouchable}>
            <LinearGradient
            start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
            locations={[0,0.9]}
            colors={Theme.splashScreen}
            style={styles.newRoom}
            >
              <Icon name="plus" size={30} color={Theme.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    }

    roomList(){
      return(
        <FlatList
        data={DATA}
        renderItem={({ item }) => <ListItem navigation={this.props.navigation} item={item} /> }
        keyExtractor={item => item.id}
        numColumns={1}
        contentContainerStyle={{ justifyContent: 'center'  }}
        onScroll={(e)=>this.onFlatlistScroll(e.nativeEvent)}
        />
      );
    }

    tab(label, index, active = false){
      return(
          <TouchableOpacity onPress={()=>this.setState({activeTab: index})}
                style={[styles.tabs, (active)? styles.tabsActive : null]}
              >
                <Text style={[styles.tabTitle, (active)? styles.tabTitleActive : null]}>{label}</Text>
              </TouchableOpacity>
      );
    }

    
}

export { Chatrooms }


/*
* Functional Components
*/

const ListItem = ({item,navigation})=>{
      let icons = Global.icons

      return (
        <TouchableOpacity onPress={()=>navigation.navigate('Room')} style={styles.itemContainer}>
          <View style={[styles.itemAvtar]}>
            <Icon name={icons[item.icon]} size={60} color={'rgba(252, 112, 0, 0.8)'} style={{opacity: 0.2}} />
            <Text style={styles.itemOnline}>{item.online}</Text>
          </View>
          <View style={Style.flex1}>
            <Text numberOfLines={1} style={styles.itemTitle}>{item.title}</Text>
            <Text numberOfLines={3} style={styles.itemDescription}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      );
    } 

const Header = ({self})=>{
      let animatedCss = (self.state.headerIsFull == -1) ? {overflow: 'hidden', height: 'auto'} : {overflow: 'hidden', height: self.animatedValue}
      
      return(
        <Animated.View
          onLayout={self.onLayout}
          style={[animatedCss, (self.state.headerIsFull == 0)? { marginBottom: 10 } : null ]}
        >
          <LinearGradient
            start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
            locations={[0,0.9]}
            colors={Theme.splashScreen}
            style={styles.header}>
              <Text style={styles.title}>Chat Rooms</Text>
              <Text style={styles.subtitle}>Explore or search public rooms. Chat & discover your crush and unlock rewards.
              </Text>
          </LinearGradient>
          <View style={styles.searchWrapper}>
            <TextInput
            style={styles.input}
            onChangeText={text => self.setState({query: text})}
            value={self.state.query}
            placeholder="Room Name or ID"
            blurOnSubmit={true}
            />
            <TouchableOpacity>
              <Icon name='search' size={32} color={Theme.grey} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: Theme.lightblue
  },
  header:{ paddingTop: Config.statusBarHeight, paddingBottom: 50, overflow: 'hidden' },
  title:{ color: Theme.white, letterSpacing: 3, fontSize: 20, paddingLeft: 15, paddingTop: 30, paddingBottom: 15 },
  subtitle:{ paddingLeft: 15, color: Theme.white, width: '90%'},
  searchWrapper:{ 
    flexDirection: 'row', marginHorizontal: 30*Config.relativeWidth,
    backgroundColor: Theme.white, borderRadius: 100, height: 50, elevation: 5,
    position: 'relative',
    top: -25, paddingHorizontal: 10,
    alignItems: 'center'
  },
  input:{ height: 40, flex: 1, fontSize: 16, color: '#A1A4A5' },
  tabContainer:{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  tabs:{ width: 80, padding: 3, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 20 },
  tabsActive:{backgroundColor: 'rgba(255,255,255,0.8)'},
  tabTitle:{ color: Theme.deepgrey , textAlign: 'center', fontWeight: 'bold', fontSize: 16, letterSpacing: 1.5 },
  tabTitleActive:{color: Theme.green},
  listContainer:{ flex: 1 },
  itemContainer:{
    flex: 1, elevation: 2, backgroundColor: Theme.white, margin: 5,
    borderRadius: 15, alignItems: 'flex-start', flexDirection: 'row', 
  },
  itemAvtar:{
    width: 100, height: 100, borderRadius: 15,
    margin: 2, alignItems: 'flex-start', borderWidth: 0,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FDE4DC', position: 'relative'
  },
  itemTitle:{ fontSize: 14, paddingLeft: 10, paddingTop: 5, color: '#8C8C8C', fontSize: 16, },
  itemDescription:{
    fontSize: 14, padding: 10, color: '#CBCFCF', flex: 1
  },
  itemOnline: {
    backgroundColor: Theme.lightred, color: Theme.white, borderRadius: 100,
    paddingHorizontal: 5, position: 'absolute', top: 10, left: 10
  },
  newRoomTouchable:{
    position: 'absolute',
    right: 10,
    top: Config.deviceHeight - 100,
    padding: 3,
    backgroundColor: Theme.white,
    elevation: 10,
    borderRadius: 100
  },
  newRoom: {
    borderRadius: 50,
    width: 50,
    height: 50,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
