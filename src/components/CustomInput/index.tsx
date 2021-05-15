import React from 'react';
import { FormControl, TextField, InputAdornment, SvgIcon  } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FieldAttributes, useField } from 'formik';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

interface Props{
    start?: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    end?: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    input: {
        backgroundColor: '#333',
        padding: '0 15px',
        borderRadius: 30,
    }
  }),
);

const CustomInput:React.FC<FieldAttributes<Props>> =({placeholder,... props}):React.ReactElement =>{

    const classes = useStyles()
    const [field, meta] = useField<Props>(props);

    const errorText = meta.error && meta.touched ? meta.error : '';
    return(
        <FormControl className={classes.root}>
            <TextField 
                className={classes.input}
                placeholder={placeholder}
                {...field}
                helperText={errorText}
                InputProps={{
                    disableUnderline:true,
                    startAdornment: props.start===undefined ? <></> : 
                        <InputAdornment position="start"><SvgIcon component={props.start} /></InputAdornment>,
                    endAdornment: props.end===undefined ? <></> : 
                        <InputAdornment position="end"><SvgIcon component={props.end} /></InputAdornment>
                }}
            />
        </FormControl>
    );
};


export default CustomInput;