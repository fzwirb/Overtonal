import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import { PermissionsAndroid } from "react-native";
import Tuner from "../components/Tuner";
import { SelectList } from 'react-native-dropdown-select-list'

var tuner = new Tuner();
export default class TunerScreen extends Component {

   
   state = {
      note: {
         name: "A",
         octave: 4,
         frequency: 440,
         key: "C",
         lvl: "Beginner"
      },
   };

   setStateParms(k, l){
      if(k !== null){
         this.state.note.key = k;
      }
      if(l !== null){
         this.state.note.lvl = l;
      }
      this.updateTuner();
   }

   _update(note) {
      this.setState({ note });
   }
   
   async componentDidMount() {
      if (Platform.OS === "android") {
         await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
         ]);
      }
      tuner.start(this.state.note.key, this.state.note.lvl);
      tuner.onNoteDetected = (note) => {
         if (this._lastNoteName === note.name) {
            this._update(note);
         } else {
            this._lastNoteName = note.name;
         }
      };
   }
   updateTuner(){
      
      tuner.start(this.state.note.key, this.state.note.lvl);
      tuner.onNoteDetected = (note) => {
         if (this._lastNoteName === note.name) {
            this._update(note);
         } else {
            this._lastNoteName = note.name;
         }
      };

   }
   //params for drop downs which set and change tuner params
   TunerOptions  = () => {

      const [lvl, setLvl] = React.useState("");
      const [key, setKey] = React.useState("");
    
  
      const keyList = [
          {key:'1', value:'C'},
          {key:'2', value:'Bb'},
          {key:'3', value:'Eb'},
          {key:'4', value:'F'},
      ]
      const lvlList = [
          {key:'1', value:'Beginner'},
          {key:'2', value:'Intermediate'},
          {key:'3', value:'Advanced'},
      ];
  
          return (
              //column
              <View style={styles.containerDropDown}>
                  {/* row */}
                  <View style={styles.item}>
                      <Text>Change Key</Text>
      
                      <SelectList 
                          setKey={(val) => setKey(val)} 
                          setSelected={setKey}
                          data={keyList} 
                          save="value"
                          search={false}
                          placeholder="C"    
                      />            
                  </View>
                  <View style={styles.item}>
                      <Text>Change Experience Level</Text>
      
                      <SelectList 
                          setLvl={(val) => setLvl(val)} 
                          setSelected={setLvl}
                          data={lvlList} 
                          save="value"
                          search={false}
                          placeholder="Beginner"
                      />   
                  </View>
                  <Button  onPress={ () => this.setStateParms(key, lvl)}
                      title="Update Tuner"
                      color="#841584"
                      accessibilityLabel="Update tuner settings"/>
              </View> 
          )
          
      }


   render() {
      return (
         <View style={styles.container}>
            <StatusBar backgroundColor="#000" translucent />
            <Text>
               Note={this.state.note.name}
            </Text>
            <Text>
               {this.state.note.frequency.toFixed(1)} Hz
            </Text>
            <Text>
               Cents={this.state.note.cents}
            </Text>
            <View style={styles.footer}>
               <Text>Tuner Options</Text>
               <this.TunerOptions></this.TunerOptions>
            </View>
         </View>
      );
   }
}

var styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: '#F5FCFF',
   },
   titleWrapper: {

   },
   inputWrapper: {

   },
   footer: {
       alignContent: 'center',
       alignItems:'center',
       justifyContent:'center',
       flex:1,
   },
   containerDropDown: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      alignContent: 'center',
      justifyContent:'center',

    },
    item: {
      width: '50%' // is 50% of container width
    }
});
