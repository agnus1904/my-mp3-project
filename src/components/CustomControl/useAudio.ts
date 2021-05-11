import React from 'react';

const useAudio = (base64: string) => {

    const [audio] = React.useState(new Audio(base64));
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [audioCurrentTime, setAudioCurrentTime] = React.useState<number>(0);
    const [audioDuration, setAudioDuration] = React.useState<number>(0);
    const [volume, setVolume] = React.useState<number>(0.8);
    const [muted, setMuted] = React.useState<boolean>(false);

    const toggle = () => {
        setPlaying(!playing);
    };

    const onTimeUpdate = ()=>{
        setAudioCurrentTime(audio.currentTime);
    }

    const onLoad = ()=>{
        setAudioDuration(audio.duration);
        audio.volume=0.8;
    }

    const toggleMute = ()=>{
        audio.muted = !audio.muted;
        setMuted(audio.muted);
    }

    const timeChange = (newTime: number)=>{
        audio.currentTime = newTime*audio.duration/100;
    }

    const volumeChange = (newVolume: number)=>{
        audio.volume = newVolume/100;
        setVolume(newVolume/100);
    }
  
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
        playing, toggle, muted,
        currentTime : audioCurrentTime, duration: audioDuration, volume,
        timeChange, volumeChange, toggleMute
    };
};

export default useAudio;