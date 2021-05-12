import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

interface BannerProps{
}

const useStyle = makeStyles(theme=>({
    root:{
    }
}));

const Banner:React.FC<BannerProps> =(props) :React.ReactElement => {
    const classes = useStyle();
    // const {} = props;
    return (
        <Box className={classes.root}>
            Banner
        </Box>
    );
};

export default Banner;