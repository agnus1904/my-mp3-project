import { Box, 
    Typography,
    // Switch as MaterialSwitch,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { setClose, setWaiting, setSuccess, setSuccessfalse } from 'app/slices/progressSlice';
// import { changeTheme } from 'app/slices/themeSilce';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

interface HeaderProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        height: 80,
        backgroundColor: 'rgba(255,255,255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 11,
    },
    appBar:{
        margin: 0,
        height: '100%',
        maxWidth: 1280,
        backgroundColor: 'rgba(0,0,0,0)',
        boxShadow: 'none',
        '& .MuiToolbar-root':{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menu: {
        margin: '0 10px',
        display: 'flex',
        '& a':{
            margin: '0 10px'
        }
    },
    menuLeft:{
        borderRight: '2px solid #EEE'
    },
    menuRight:{

    }
  }),
);

const Header:React.FC<HeaderProps> =(props) :React.ReactElement => {
    const classes = useStyles();
    const darkMode = useAppSelector(state => state.darkMode.value);
    const progresser = useAppSelector(state => state.progress);
    const dispatch = useAppDispatch();
    const history = useHistory();

    // // console.log('header render');
    // const changeDarkTheme = ()=>{
    //     const action = changeTheme(!darkMode);
    //     dispatch(action);
    // }

    // const setWaitingClick = ()=>{
    //     const action = progresser.waiting ? setClose() : setWaiting(history.location.pathname);
    //     dispatch(action);
    // }

    // const setSuccessClick = ()=>{
    //     const action = progresser.success ? setSuccessfalse() : setSuccess();
    //     dispatch(action);
    // }

    return (
        <Box className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h5" color="inherit" >
                        <Link to='' style={{fontFamily: 'Zen Dots'}}>MyMp3</Link>
                    </Typography>
                    <Typography variant='subtitle1' color='textPrimary'>
                        <Box className={classes.menu}>
                                <Box className={classes.menuLeft}>
                                    <Link to='#'>Upgrade</Link>
                                    <Link to='#'>Download</Link>
                                    <Link to='#'>Help</Link>
                                </Box>
                                <Box className={classes.menuRight}>
                                    <Link to='/home'>Home</Link>
                                    <Link to='/explore'>Explore</Link>
                                </Box>
                        </Box>
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* <Box
                style={{
                    position: 'fixed',
                    left: 0,
                    bottom: 0
                }}
            >
                <MaterialSwitch
                    checked={darkMode}
                    onChange={changeDarkTheme}
                />
                <MaterialSwitch
                    checked={progresser.waiting}
                    onChange={setWaitingClick}
                />
                <MaterialSwitch
                    checked={progresser.success}
                    onChange={setSuccessClick}
                />
            </Box> */}
        </Box>
    );
};

export default Header;