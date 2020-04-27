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
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BoxShadow} from 'react-native-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Loader, KeyboardSafeArea } from "src/components"
import { Config, Theme, Style } from "src/util"

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Coffee House',
    icon: 'music',
    gradient: 'expresso',
    description: 'Chat room is a virtual room where a chat session takes place. Technically, a chat room is really a channel, but the term room is used to promote the chat metaphor. In a chat room, people communicate using on-screen text, typed in real-time.'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Bong Crush',
    icon: 'heart',
    gradient: 'flare'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    icon: 'globe',
    gradient: 'ultraviolet'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
    icon: 'beer',
    gradient: 'violet'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
    icon: 'glass',
    gradient: 'quepal'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item dfkhkjsdf hsdfd hdfds',
    icon: 'headphones',
    gradient: 'witching'
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
        activeTab: 0
      }
      this.tabs = ['Public', 'Hot', 'New']
    }

    componentDidMount = () => {
    }
    componentWillUnmount = () => {}

    render() {
      var self = this
      const tabs = this.tabs.map(function(item,index){
        return (index==self.state.activeTab) ? self.tab(item,index,true) : self.tab(item,index)
      })

      return (
        <View style={styles.container}>
          {this.header()}
          <View style={styles.tabContainer}>
            {tabs}
          </View>
          <View style={styles.listContainer}>
            {this.roomList()}
          </View>
        </View>
      );
    }

    roomList(){
      return(
        <FlatList
        data={DATA}
        renderItem={({ item }) => this.item(item) }
        keyExtractor={item => item.id}
        numColumns={1}
        contentContainerStyle={{ justifyContent: 'center'  }}
        />
      );
    }

    item(item) {
      let gradients = {
        quepal: ['#4CB8C4', '#3CD3AD'],
        ultraviolet: ['#800080', '#ffc0cb'],
        flare: ['#6A9113', '#141517'],
        violet: ['#B24592', '#F15F79'],
        expresso: ['#00bf8f', '#001510'],
        witching: ['#c31432', '#240b36'],
        purelust: ['#333333', '#dd1818']
      }
      let icons = {
        glass: 'glass',
        music: 'music',
        heart: 'heart',
        start: 'star',
        film: 'film',
        headphones: 'headphones',
        book: 'book',
        camera: 'camera',
        photo: 'photo',
        gift: 'gift',
        globe: 'globe',
        beer: 'beer',
        heartbeat: 'heartbeat'
      }

      return (
        <View style={styles.itemContainer}>
          <LinearGradient
            start={{x: 0.0, y: 0.9}} end={{x: 1.0, y: 0.25}}
            locations={[0.1,0.9]}
            colors={gradients[item.gradient]}
            style={styles.itemIcon}>
              <Icon name={icons[item.icon]} size={60} color={Theme.lightblue} style={{marginLeft: 70, marginTop: 10, opacity: 0.2}} />
              <View style={styles.itemTitleBorder}>
              </View>
              <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
          </LinearGradient>
          <View style={Style.flex1}>
            <Text numberOfLines={3} style={styles.itemDescription}>{item.description}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>32 online</Text>
              <Text>500 following</Text>
            </View>
          </View>
        </View>
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

    header(){
      return(
        <View>
          <LinearGradient
            start={{x: 0.0, y: 1.0}} end={{x: 1, y: 0.0}}
            locations={[0,0.9]}
            colors={Theme.dpborder}
            style={styles.header}>
              <Text style={styles.title}>Chat Rooms</Text>
              <Text style={styles.subtitle}>Explore or search public rooms. Chat & discover your crush and unlock rewards.
              </Text>
          </LinearGradient>
          <View style={styles.searchWrapper}>
            <TextInput
            style={styles.input}
            onChangeText={text => this.setState({query: text})}
            value={this.state.query}
            placeholder="Room Name or ID"
            blurOnSubmit={true}
            />
            <TouchableOpacity>
              <Icon name='search' size={32} color={Theme.grey} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
    backgroundColor: Theme.white, borderRadius: 100, height: 50, elevation: 20,
    position: 'relative',
    top: -25, paddingHorizontal: 10,
    alignItems: 'center'
  },
  input:{ height: 40, flex: 1, fontSize: 16, color: '#A1A4A5' },
  tabContainer:{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  tabs:{ width: 80, padding: 3, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 20 },
  tabsActive:{backgroundColor: 'rgba(255,255,255,0.8)'},
  tabTitle:{ color: Theme.deepgrey , textAlign: 'center', fontWeight: 'bold', fontSize: 16, letterSpacing: 1.5 },
  tabTitleActive:{color: Theme.violet},
  listContainer:{ flex: 1 },
  itemContainer:{
    flex: 1, elevation: 2, backgroundColor: Theme.white, margin: 5,
    borderRadius: 15, alignItems: 'flex-start', flexDirection: 'row', 
  },
  itemIcon:{ 
    width: 130, height: 100, borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15, alignItems: 'flex-start',
  },
  itemTitle:{
    color: Theme.lightblue, backgroundColor: 'rgba(0,0,0,0.1)', padding: 5,
    position: 'relative', left: 0, top: -28, width: '100%', fontSize: 14
  },
  itemTitleBorder: {
    position: 'relative', left: 0, top: -28.5, borderTopWidth: 2,
    borderColor: 'rgba(0,0,0,0.2)', width: 40
  },
  itemDescription:{
    fontSize: 14, padding: 10, color: Theme.deepgrey, flex: 1
  }
});


export { Chatrooms }