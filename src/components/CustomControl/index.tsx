import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useAppSelector } from 'app/hooks';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

// custom hooks
import useAudio from './useAudio';

// components
import ControlTime from './ControlTime';
import ControlVolume from './ControlVolume';

interface CustomControlProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        height: 100,
        backgroundColor: '#444',
        zIndex: 15,
        position: 'fixed',
        left: 0,
        bottom: -90,
        borderRadius: '15px 15px 0 0',
        display: 'flex',
        alignItems: 'center',
    },
    info: {
        width: '100%',
        height: '100%',
        paddingLeft: 30,
        display: 'flex',
        '& .info-image':{
            width: 50,
            height: 50,
            backgroundColor: 'black',
            borderRadius: 5,
            marginRight: 15,
            marginTop: 5,
        },
        '& .info-text':{
            textAlign: 'start',
        },
    },
    control: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingRight: 80,
        '& svg':{
            cursor: 'pointer',
            margin: 5,
        },
        '& .MuiSlider-root':{
            color: '#17b717',
            '& .MuiSlider-rail':{
                color: '#AAA',
            }
        }
    },
    volume: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingRight: 30,
        '& svg':{
            cursor: 'pointer'
        },
        '& .MuiSlider-root':{
            marginLeft: 15,
            color: '#17b717',
            '& .MuiSlider-rail':{
                color: '#AAA',
            }
        }
    }
  }),
);

const  MyAudio: React.FC<{base64: string}> = (props):React.ReactElement=>{

    const classes = useStyles();
    const { base64 } = props;

    const {
        playing, toggle, muted,
        currentTime, duration, volume,
        timeChange, volumeChange, toggleMute
    } = useAudio("data:audio/mpeg;base64, "+base64);

    return(
        <Box className={classes.root} p={1}>
            <Grid container>
                <Grid item xs={3}>
                    <Box className={classes.info}>
                        <Box className='info-image'/>
                        <Box className='info-text'>
                            <Typography variant='body1'>
                                Hay Trao Cho Anh
                            </Typography>
                            <Typography variant='body2'>
                                Son Tung
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <Box className={classes.control}>
                        <SkipPreviousIcon />
                        {
                            playing? 
                                (<PauseCircleFilledIcon
                                    onClick={toggle}
                                />) : 
                                (<PlayCircleFilledIcon 
                                    onClick={toggle}
                                />)
                        }
                        <SkipNextIcon />
                        <Box p={2} style={{color: '#17b717'}}>
                            <Typography variant='body2'>
                                {(new Date(Math.ceil(currentTime) * 1000)).toISOString().substr(14,5)}
                            </Typography>
                        </Box>
                        <ControlTime timeChange={timeChange} currentTime={currentTime} duration={duration} />
                        <Box p={2}>
                            <Typography variant='body2'>
                                {(new Date(Math.ceil(duration) * 1000)).toISOString().substr(14,5)}
                            </Typography>    
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box className={classes.volume}>
                        {
                            muted ? (<VolumeOffIcon onClick={toggleMute} />) : 
                                volume === 0 ? (<VolumeMuteIcon onClick={toggleMute} />) :
                                volume > 0 && volume <=0.6? (<VolumeDownIcon onClick={toggleMute} />):
                                volume > 0.6 && volume <=1 ? (<VolumeUpIcon onClick={toggleMute} />) : ''
                        }
                        <ControlVolume volumeChange={volumeChange} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}


const CustomControl: React.FC<CustomControlProps> = ()=>{
    const controlStore = useAppSelector(state=>state.control);
    return(
        <>
            {controlStore.base64 && <MyAudio base64={controlStore.base64}/>}
        </>
    )
}

export default CustomControl;