import React from 'react';

const useAudio = (src: string) => {

    const [audio] = React.useState<HTMLAudioElement>(new Audio(src));
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [audioCurrentTime, setAudioCurrentTime] = React.useState<number>(0);
    const [audioDuration, setAudioDuration] = React.useState<number>(0);
    const [audioVolume, setAudioVolume] = React.useState<number>(0);
    const [muted, setMuted] = React.useState<boolean>(false);

    const togglePlay = ()=>{
        setPlaying(playing => !playing);
    };

    const toggleMute = ()=>{
        setMuted(muted => !muted);
    }

    const stopAudio: ()=>void = 
    React.useCallback(()=>{
        audio.pause();
        audio.currentTime = 0;
    },[audio]);

    const onTimeUpdate: ()=>void = 
    React.useCallback(()=>{
        setAudioCurrentTime(audio.currentTime)}
    ,[setAudioCurrentTime, audio]);

    const onLoad = React.useCallback(()=>{
        setAudioVolume(0.8);
        setAudioDuration(audio.duration);
        setTimeout(()=>setPlaying(true),1000);
    },[audio]);

    const timeChange = React.useCallback((newTime: number)=>{
        audio.currentTime = newTime*audio.duration/100;
    },[audio]);

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
    },[playing, audio]);

    React.useEffect(() => {
        muted ? audio.muted=true : audio.muted=false;
    },[muted, audio]);

    React.useEffect(() => {
        audio.volume = audioVolume;
    },[audioVolume, audio]);

    React.useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('loadedmetadata', onLoad);
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
        audio.removeEventListener('timeupdate',  onTimeUpdate);
        audio.removeEventListener('loadedmetadata', onLoad);
      };
    }, [audio, onLoad, onTimeUpdate]);
  
    return {
        playing, muted, audioCurrentTime, audioDuration, audioVolume,
        togglePlay, timeChange, volumeChange, toggleMute, stopAudio,
    };
};

export default useAudio;