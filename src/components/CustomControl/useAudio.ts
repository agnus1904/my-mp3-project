import React from 'react';

const useAudio = (src: string) => {

    const [audio] = React.useState(new Audio(src));
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [audioCurrentTime, setAudioCurrentTime] = React.useState<number>(0);
    const [audioDuration, setAudioDuration] = React.useState<number>(0);
    const [audioVolume, setAudioVolume] = React.useState<number>(0);
    const [muted, setMuted] = React.useState<boolean>(false);

    const togglePlay = ()=>{
        setPlaying(!playing);
    };

    const toggleMute = ()=>{
        setMuted(!muted);
    }

    const onTimeUpdate = React.useCallback(()=>{
        setAudioCurrentTime(audio.currentTime);
    },[]);

    const onLoad = ()=>{
        setAudioVolume(0.8);
        setAudioDuration(audio.duration);
        setTimeout(()=>{setPlaying(true)},2000);
    };

    const timeChange = React.useCallback((newTime: number)=>{
        audio.currentTime = newTime*audio.duration/100;
    },[]);

    const volumeChange = React.useCallback((newVolume: number)=>{
        setAudioVolume(newVolume/100);
    },[]);
  
    React.useEffect(() => {
        if(playing===true){
            audio.play().catch(error=>{
                setPlaying(false);
                let playAttempt = setInterval(() => {
                    audio.play()
                      .then(() => {
                        clearInterval(playAttempt);
                        setPlaying(true);
                      })
                      .catch(error => {
                        console.log('Unable to play the video, User has not interacted yet.');
                      });
                  }, 200);
            });
        }else{
            audio.pause();
        }
    },[playing]);

    React.useEffect(() => {
        muted ? audio.muted=true : audio.muted=false;
    },[muted]);

    React.useEffect(() => {
        audio.volume = audioVolume;
    },[audioVolume]);

    React.useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('loadedmetadata', onLoad);
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
        audio.removeEventListener('timeupdate',  onTimeUpdate);
        audio.removeEventListener('loadedmetadata', onLoad);
      };
    }, []);
  
    return {
        playing, muted, audioCurrentTime, audioDuration, audioVolume,
        togglePlay, timeChange, volumeChange, toggleMute
    };
};

export default useAudio;