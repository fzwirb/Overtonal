import React, { useState, } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import RadioGroup, { RadioButton } from 'react-native-radio-buttons-group';
import { set } from 'react-native-reanimated';

export default function TunerOptions() {
    const [radioButtons, setRadioButtons] = useState( [
        {
            id: 'c', // acts as primary key, should be unique and non-empty string
            label: 'C',
            value: 'C',
            selected: true
        }, {
            id: 'bflat', // acts as primary key, should be unique and non-empty string
            label: 'B Flat',
            value: 'B Flat',
            selected: false

        }, {
            id: 'eflat',
            label: 'E Flat',
            value: 'eflat',
            selected: false

        },{
            id: 'f',
            label: 'F',
            value: 'F',
            selected: false

        }
        ]);
    
        
        bflatNoteNamesMap = new Map([
            ["C", "D"],
            ["C#/Db", "D#/Eb"],
            ["D", "E"],
            ["D#/Eb", "F"],
            ["E", "F#/Gb"],
            ["F", "G"],
            ["F#/Gb", "G#/Ab"],
            ["G", "A"],
            ["G#/Ab", "A#/Bb"],
            ["A", "B"],
            ["A#/Bb", "C"],
            ["B", "C#/Db"]
          ]);
          eflatNoteNamesMap = new Map([
            ["C", "A"],
            ["C#/Db", "A#/Bb"],
            ["D", "B"],
            ["D#/Eb", "C"],
            ["E", "C#/Db"],
            ["F", "D"],
            ["F#/Gb", "D#/Eb"],
            ["G", "E"],
            ["G#/Ab", "F"],
            ["A", "F#/Gb"],
            ["A#/Bb", "G"],
            ["B", "G#/Ab"]
          ]);
    
          fNoteNamesMap = new Map([
            ["C", "G"],
            ["C#/Db", "G#/Ab"],
            ["D", "A"],
            ["D#/Eb", "A#/Bb"],
            ["E", "B"],
            ["F", "C"],
            ["F#/Gb", "C#/Db"],
            ["G", "D"],
            ["G#/Ab", "D#/Eb"],
            ["A", "E"],
            ["A#/Bb", "F"],
            ["B", "F#/Gb"]
          ]);
        
         
        
        const [selected, setSelected] = useState(radioButtons[0].value)
        
        
        function onPressRadioButton(radioButtonsArray) {
            setRadioButtons(radioButtonsArray);
            setSelected(radioButtons.find(e => e.selected == true).value);
            }
    return (
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onPressRadioButton} 
                layout='row'                
            />
        
    );

}

const styles = StyleSheet.create({
    radio: {
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

