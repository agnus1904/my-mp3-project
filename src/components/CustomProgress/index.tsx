import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';
import {useAppDispatch, useAppSelector} from 'app/hooks'
import { makeStyles, Theme, withStyles, createStyles } from '@material-ui/core/styles';
import { setClose } from 'app/slices/progressSlice';

interface CustomProgressProps{
    title?: string,
    backgroundUrl?: string
}

const defaultProps : CustomProgressProps = {
    title: '',
    backgroundUrl: ''
}

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 4,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 10,
    },
  }),
);

const CustomProgressChild: React.FC<{success : boolean, setCloseClick: ()=>void}> = (props)=>{

    const [progress, setProgress] = React.useState(0);
    const { success, setCloseClick } = props;

    React.useEffect(
        ()=>{
            if(success){
                const timer = setInterval(() => {
                    setProgress(
                        (prevProgress) => 
                        {
                            if(prevProgress <100){
                                return prevProgress + 5;
                            }
                            else{
                                return 100;
                            }
                        }
                    );
                }, 150);
                // console.log('count done');
                const timeOut = setTimeout(
                    ()=>{
                        clearInterval(timer);
                        setCloseClick();
                }, 1200);
                return () => {
                    timeOut && clearTimeout(timeOut);
                    timer && clearInterval(timer);
                };
            }
        },[success]
    );

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(
                (prevProgress) => 
                {
                    if(prevProgress >= 85 ){
                        return prevProgress;
                    }if(prevProgress<=20 ){
                        return prevProgress + 20
                    }if(prevProgress>20 && prevProgress<=60 ){
                        return prevProgress + 10
                    }else{
                        return prevProgress + 5
                    }
                }
            );
        }, 400);
        const timeOut = setTimeout(
            ()=>{
                clearInterval(timer);
        }, 4000);
        return () => {
            timeOut && clearTimeout(timeOut);
            timer && clearInterval(timer);
        };
    }, []);

    return(
        <Box>
            <BorderLinearProgress variant="determinate" value={progress} />
        </Box>
    )
}

const CustomProgress: React.FC<CustomProgressProps> =(props): React.ReactElement => {

    const classes = useStyles();
    const progresser = useAppSelector(state => state.progress);
    const dispatch = useAppDispatch();

    const setCloseClick = ()=>{
        const action = setClose();
        dispatch(action);
    }

    return (
        <Box className={classes.root}>
            {
                (progresser.waiting) && (<CustomProgressChild success={progresser.success} setCloseClick={setCloseClick} />)
            }
        </Box>
    );
};

CustomProgress.defaultProps = defaultProps;

export default CustomProgress;