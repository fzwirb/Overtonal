import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import colors from "../colors.js";
import Player from '../play_button.js';

global.tempo = 120; 
 
export default function metronome() {
  const [range, setRange] = useState(tempo +  ' BPM');
  const [sliding, setSliding] = useState('Allegro');
 
  
  let width = Dimensions.get("window").width;
  
  return (
    <View style={styles.container}>
      <Text style ={{fontSize: 35, fontWeight: 'bold'}}>{range}</Text>

      {/* slider code here */}

      <Slider 
        style = {{ width: width * .7, height: 40}}
        minimumValue = {20}
        maximumValue = {200}
        //value of the slider at any given point
        tempo = {120}
        // step = {tempo}
        //INITIAL value of the slider
        value = {tempo}
        minimumTrackTintColor = {colors.primary}
        thumbTintColor = {colors.primary}
        onValueChange = {value => updateValues(parseInt(value))}
      />

      <Text style ={{fontSize: 20, fontStyle: 'italic'}}>{sliding}</Text> 
      <Button
        onPress = {value => incrementTempo(Slider.step)}
        title = "+"
        color = {colors.primary}
        fontSize = "50"
      /> 
       <Button
        onPress = {value => decrementTempo(Slider.step)}
        title = "-"
        color = {colors.primary}
        fontSize = "50"
      />
      <Player />


      <StatusBar style="auto" />
    </View>
  );
  /**
   * 
   * @TODO:
   * 
   * is there a way to update the sliders thumb positon without sliding?
   * might need to build a slider from scratch, not sure if this one supports that
   * 
   */

  function updateValues(value){
    setTempoText(value);
    setTempoNum(value);
  }
  
  //update the numerical value of the tempo as the slider is moved
  function setTempoNum(val){
    tempo = val;
    setRange(tempo + " BPM")
    Slider.step = tempo
    console.log("SLIDER:", tempo)

  }
  
  //  function to update the latin value associated with the tempo
   function setTempoText(val) {
     console.log("in set tempo text")

    if (val <= 40){
          setSliding("Grave")
        }
        else if (val > 40 && val <= 66){
         setSliding("Lento")
         return
        }
        else if (val > 66 && val <= 76) {
          setSliding("Adagio")
          return
        }
        else if (val > 76 && val <= 106) {
          setSliding("Andante")
          return
        }
        else if (val > 106 && val <= 120) {
          setSliding("Moderato")
          return
        }
        else if (val > 120 && val <= 168) {
          setSliding("Allegro")
          return
        }
        else if (val >= 168) {
          setSliding("Presto")
          return
        }
  }
  function incrementTempo(temp){
    if (temp < 200) {
      // log.d("HERE")
      tempo = temp + 1
      Slider.step++
      setTempoNum(tempo)
      setTempoText(tempo)
      console.log("PLUS BUTTON:", tempo)
      return
    }
  return
  }
  function decrementTempo(temp){
    if (temp > 20) {
      tempo = temp - 1
      Slider.step--
      setTempoNum(tempo)
      setTempoText(tempo)
      console.log("MINUS BUTTON:", tempo)
      return
    }
  return
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


