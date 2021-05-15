import React from 'react';

// Package 
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

// App 
import {useAppDispatch, useAppSelector} from 'app/hooks'
import { setClose, setWaiting } from 'app/slices/progressSlice';

// Components 
import Progresser from './Progresser';

interface Props{
}

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

const CustomProgress: React.FC<Props> =(): React.ReactElement => {

    const classes = useStyles();
    const progresser = useAppSelector(state => state.progress);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const setCloseClick = ()=>{
        const action = setClose();
        dispatch(action);
    }

	React.useEffect(() => { 
		return history.listen((location) => { 
			if(location.pathname !== '/' ){
				const action = setWaiting(location.pathname);
            	dispatch(action);
			}
		}) 
	 }, [history])

	React.useEffect(()=>{
		if(history.location.pathname!=='/'){
			const action = setWaiting(history.location.pathname);
			dispatch(action);
		};
	},[]);

    return (
        <Box className={classes.root}>
            {
                (progresser.waiting) && 
                    (<Progresser key={progresser.path} success={progresser.success} setCloseClick={setCloseClick} />)
            }
        </Box>
    );
};


export default CustomProgress;