import React from 'react';
import { Box } from '@material-ui/core';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {useAppDispatch} from 'app/hooks'
import { setSuccess } from 'app/slices/progressSlice';

interface Props{
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//     },
//   }),
// );

const Album:React.FC<Props> =():React.ReactElement =>{


    const dispatch = useAppDispatch();

    React.useEffect(
        ()=>{
            const timer = setTimeout(()=>{
                const actionSuccess = setSuccess();
                dispatch(actionSuccess);
            }, 2000);
            return ()=>{
                clearTimeout(timer);
            }
        },[dispatch]
    );

    return (
        <Box style={{width: '100%', paddingTop: '50px'}}>
            This is Album Page
        </Box>
    );
};


export default Album;