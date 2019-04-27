import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable'
import RadioGroup from 'react-native-radio-button-group';


var radiogroup_options = [
  { id: 0, label: 'Yes' },
  { id: 1, label: 'last 2 years' },
  { id: 2, label: 'Never' },
];



export default class Home extends Component<Props> {
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
      done:""

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
  }

  // bounce = () => this.view.zoomIn(3000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

  render() {
    console.log(this.state.selectedOption)

    if (this.state.next == "true") {
      return (
        <View style={styles.container}>
          <StatusBar hidden />

          <View style={styles.container2}>

            <TouchableOpacity >
              <View >
                <Text style={{ color: 'white', fontSize: 24 }}>Stress Detector!</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>When did you last take alcohol?</Text>

          <View style={{ marginBottom: 50 }}>
            <RadioGroup style={{ color: 'white' }}
              options={radiogroup_options}
              circleStyle={{
                width: 20,
                height: 20,
                fillColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
              }}
              onChange={(option) => this.setState({ selectedOption: option })}
            />
          </View>

          < View style={{ width: '80%', flexDirection: "row", height: 60, marginBottom: 30, borderRadius: 50,  justifyContent: 'center', alignItems: 'center' }}>
            < View style={{ width: '40%', height: 40,  borderRadius: 50, backgroundColor: '#d9534f', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.cancelUp}>
                <Text style={{ color: 'white', fontSize: 16 }}>cancel</Text>
              </TouchableOpacity>

            </View>

            < View style={{ width: '40%', height: 40, marginLeft:40,  borderRadius: 50, backgroundColor: 'lightgreen', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.NextUp}>
                <Text style={{ color: 'white', fontSize: 16 }}>proceed</Text>
              </TouchableOpacity>

            </View>
          </View>



        </View>

      );
    }


    if (this.state.anime == "clicked") {
      return (
        <View style={styles.container}>
          <StatusBar hidden />

          <View style={styles.container2}>

            <TouchableOpacity >
              <View >
                <Text style={{ color: 'white', fontSize: 24 }}>Stress Detector!</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>When did you last exercise??</Text>

          <View style={{ marginBottom: 50 }}>
            <RadioGroup style={{ color: 'white' }}
              options={radiogroup_options}
              circleStyle={{
                width: 20,
                height: 20,
                fillColor: 'white',
                borderColor: 'white',
                borderWidth: 1,
              }}
              onChange={(option) => this.setState({ selectedOption: option })}
            />
          </View>

          < View style={{ width: '80%', flexDirection: "row", height: 60, marginBottom: 30, borderRadius: 50,  justifyContent: 'center', alignItems: 'center' }}>
            < View style={{ width: '40%', height: 40,  borderRadius: 50, backgroundColor: '#d9534f', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.cancelUp}>
                <Text style={{ color: 'white', fontSize: 16 }}>cancel</Text>
              </TouchableOpacity>

            </View>

            < View style={{ width: '40%', height: 40, marginLeft:40,  borderRadius: 50, backgroundColor: 'lightgreen', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.NextUp}>
                <Text style={{ color: 'white', fontSize: 16 }}>proceed</Text>
              </TouchableOpacity>

            </View>
          </View>



        </View>

      );
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <View style={styles.container2}>

          <TouchableOpacity >
            <Animatable.View >
              <Text style={{ color: 'white', fontSize:  24}}>Stress Detector!</Text>
            
            </Animatable.View>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', height: 20, marginBottom: 70, justifyContent: 'center', alignItems: 'center' }}>
          < View style={{ width: '80%', height: 60, marginBottom: 30, borderRadius: 50, backgroundColor: '#d9534f', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.signUp}>
              <Text style={{ color: 'white', fontSize: 24 }}>Start test</Text>
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
