import React from 'react'
import { Text, Pressable, StyleSheet } from 'react-native';
import colors from "./colors";



const Pause = ({onPlayerClick}) => {
    return (
        <Pressable
          style={styles.button}
          onPress={onPlayerClick} >
          <Text style={styles.text}>{'Stop'}</Text>
       </Pressable>
    )
  }
  
  //styles
  const styles = StyleSheet.create({
        button: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
      }, 
      text: {
          color: colors.black,
          fontSize: 30,
          fontWeight: "300",
  
      }
    });

export default Pause