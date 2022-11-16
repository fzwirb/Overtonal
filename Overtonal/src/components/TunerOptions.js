import React, { useState, Component} from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import RadioGroup, { RadioButton } from 'react-native-radio-buttons-group';
import { SelectList } from 'react-native-dropdown-select-list'
import ModalDropdown from 'react-native-modal-dropdown';
import Tuner from "./Tuner";
// @ts-nocheck

var keySelected = 'C'
var lvlSelected = "Beginner"
startTuner = (k, l) => {
    console.log("RESTART TUNER");
    const t = new Tuner()
    t.start(k, l)
}


updateTuner = (k, l) => {

        const tuner = new Tuner()
        console.log("IN UPDATE TUNER");
        if(k == null){
            k = keySelected
        }
        if(l == null){
            l = lvlSelected
        }
        console.log(k + " " + l);
        tuner.stop();
        startTuner(k, l);

} 

    
const TunerOptions  = () => {

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
            <View style={styles.container}>
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
                <Button  onPress={ () => this.updateTuner(key, lvl)}
                    title="Update Tuner"
                    color="#841584"
                    accessibilityLabel="Update tuner settings"/>
            </View> 
        )
        
    }

const styles = StyleSheet.create({
    container: {
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
  })

export default TunerOptions