import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface Props {
    timeChange: (value: number)=>void,
    volumeChange: (value : number)=>void,
    duration: number,
}

const Control: React.FC<Props> = (props):React.ReactElement=>{

    const { timeChange, volumeChange, duration } = props;
    const [timeValue, setTimeValue] = React.useState<number | string | Array<number | string>>(0);
    const [volumeValue, setVolumeValue] = React.useState<number | string | Array<number | string>>(80);
    const typeTimeoutRefTime = React.useRef<any>(null);
    const typeTimeoutRefVolume = React.useRef<any>(null);

    const handleTimeChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setTimeValue(value);
        typeTimeoutRefTime.current && clearTimeout(typeTimeoutRefTime.current);

        typeTimeoutRefTime.current = setTimeout(
            ()=>{
                timeChange(parseInt(value.toString()));
            }, 500
        );
    };

    const handleVolumeChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setVolumeValue(value);
        typeTimeoutRefVolume.current && clearTimeout(typeTimeoutRefVolume.current);
        typeTimeoutRefVolume.current = setTimeout(
            ()=>{
                volumeChange(parseInt(value.toString()));
            }, 500
        );
    };
    
    const formatTime = (value: number)=>(
        (new Date(Math.ceil(value*duration/100) * 1000)).toISOString().substr(14,5)
    )

    return(
        <>
            <Typography id="input-slider" gutterBottom>
                Volume
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>{/* <VolumeUp /> */}</Grid>
                <Grid item xs>
                    <Slider
                        valueLabelDisplay="auto"
                        aria-labelledby="discrete-slider-small-steps"
                        getAriaValueText={formatTime}
                        valueLabelFormat={formatTime}
                        value={typeof timeValue === 'number' ? timeValue : 0}
                        onChange={handleTimeChange}
                    />
                </Grid>
                <Grid item>{/* <VolumeUp /> */}</Grid>
                <Grid item xs>
                    <Slider
                        valueLabelDisplay="auto"
                        aria-labelledby="discrete-slider-small-steps"
                        getAriaValueText={(value)=>((value).toString() + '%')}
                        valueLabelFormat={(value)=>((value).toString() + '%')}
                        value={typeof volumeValue === 'number' ? volumeValue : 80}
                        onChange={handleVolumeChange}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Control;