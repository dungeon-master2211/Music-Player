import {useState,useEffect} from 'react'
import {SafeAreaView,View,Text,ActivityIndicator, Image, StyleSheet,useWindowDimensions } from 'react-native'
import { setupPlayer,addTracks } from './service'
import TrackPlayer ,{Track,useTrackPlayerEvents,Event,State} from 'react-native-track-player'
import Control from './components/Control'
import SongInfo from './components/SongInfo'
import Progressbar from './components/Progressbar'
let devicewidth 
export default function App():JSX.Element{
  const [isSteupPlayer,setSetupPlayer] = useState(false)
  const [playerInfo,setPlayerInfo] = useState<Track|null>()
  const {width} = useWindowDimensions()
  // devicewidth=width
  async function setup(){
    let isSetup = await setupPlayer()
    const queue = await TrackPlayer.getQueue()

    if(isSetup && queue.length<=0){
      await addTracks()
    }
    setSetupPlayer(isSetup)
  }
  async function trackInfo(){
    let track:any = await TrackPlayer.getCurrentTrack()
    const info:any = await TrackPlayer.getTrack(track)
    setPlayerInfo(info)

  }
  useEffect(()=>{
    setup()
    
  },[])
  
 

  useTrackPlayerEvents([Event.PlaybackTrackChanged],(event)=>{
    if(event.type === Event.PlaybackTrackChanged && event.nextTrack != null){
      trackInfo()
    }
  })
  if(!isSteupPlayer) return(
    <View>
      <ActivityIndicator size='large'></ActivityIndicator>
    </View>
  )
  return (
    <SafeAreaView style={appStyle.mainContainer}>
      <View style={appStyle.secondMainContainer}>
        <View style={appStyle.artContainer}>
        {playerInfo?.artwork && <Image style={[appStyle.artwork,{maxWidth:width-50}]} source={{uri:playerInfo.artwork?.toString()}}/>}
        </View>
        <SongInfo track={playerInfo}/>
        <Progressbar/>
        <Control/>
      </View>
      
    </SafeAreaView>
  )
}

const appStyle = StyleSheet.create({
  mainContainer:{
    flex:1
  },
  secondMainContainer:{
    flex:1,
    backgroundColor:'#604878',
    justifyContent:'space-evenly',
    alignItems:'center',
    padding:10
  },
  artContainer:{
    elevation:8,
    shadowColor:'#FFFFFF'
  },
  artwork:{
    width:300,
    height:300,
    
    
  }
})