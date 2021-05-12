import React from 'react';
import Slider from '@material-ui/core/Slider';

interface Props {
    timeChange: (value: number)=>void,
    audioCurrentTime: number,
    audioDuration: number,
}

const ControlTime: React.FC<Props> = (props):React.ReactElement=>{

    const { timeChange, audioDuration, audioCurrentTime } = props;
    const [timeValue, setTimeValue] = React.useState<number | string | Array<number | string>>(0);
    const typeTimeoutRef = React.useRef<any>(null);

    const handleTimeChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setTimeValue(value);
        typeTimeoutRef.current && clearTimeout(typeTimeoutRef.current);

        typeTimeoutRef.current = setTimeout(
            ()=>{
                timeChange(parseInt(value.toString()));
                typeTimeoutRef.current= null;
            }, 200
        );
    };

    React.useEffect(
        ()=>{
            if(!typeTimeoutRef.current){
                audioCurrentTime===0 ? setTimeValue(0) : 
                setTimeValue(audioCurrentTime/audioDuration*100);
            }
        }, [audioCurrentTime]
    );

    const formatTime: (value: number)=>string = (value)=>(
        (new Date(Math.ceil((value*audioDuration)/100) * 1000)).toISOString().substr(14,5)
    )
  
    return(
        <>
            <Slider
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider-small-steps"
                getAriaValueText={formatTime}
                valueLabelFormat={formatTime}
                value={typeof timeValue === 'number' ? timeValue : 0}
                onChange={handleTimeChange}
            />
        </>
    )
}

export default ControlTime;