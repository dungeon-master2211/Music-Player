import TrackPlayer,{Track,AppKilledPlaybackBehavior,RepeatMode,Event,Capability} from 'react-native-track-player'

const data:Track[] = [
    {
        id:'1',
        url:require('./assets/audio/one.mp3'),
        title:'Deva Deva',
        artist:'Pritam, Arijit Singh',
        artwork:'https://c.saavncdn.com/015/Deva-Deva-From-Brahmastra-Malayalam-Malayalam-2022-20220810153409-500x500.jpg',
        duration:165
    },{
        id:'2',
        url:require('./assets/audio/two.mp3'),
        title:'Kesariya',
        artist:'Sujith, Harshit',
        artwork:'https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-500x500.jpg',
        duration:224
    },{
        id:'3',
        url:require('./assets/audio/three.mp3'),
        title:'Coka',
        artist:'Arpit, Rosan',
        artwork:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKJ2JmHVIeGFRJBPFq3hhrwVvn4j9zf-ujz5ecGa3f5uFtXElN-VmKMTeWX3LIKjEot8M&usqp=CAU',
        duration:133
    },{
        id:'4',
        url:require('./assets/audio/four.mp3'),
        title:'Ratan Lambiyan',
        artist:'Arijit Singh',
        artwork:'https://i.scdn.co/image/ab67616d0000b273a75c2f26913099a420050f01',
        duration:105
    },{
        id:'5',
        url:require('./assets/audio/five.mp3'),
        title:'Tu Maan Meri Jaan',
        artist:'King',
        artwork:'https://i1.sndcdn.com/artworks-NdUXtLgMczD8EAQ4-qTyQBA-t500x500.jpg',
        duration:274
    },{
        id:'6',
        url:require('./assets/audio/six.mp3'),
        title:'Tu Jane Na',
        artist:'Aatif Aslam',
        artwork:'https://c.saavncdn.com/895/Tu-Jaane-Na-Hindi-2022-20220303192837-500x500.jpg',
        duration:172
    }
]

export async function setupPlayer(){
    let isSetup = true
    try {
        await TrackPlayer.getCurrentTrack()
        isSetup = true
    } catch {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.updateOptions({
            android:{
                appKilledPlaybackBehavior:AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
            },
            capabilities:[
                Capability.Pause,
                Capability.Play,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo
            ],
            compactCapabilities:[
                Capability.Pause,
                Capability.Play,
                Capability.SkipToNext,
                Capability.SeekTo
            ],
            progressUpdateEventInterval:2
        })
        isSetup = true
    }
    finally{
        return isSetup
    }
}

export async function addTracks(){
    await TrackPlayer.add(data)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export async function playbackService(){
    TrackPlayer.addEventListener(Event.RemotePlay,()=>{
        TrackPlayer.play()
    })
    TrackPlayer.addEventListener(Event.RemotePause,()=>{
        TrackPlayer.pause()
    })
    TrackPlayer.addEventListener(Event.RemoteNext,()=>{
        TrackPlayer.skipToNext()
    })
    TrackPlayer.addEventListener(Event.RemotePrevious,()=>{
        TrackPlayer.skipToPrevious()
    })
}