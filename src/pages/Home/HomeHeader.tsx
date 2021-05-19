import React from 'react';
import { Box, Button, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import CustomInput from 'components/CustomInput';
import { Formik } from 'formik';
import SearchIcon from '@material-ui/icons/Search';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';

import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useAppSelector } from 'app/hooks';

import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

// FireBase 
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import firebase from 'firebase';

interface MyFormValues {
    name: String
}

interface Props{
    initialValue: MyFormValues,
    onSubmit: (values: MyFormValues)=> void,
    uiConfig: any,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    form:{
        display:  'flex',
        justifyContent: 'space-between'
    },
    account:{
        display: 'flex',
        alignItems: 'center',
        zIndex: 5,
        [theme.breakpoints.down('sm')]: {
            margin: '10px 0 0 0',
        },
        '& .avatar':{
            width: 30,
            height: 30,
            backgroundColor: '#444',
            borderRadius: '50%',
            marginRight: 5,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        '& .icon':{
            cursor: 'pointer',
            height: '100%',
            textTransform: 'none',
            '& .account-name':{
                minWidth: 100,
            },
            '& .login-button': {

            },
        },
    }
  }),
);

const HomeHeader:React.FC<Props> =(props):React.ReactElement => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const rememberAccount = useAppSelector(state=>state.account);
    const [ showSidebar, setShowSidebar ] = React.useState(false);

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const classes= useStyles();
    const {
        initialValue,
        onSubmit
    } = props;

    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    React.useEffect(()=>{
        rememberAccount.email &&  setAnchorEl(null);
    },[rememberAccount.email]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={classes.root}>
            <Grid container >
                <Grid container item xs={12} md={6} className={classes.form}>
                    <Formik 
                        initialValues={initialValue}
                        onSubmit={onSubmit}
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
                </Grid>
                <Grid container item xs={12} md={6} justify="flex-end">
                    <Box className={classes.account}>
                        <Box className='avatar' 
                            style={{backgroundImage: rememberAccount.photo ? 
                                `url(${rememberAccount.photo})` : 
                                undefined
                            }}
                        />
                        <Button
                                className='icon' 
                                aria-controls="fade-menu" 
                                aria-haspopup="true"
                                onClick={handleClick}

                                // onClick={handleToggle}
                                // ref={anchorRef}
                                // aria-controls={open ? 'menu-list-grow' : undefined}
                                // aria-haspopup="true"
                            >
                                <Typography variant='subtitle1' className='account-name'>
                                    {rememberAccount.name}
                                </Typography>
                                {
                                    open ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)
                                }
                        </Button>
                        <Menu
                            id="fade-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                            <MenuItem onClick={handleClose}>
                                <StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={firebase.auth()} />
                            </MenuItem>
                        </Menu>
                        {/* <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper style={{left:'-45px'}}>
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
                        </Popper> */}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomeHeader;


