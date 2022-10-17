import React from 'react'
import { Text, Pressable, StyleSheet } from 'react-native';
import colors from "./colors";


const Play = ({onPlayerClick}) => {
  return (
      <Pressable
        style={styles.button}
        onPress={onPlayerClick} >
        <Text style={styles.text}>{'Start'}</Text>
     </Pressable>
  )
}

//styles
const styles = StyleSheet.create({
      button: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
    }, 
    text: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: "300",

    }
  });

export default Play