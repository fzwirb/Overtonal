import React, { Component, useState } from 'react'
import Play from './play'
import Pause from './pause'
import { View, StyleSheet, Text, Button } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import colors from './colors';


import Sound from 'react-native-sound';
import { and, color } from 'react-native-reanimated';
Sound.setCategory('Playback'); 

global.counter = 0;
/** 
 * Init the variable to store the sound used by the metronome
 */
//Synth_Bell_B_lo.wav
var click = new Sound('Synth_Bell_B_lo.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());
});


var accentClick = new Sound('Synth_Bell_B_hi.wav', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());
  

});
accentClick.setVolume(1);
click.setVolume(1);

class Player extends Component {

constructor(props) {
  super(props)
  this.state = {
    playing: false,
    beats: 4,
    accent: false,
    accentStatus: "Accent OFF"
  }
}
/**
 * Method that handles playing the audio of the metronome
 */
 playClick = () => {
   if(counter === this.state.beats && this.state.accent){
     accentClick.play();
     counter = 1;
   }
   else{
    click.play();
    counter+=1;
    }  
}
/**
 * Method called when the button is pressed. Handles starting and stopping the audio
 */
startAndStop = () =>{ 
  if(this.state.playing) {
    console.log("HERE")
    clearInterval(this.timer);
    this.setState({playing: false});
  }    
  else {
    console.log("BPM:", tempo)
    counter = this.state.beats;
    this.timer = setInterval(this.playClick, (60 / tempo) * 1000);
    this.setState({playing: true}, this.playClick);
  }
}

MetOptions  = () => {

const [isSelected, setSelection] = useState(false);

turnOnAccent = () => {
  console.log("IN turnOnAccent");
  console.log(this.state.accentStatus);

  if(this.state.accent == false){
    this.setState({accent: true});
    return;
  }
  this.setState({accent: false});
  return;
}
changeBeats = (num) => {
  current = this.state.beats;
  current = current + num;
  if(current === 0 || current > 16){
    return
  }
  //else
  this.setState({beats: current})
  console.log(this.state.beats)
}

return (
  <View>
    <View style={styles.checkboxContainer}>
      <CheckBox
        value={isSelected}
        onValueChange={(setSelection)}
        onChange={(setSelection) => turnOnAccent()}
        style={styles.checkbox}
      />
      <Text style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center', marginLeft: 10, fontSize: 23}}>Accent: {isSelected ? "ON" : "OFF"}</Text>
    </View>
    <View style={styles.beatsRow}>
      <View style={styles.beatsCol}>
      <Button
        onPress = {value => changeBeats(1)}
        title = "+"
        color = {colors.primary}
        fontSize = "50"
      /> 
      <Button
        onPress = {value => changeBeats(-1)}
        title = "-"
        color = {colors.primary}
        fontSize = "50"
      />
      </View>
        <Text style={{fontSize: 20}}> Beats: {this.state.beats} </Text>

    </View>
  </View>

);
};

  render() {
    return (
      <View className="player" >
        <View style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
        {this.state.playing? <Pause onPlayerClick={this.startAndStop} /> : <Play onPlayerClick={this.startAndStop} />}
        </View>
        <View>
        <this.MetOptions></this.MetOptions>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  checkboxContainer: {
    marginTop: 70,
    flexDirection: "row",
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',


  },
  checkbox: {
    alignSelf: "center",
  },
  beatsRow: {
    flexDirection: "row",
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  beatsCol: {
  marginRight: 10,  
}

});

export default Player