import React from 'react';
import Slider from '@material-ui/core/Slider';

interface Props {
    timeChange: (value: number)=>void,
    currentTime: number,
    duration: number,
}

const ControlTime: React.FC<Props> = (props):React.ReactElement=>{

    const { timeChange, duration, currentTime } = props;
    const [timeValue, setTimeValue] = React.useState<number | string | Array<number | string>>(0);
    const typeTimeoutRef = React.useRef<any>(null);

    const handleTimeChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setTimeValue(value);
        typeTimeoutRef.current && clearTimeout(typeTimeoutRef.current);

        typeTimeoutRef.current = setTimeout(
            ()=>{
                timeChange(parseInt(value.toString()));
            }, 300
        );
    };

    React.useEffect(
        ()=>{
            if(!typeTimeoutRef.current){
                currentTime===0 ? setTimeValue(0) : 
                setTimeValue(currentTime/duration*100);
            }
        }, [currentTime]
    );

    const formatTime: (value: number)=>string = (value)=>(
        (new Date(Math.ceil((value*duration)/100) * 1000)).toISOString().substr(14,5)
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