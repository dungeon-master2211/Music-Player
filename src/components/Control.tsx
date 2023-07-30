import { View, Button, TouchableOpacity, StyleSheet } from 'react-native'
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function Control(): JSX.Element {
  const playbackState = usePlaybackState()
  function handlePausePlay() {
    if (playbackState === State.Playing) {
      TrackPlayer.pause()
    }
    else {
      TrackPlayer.play()
    }
  }
  return (
    <View style={styles.controlContainer}>

      <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
        <Icon name='skip-previous' size={40} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePausePlay}>
        {playbackState === State.Playing ? <Icon name='pause-circle' size={40} /> : <Icon name='play-circle' size={40} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
        <Icon name='skip-next' size={40} />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  controlContainer:{
    
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#001848',
    padding:10,
    width:200,
    borderRadius:50,
    elevation:8,
    shadowColor:'#FFFFFF'
  }
})