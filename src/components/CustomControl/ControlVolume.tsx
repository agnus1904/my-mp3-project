import React from 'react';
import Slider from '@material-ui/core/Slider';

interface Props {
    volumeChange: (value : number)=>void,
}

const ControlVolume: React.FC<Props> = (props):React.ReactElement=>{

    const { volumeChange } = props;
    const [volumeValue, setVolumeValue] = React.useState<number | string | Array<number | string>>(80);
    const typeTimeoutRef = React.useRef<any>(null);

    const handleVolumeChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setVolumeValue(value);
        typeTimeoutRef.current && clearTimeout(typeTimeoutRef.current);
        typeTimeoutRef.current = setTimeout(
            ()=>{
                volumeChange(parseInt(value.toString()));
            }, 300
        );
    };
    
    return(
        <>
            <Slider
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider-small-steps"
                getAriaValueText={(value)=>((value).toString())}
                valueLabelFormat={(value)=>((value).toString())}
                value={typeof volumeValue === 'number' ? volumeValue : 80}
                onChange={handleVolumeChange}
            />
        </>
    )
}

export default ControlVolume;