import React, { Component, Audio } from 'react'
import Play from './play'
import Pause from './pause'
import { View } from 'react-native'

import Sound from 'react-native-sound';
Sound.setCategory('Playback');

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
  let playbool = false
  this.state = {
    playing: false
  }
  this.startAndStop = this.startAndStop.bind(this) //bind the state to the play method so that it can be used

}

handlePlayerClick = () => {
    console.log("in handle player click")
    console.log(this.state.playing)

  if (!this.state.playing) {
    console.log("IN FIRST IF")
    this.setState({playing: true}, 
      () => {this.handlePlayMet()});

  } else {
    console.log("IN ELSE")
    this.setState({playing: false}, 
      () => {this.handlePlayMet()});  
    console.log("DONE")
    return
  }
} 

returnFunct = () => {
  console.log("RETURN")
  return
}
updatePlayingInLoop = () => {
    console.log("updatePLAYINGLOOP CALLED")
    return inner = this.state.playing
}

playClick = () => {
    click.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });  
}

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

handlePlayMet = () => {
    console.log("in play met!")
    console.log(this.state.playing)
    this.playbool = this.state.playing
    let inner = this.playbool
    console.log("PLAYBOOL: " + this.playbool)
    this.startAndStop()
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