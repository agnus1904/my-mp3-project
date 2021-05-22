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
    const pathNameRef = React.useRef<string | null>(history.location.pathname);

    const setCloseClick = React.useCallback(()=>{
        const action = setClose();
        dispatch(action);
    },[dispatch]);

	React.useEffect(() => { 
		return history.listen((location) => { 
			if(location.pathname !== '/' && location.pathname !== pathNameRef.current){
                pathNameRef.current = location.pathname;
				const action = setWaiting(location.pathname);
            	dispatch(action);
			}
		})
	 }, [history, dispatch]);

	React.useEffect(()=>{
		if(history.location.pathname!=='/'){
			const action = setWaiting(history.location.pathname);
			dispatch(action);
		};
	},[dispatch, history.location.pathname]);

    return (
        <Box className={classes.root}>
            {
                (progresser.waiting) && 
                    (<Progresser key={progresser.path} waiting={progresser.waiting} success={progresser.success} setCloseClick={setCloseClick} />)
            }
        </Box>
    );
};


export default CustomProgress;