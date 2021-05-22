import React from 'react';
import Slider from '@material-ui/core/Slider';

interface Props {
    timeChange: (value: number)=>void,
    audioCurrentTime: number,
    audioDuration: number,
}

const ControlTime: React.FC<Props> = (props):React.ReactElement=>{

    const { timeChange, audioDuration, audioCurrentTime } = props;
    const [ timeValue, setTimeValue] = React.useState<boolean>(true);
    const typeTimeoutRef = React.useRef<any>(null);
    const typeCurrentTime = React.useRef<any>(0);

    const handleTimeChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setTimeValue(!timeValue);
        typeCurrentTime.current = value;
        typeTimeoutRef.current && clearTimeout(typeTimeoutRef.current);

        typeTimeoutRef.current = setTimeout(
            ()=>{
                timeChange(parseInt(value.toString()));
                typeTimeoutRef.current= null;
            }, 200
        );
    };

    React.useEffect(()=>{
        if(!typeTimeoutRef.current){
            typeCurrentTime.current = audioCurrentTime===0 ? 0 :  audioCurrentTime/audioDuration*100;
        }
    });

    const formatTime: (value: number)=>string = (value)=>
        {
            // console.log(value);
            // return '12';
            return (new Date(Math.ceil((value*audioDuration)/100) * 1000)).toISOString().substr(14,5)
        }
    
  
    return(
        <>
            <Slider
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider-small-steps"
                getAriaValueText={formatTime}
                valueLabelFormat={formatTime}
                value={typeof typeCurrentTime.current  === 'number' ? typeCurrentTime.current  : 0}
                onChange={handleTimeChange}
            />
        </>
    )
}

export default ControlTime;