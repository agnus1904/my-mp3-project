import { Box } from '@material-ui/core';
import React from 'react';

interface NotFoundProps{
}

const defaultProps : NotFoundProps = {
}

const NotFound:React.FC<NotFoundProps> =(props) :React.ReactElement => {

    // const {} = props;

    return (
        <Box style={{width: '100%'}}>
            This is not Found page
        </Box>
    );
};

NotFound.defaultProps = defaultProps;

export default NotFound;