import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CustomInput from 'components/CustomInput';
import { Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';

interface MyFormValues {
    name: String
}

interface Props{
    initialValue: MyFormValues,
    onSubmit: (values: MyFormValues)=> void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    form:{

    },
    account:{

    }
  }),
);

const HomeHeader:React.FC<Props> =(props):React.ReactElement => {

    const classes= useStyles();
    const {
        initialValue,
        onSubmit
    } = props;

    return (
        <Box className={classes.root}>
                <Formik 
                    initialValues={initialValue}
                    onSubmit={onSubmit}
                    className={classes.form}
                >
                    {({values, handleChange, handleBlur, handleSubmit})=>(
                        <form onSubmit={handleSubmit}>
                            <CustomInput 
                                type='input'
                                name='name'
                                placeholder='Search for music'
                                start={SearchIcon}
                            />
                        </form>
                    )}
                </Formik>
                <Box className={classes.account}>

                </Box>
            </Box>
    );
};

export default HomeHeader;
