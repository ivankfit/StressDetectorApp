import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable'
import RadioGroup from 'react-native-radio-button-group';

import BluetoothSerial from 'react-native-bluetooth-serial'
import { Buffer } from 'buffer'


var radiogroup_options = [
  { id: 0, label: 'Yes' },
  { id: 1, label: 'last 2 years' },
  { id: 2, label: 'Never' },
];



export default class Data extends Component<Props> {
  handleViewRef = ref => this.view = ref;
  handleViewRef2 = ref => this.view = ref2;


  constructor(props) {
    super(props)

    this.state = {
      questions: "",
      qn1: "",
      qn2: "",
      anime: "",
      selectedOption: null,
      next : "",
      done:"",
      BLUETOOTH:"",
      device:this.props.navigation.state.params

    }
  }

  signUp = () => {

    console.log("clicked");
    this.setState({ anime: "clicked" });

  }
  cancelUp = () => {

    console.log("clicked");
    this.setState({ anime: "",next:"", selectedOption:null });

  }
  NextUp = () => {
    this.setState({ next: "true",done:"yes" });
    if(this.state.done !== ""){
      this.props.navigation.navigate('Second');
    }

  }

  componentDidMount() {
    //// this.view.zoomIn(3000).then(endState => console.log(endState.finished ? 'done' : 'no'));

    BluetoothSerial.withDelimiter('\r').then(() => {
        Promise.all([
          BluetoothSerial.isEnabled(),
          BluetoothSerial.list(),
        ]).then(values => {
          const [isEnabled, devices] = values;
         
        });
        BluetoothSerial.on('read', data => {
          this.setState({BLUETOOTH:data});
       });
  });

  }

  // bounce = () => this.view.zoomIn(3000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

  render() {
    console.log(this.state.selectedOption)

    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <View style={styles.container2}>

          <TouchableOpacity >
            <Animatable.View >
              <Text style={{ color: 'white', fontSize: 24 }}>{this.state.device}</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', height: 20, marginBottom: 70, justifyContent: 'center', alignItems: 'center' }}>
          < View style={{ width: '80%', height: 60, marginBottom: 30, borderRadius: 50, backgroundColor: '#d9534f', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.signUp}>
              <Text style={{ color: 'white', fontSize: 24 }}>{this.state.BLUETOOTH}</Text>
            </TouchableOpacity>
          </View>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000042',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    height: 200,
    width: 200,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  img1: {


  }
});
