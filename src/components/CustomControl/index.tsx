import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useAppSelector } from 'app/hooks';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

// custom hooks
import useAudio from './useAudio';

// components
import Control from './Control';

interface CustomControlProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        height: 180,
        backgroundColor: '#444',
        zIndex: 15,
        position: 'fixed',
        left: 0,
        bottom: 0,
        borderRadius: '10px 10px 0 0'
    },
    input: {
        width: 42,
      },
  }),
);

const  MyAudio: React.FC<{base64: string}> = (props):React.ReactElement=>{

    const classes = useStyles();
    const { base64 } = props;

    const {
        playing, toggle, 
        currentTime, duration, 
        timeChange, volumeChange
    } = useAudio("data:audio/mpeg;base64, "+base64);
    
    return(
        <Box className={classes.root} p={1}>
            <Box>
                {
                    playing? 
                        (<PauseCircleFilledIcon
                            onClick={toggle}
                            fontSize='large'
                        />) : 
                        (<PlayCircleFilledIcon 
                            onClick={toggle}
                            fontSize='large'
                        />)
                }
            </Box>
            <Box>{(new Date(Math.ceil(currentTime) * 1000)).toISOString().substr(11,8)}</Box>
            <Box>{(new Date(Math.ceil(duration) * 1000)).toISOString().substr(11,8)}</Box>
            <Control timeChange={timeChange} volumeChange={volumeChange} duration={duration}/>
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