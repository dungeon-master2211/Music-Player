import {View,Text, StyleSheet} from 'react-native'
import { Track } from 'react-native-track-player'
import type {PropsWithChildren} from 'react'

type trackInfo = PropsWithChildren<{
    track:Track|undefined|null
}>

export default function SongInfo({track}:trackInfo):JSX.Element{
    return(
        <View style={infoStyle.infoContainer}>
            <Text style={infoStyle.trackTitle}>{track?.title}</Text>
            <Text style={infoStyle.trackArtist}>{track?.artist}</Text>
        </View>
    )
}
const infoStyle = StyleSheet.create({
    infoContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    trackTitle:{
        fontSize:30,
        margin:4
    },
    trackArtist:{
        fontSize:20,
        fontWeight:'200'
    }
})