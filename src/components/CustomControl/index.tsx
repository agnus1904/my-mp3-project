import React from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useAppSelector } from 'app/hooks';
import clsx from 'clsx';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

// custom hooks
import useAudio from './useAudio';

// components
import ControlTime from './ControlTime';
import ControlVolume from './ControlVolume';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: 'calc(100vw - 15px)',
        height: 80,
        backgroundColor: '#444',
        zIndex: 15,
        position: 'fixed',
        left: 0,
        bottom: 0,
        borderRadius: '15px 15px 0 0',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.5s ease-in-out',
        [theme.breakpoints.down('sm')]: {
            height: 160,
            bottom: 50,
        },
        [theme.breakpoints.down('sm')]: {
            height: 160,
            bottom: 40,
        },
        '& .box-1':{
            [theme.breakpoints.down('sm')]: {
                order: 1,
            },
        },
        '& .box-2':{
            [theme.breakpoints.down('sm')]: {
                order: 2,
            },
        },
        '& .box-3':{
            [theme.breakpoints.down('sm')]: {
                order: 1,
            },
        },
    },
    rootShow:{
        bottom: -75,
        [theme.breakpoints.down('sm')]: {
            bottom: -105,
        },
        // [theme.breakpoints.down('xs')]: {
        //     bottom: -115,
        // },
    },
    button: {
        cursor: 'pointer',
        position: 'absolute',
        top: -35,
        right: 10,
    },
    info: {
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        display: 'flex',
        paddingBottom: 5,
        [theme.breakpoints.down('sm')]: {
            padding: '0px 0 0px 0px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0px 0 0px 10px',
        },
        '& .info-image':{
            width: 50,
            height: 50,
            backgroundColor: 'black',
            borderRadius: 5,
            marginRight: 25,
            marginTop: 5,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            [theme.breakpoints.down('xs')]: {
                marginTop: 0,
                marginRight: 10,
            },
        },
        '& .info-text':{
            textAlign: 'start',
            [theme.breakpoints.down('xs')]: {
                '& .MuiTypography-body1':{
                    fontSize: 15,
                },
                '& .MuiTypography-body2':{
                    fontSize: 12,
                },
            },
        },
    },
    control: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingRight: 80,
        [theme.breakpoints.down('sm')]: {
            padding: '10px 0px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
        },
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
        paddingRight: 20,
        [theme.breakpoints.down('sm')]: {
            padding: '10px 0px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px 10px 0px',
        },
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
    },
  }),
);

interface MyAudioProps {
    music_id: string | null,
    music_name: string | null,
    music_singer: string | null,
    music_url: string,
    music_avatar_url: string | null,
}

const  MyAudio: React.FC<MyAudioProps> = (props):React.ReactElement=>{

    const classes = useStyles();
    const { 
        music_name,
        music_singer,
        music_url,
        music_avatar_url
    } = props;
    
    const {
        playing, muted, audioCurrentTime, audioDuration, audioVolume,
        togglePlay, timeChange, volumeChange, toggleMute, stopAudio
    } = useAudio(music_url);
    
    React.useEffect(()=>{
        return ()=>{
            stopAudio();
        }
    },[stopAudio]);

    return(
        <>
            <Grid container>
                <Grid item xs={'auto'} sm={1} md={'auto'}/>
                <Grid item xs={8} sm={6} md={4} className='box-1' >
                    <Box className={classes.info}>
                        <Box className='info-image' style={{backgroundImage: `url(${music_avatar_url})` }}/>
                        <Box className='info-text'>
                            <Typography variant='body1'>
                                {music_name}
                            </Typography>
                            <Typography variant='body2'>
                                {music_singer}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item container xs={12} sm={12} md={6} className='box-2'>
                    <Grid item xs={'auto'} sm={1} md={'auto'} />
                    <Grid item xs={12} sm={10} md={12} >
                        <Box className={classes.control}>
                            <SkipPreviousIcon />
                            {playing? 
                                (<PauseCircleFilledIcon onClick={togglePlay} />) : 
                                (<PlayCircleFilledIcon onClick={togglePlay} />)
                            }
                            <SkipNextIcon />
                            <Box p={2} style={{color: '#17b717'}}>
                                <Typography variant='body2'>
                                    {(new Date(Math.ceil(audioCurrentTime) * 1000)).toISOString().substr(14,5)}
                                </Typography>
                            </Box>
                            <ControlTime timeChange={timeChange} audioCurrentTime={audioCurrentTime} audioDuration={audioDuration} />
                            <Box p={2}>
                                <Typography variant='body2'>
                                    {(new Date(Math.ceil(audioDuration) * 1000)).toISOString().substr(14,5)}
                                </Typography>    
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={'auto'} sm={1} md={'auto'} />
                </Grid>
                <Grid item xs={4} sm={4} md={2} className='box-3'>
                    <Box className={classes.volume}>
                        {muted ? (<VolumeOffIcon onClick={toggleMute} />) : 
                            audioVolume === 0 ? (<VolumeMuteIcon onClick={toggleMute} />) :
                            audioVolume > 0 && audioVolume <=0.4 ? (<VolumeDownIcon onClick={toggleMute} />):
                            audioVolume > 0.4 && audioVolume <=1 ? (<VolumeUpIcon onClick={toggleMute} />) : ''
                        }
                        <ControlVolume volumeChange={volumeChange} />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

interface CustomControlProps{
}

const CustomControl: React.FC<CustomControlProps> = ()=>{
    const controlStore = useAppSelector(state=>state.control);
    const classes = useStyles();

    const [isShowing, setIsShowing] = React.useState(false);

    React.useEffect(
        ()=>{
            controlStore.data.music_url || setIsShowing(false);
            const timer = setTimeout(()=>{
                controlStore.data.music_url && setIsShowing(true);
            },1000);
            return ()=>{
                clearTimeout(timer);
            }
        },[controlStore.data.music_url]
    );

    return(
        // <>
        <Box
            className={clsx(classes.root, {
                [classes.rootShow]: isShowing === false,
            })}
            p={1}
        >
            {
                controlStore.data.music_url && (<Button 
                    variant='text'
                    className={classes.button}
                    onClick={()=>{setIsShowing(!isShowing)}}
                >
                    {
                        (!isShowing ? (<ExpandLessIcon />) : (<ExpandMoreIcon />))
                    }
                </Button>)
            }
            

            {
                controlStore.data.music_url && 
                    <MyAudio 
                        key={controlStore.id}
                        music_id={controlStore.id}
                        music_name={controlStore.data.music_name}
                        music_singer={controlStore.data.music_singer}
                        music_url={controlStore.data.music_url}
                        music_avatar_url={controlStore.data.music_avatar_url}
                    />
            }
        </Box>
    )
}

export default CustomControl;