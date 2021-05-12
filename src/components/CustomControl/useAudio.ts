import React from 'react';

const useAudio = (base64: string) => {

    const [audio] = React.useState(new Audio(base64));
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [audioCurrentTime, setAudioCurrentTime] = React.useState<number>(0);
    const [audioDuration, setAudioDuration] = React.useState<number>(0);
    const [audioVolume, setAudioVolume] = React.useState<number>(0.8);
    const [muted, setMuted] = React.useState<boolean>(false);

    const togglePlay = ()=>{
        setPlaying(!playing);
    };

    const toggleMute = ()=>{
        audio.muted = !audio.muted;
        setMuted(audio.muted);
    }

    const onTimeUpdate = React.useCallback(()=>{
        setAudioCurrentTime(audio.currentTime);
    },[]);

    const onLoad = React.useCallback(()=>{
        audio.volume=0.8;
        setAudioDuration(audio.duration);
    },[]);

    const timeChange = React.useCallback((newTime: number)=>{
        audio.currentTime = newTime*audio.duration/100;
    },[]);

    const volumeChange = React.useCallback((newVolume: number)=>{
        audio.volume = newVolume/100;
        setAudioVolume(newVolume/100);
    },[]);
  
    React.useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );

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