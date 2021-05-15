import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface Props{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
  }),
);

const CustomSelect:React.FC<Props> =(props):React.ReactElement =>{

    return (
        <Box>
            This is CustomSelect Page
        </Box>
    );
};


export default CustomSelect;