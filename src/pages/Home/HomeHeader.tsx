import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CustomInput from 'components/CustomInput';
import { Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
        display: 'flex',
        alignItems: 'center',
        '& .avatar':{
            width: 30,
            height: 30,
            backgroundColor: '#444',
            borderRadius: '50%',
            marginRight: 5,
        },
        '& .icon':{
            minWidth: 0,
            cursor: 'pointer',
            height: '100%',
            textTransform: 'none',
        },
    }
  }),
);

const HomeHeader:React.FC<Props> =(props):React.ReactElement => {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
          return;
        }
    
        setOpen(false);
      };
    
      function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
      }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(open);

      React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current!.focus();
        }
        prevOpen.current = open;
      }, [open]);

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
                    <Box className='avatar'/>
                    
                    <Button
                            className='icon' 
                            onClick={handleToggle}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                        >
                            <Typography variant='subtitle1'>
                                Ha Anh Khoa
                            </Typography>
                            {
                                open ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)
                            }
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                </Box>
            </Box>
    );
};

export default HomeHeader;


