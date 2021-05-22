import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';

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

const Progresser: React.FC<{waiting: boolean, success : boolean, setCloseClick: ()=>void}> = (props)=>{

    const [progress, setProgress] = React.useState(0);
    const { waiting, success, setCloseClick } = props;
    const timerRefInter = React.useRef<any>(null);
    const timerRefTimeout = React.useRef<any>(null);

    React.useEffect(
        ()=>{
            timerRefTimeout.current && clearTimeout(timerRefTimeout.current);
            timerRefInter.current && clearInterval(timerRefInter.current);
            if(success === true && waiting === true){
                timerRefInter.current = setInterval(()=>{
                    setProgress((prevProgress)=>{
                        if(prevProgress <100){
                            return prevProgress + 2;
                        }
                        else{
                            return prevProgress;
                        }
                    });
                }, 25);
                timerRefTimeout.current = setTimeout(
                    ()=>{
                        clearInterval(timerRefInter.current);
                        setCloseClick();
                }, 750);
            };
            
            return () => {
                timerRefTimeout.current && clearTimeout(timerRefTimeout.current);
                timerRefInter.current && clearInterval(timerRefInter.current);
            };
        }, [success, setCloseClick, waiting]
    );

    React.useEffect(() => {
        timerRefInter.current = setInterval(() => {
            setProgress(
                (prevProgress) => 
                {
                    if(prevProgress < 40){
                        return prevProgress+20
                    }
                    if(prevProgress >=40 && prevProgress  < 60 ){
                        return prevProgress +10;
                    }
                    if(prevProgress >=60 && prevProgress  < 85 ){
                        return prevProgress +5;
                    }
                    else{
                        return prevProgress;
                    }
                }
            );
        }, 250);
        timerRefTimeout.current = setTimeout(
            ()=>{
                clearInterval(timerRefInter.current);
        }, 2500);
        return () => {
            timerRefTimeout.current && clearTimeout(timerRefTimeout.current);
            timerRefInter.current && clearInterval(timerRefInter.current);
        };
    }, []);

    return(
        <Box>
            <BorderLinearProgress variant="determinate" value={progress} />
        </Box>
    )
}

export default Progresser;