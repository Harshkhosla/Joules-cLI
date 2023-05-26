import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Linking } from 'react-native';
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'
import { Switch } from 'react-native-paper';

export default function Modes1({ mode,data, style,onPress,onToggleSwitch,isSwitchOn, ...props }) {
    // const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    // setIsSwitchOn(data)
    
    // const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.container}>
  <Text style={styles.textContainer}>
    <Text style={styles.text}>{data}</Text>
  </Text>
  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
  {/* <PaperButton onPress={handlePress}>Press</PaperButton> */}
</View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        padding: 25,
        borderRadius: 8,
        alignItems: 'center',
      },
      textContainer: {
        marginBottom: 10,
      },
      text: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
})
