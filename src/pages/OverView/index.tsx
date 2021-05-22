import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Header from 'components/Header';
import React from 'react';
import images from 'constants/images'
import { Link } from 'react-router-dom';
interface OverViewProps{
}

const defaultProps : OverViewProps = {
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        height: '100vh',
        backgroundImage: `url('${images.OVER_VIEW_BG_2}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 120px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 90px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0 40px',
        },
    },
    overPlay: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    content:{
        maxWidth: 1280,
        // paddingTop: 80,
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    textBox:{
        textAlign: 'start',
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            '& h1':{
                fontSize: 80,
                lineHeight: '100px',
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& h1':{
                fontSize: 60,
                lineHeight: '70px',
            }
        },
        '& .MuiButtonBase-root':{
            backgroundColor: '#da5100',
            color: 'white',
            width: 180,
            height: 40,
            borderRadius: 25,
        }
    },
  }),
);

const OverView:React.FC<OverViewProps> =(props) :React.ReactElement => {
    const classes = useStyles();

    return (
        <Box
            className={classes.root}
        >
            <Header /><Box className={classes.overPlay} />
            
            <Box className={classes.content}>
                <Box className={classes.textBox}>
                    <Typography variant='h1' >
                        WHERE<br/>THE MUCSIC<br/>MATTERS
                    </Typography>
                    <Typography variant='h6' >
                        We are live and have a millions of your favorite songs <br/>
                        just in a place
                    </Typography>
                    <br/>
                    <Link to='/home' >
                        <Button variant='contained'>
                            <Typography variant='subtitle2' >
                                Get Start
                            </Typography>
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

OverView.defaultProps = defaultProps;

export default OverView;