import React, { Component } from 'react'
import Play from './play'
import Pause from './pause'
import { View } from 'react-native'

import Sound from 'react-native-sound';
Sound.setCategory('Playback');

/**
 * Init the variable to store the sound used by the metronome
 */
var click = new Sound('Synth_Block_E_lo.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());

});
click.setVolume(1);

class Player extends Component {

constructor(props) {
  super(props)
  this.state = {
    playing: false
  }
}
/**
 * Method that handles playing the audio of the metronome
 */
playClick = () => {
    click.play(success => {
        if (success) {
          // console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });  
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
    this.timer = setInterval(this.playClick, (60 / tempo) * 1000);
    this.setState({playing: true}, this.playClick);
  }
}
  render() {
    return (
      <View className="player" >
        {this.state.playing? <Pause onPlayerClick={this.startAndStop} /> : <Play onPlayerClick={this.startAndStop} />}
      </View>
    )
  }
}

export default Player