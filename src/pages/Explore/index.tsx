import { Box } from '@material-ui/core';
import React from 'react';
import {useAppDispatch} from 'app/hooks'
import { setSuccess } from 'app/slices/progressSlice';

interface ExploreProps{
}

const defaultProps : ExploreProps = {
}

const Explore:React.FC<ExploreProps> =(props) :React.ReactElement => {

    const dispatch = useAppDispatch();

    React.useEffect(
        ()=>{
            const timer = setTimeout(()=>{
                const actionSuccess = setSuccess();
                dispatch(actionSuccess);
            }, 1000);
            return ()=>{
                clearTimeout(timer);
            }
        },[dispatch]
    );

    return (
        <Box style={{width: '100%', paddingTop: '50px'}}>
            This is Explore page
        </Box>
    );
};

Explore.defaultProps = defaultProps;

export default Explore;