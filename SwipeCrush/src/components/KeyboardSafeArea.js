import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Animated,
  StyleSheet,
  TextInput,
  Keyboard,
  UIManager,
  findNodeHandle
} from 'react-native';

class KeyboardSafeArea extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        shift: new Animated.Value(0),
      }
      this.TextInputState = TextInput.State
    }

    componentDidMount = () => {
      this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
      this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }
    componentWillUnmount = () => {
      this.keyboardDidShowSub.remove();
      this.keyboardDidHideSub.remove();
    }

    handleKeyboardDidShow = (event) => {
      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedField = this.TextInputState.currentlyFocusedField();

      /*
      * If currently focus text field belongs to this app / screen not any top notification textbox of messenger or whatsapp
      * If currently focused text field is child of this component not any other modal
      */

      if(currentlyFocusedField){
        UIManager.viewIsDescendantOf(currentlyFocusedField, findNodeHandle(this.parentRef), (isDescendantOf) => {
          if(isDescendantOf){
            UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
              const fieldHeight = height;
              const fieldTop = pageY;
              const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
              if (gap >= 0) {
                return;
              }
              Animated.timing(
                this.state.shift,
                {
                  toValue: gap,
                  duration: 500,
                  useNativeDriver: false,
                }
                ).start();
            });
          }
        });
      }
      
    }

    handleKeyboardDidHide = () => {
        Animated.timing(
          this.state.shift,
          {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }
        ).start();
    }

    render() {
      return (
        <Animated.View
        style={[(this.props.style) ? this.props.style : styles.wrapper , { marginTop: this.state.shift } ]}
        ref={ref => this.parentRef = ref}
        >
          {this.props.children}
        </Animated.View>
      );
    }
}

var styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  }
});

KeyboardSafeArea.protoTypes = {
  style: PropTypes.object.required
}

export { KeyboardSafeArea }