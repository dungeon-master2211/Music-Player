import {View,Text, StyleSheet} from 'react-native'
import TrackPlayer,{useProgress} from 'react-native-track-player'
import Slider from '@react-native-community/slider'
export default function Progressbar():JSX.Element{
    const {position,duration} = useProgress()
    function formatTime(time:number){
        // return Math.round((time/60)*10)/10
        
        return `${Math.floor(time/60)}.${Math.round(time%60)}`
    }
    return(
        <View style={barStyle.barContainer}>
            <Text>{formatTime(position)}    /   {formatTime(duration)}</Text>
            <Slider 
                value={position}
                minimumValue={0}
                maximumValue={duration}
                disabled={true}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                style={barStyle.sliderbar}
            />
            {/* <ProgressBar styleAttr='Horizontal' indeterminate={false}
            progress={progress.position/progress.duration}
            /> */}
        </View>
    )
}

const barStyle = StyleSheet.create({
    barContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    sliderbar:{
        width:300,
        height:40
    }
})