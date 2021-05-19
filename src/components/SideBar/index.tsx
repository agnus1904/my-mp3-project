import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import {
    Home as HomeIcon,
    Explore as ExploreIcon,
    Repeat as RepeatIcon,
    Favorite as FavoriteIcon,
    LibraryMusic as LibraryMusicIcon,
    Mic as MicIcon,
    MusicNote as MusicNoteIcon,
    AddBoxOutlined as AddBoxOutlinedIcon,
} from '@material-ui/icons';

interface SideBarProps{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: 250,
        top: 0,
        left: 0,
        position: 'absolute',
        padding: '30px 0',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        paddingBottom: 150,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    content: {
        width: '100%',
        height: '100%',
        '& h5': {
            textAlign: 'center',
        },
        '& .group':{
            color: 'white',
            textAlign: 'start',
            paddingLeft: 30,
            margin: '20px 0',
            '& .items':{
                fontSize: 15,
                marginTop: 20,
                '& .item':{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px 0',
                    position: 'relative',
                    '& span': {
                        height: '0%',
                        position: 'absolute',
                        right: 0,
                        width: 2,
                        backgroundColor: '#FF3200',
                        transition: 'height 300ms ease-in-out',
                    },
                    '&.item-picked': {
                        color: '#FF3200',
                        '& span':{
                            height: '100%',
                        },
                        '& a':{
                            color: '#FF3200',
                        }
                    },
                    '& svg':{
                        marginRight: 10,
                        marginBottom: 4,
                        width: '1.1rem',
                        height: '1.1rem',
                    }
                }
            }
        }
    },
  }),
);

const menu = [
    {icon: HomeIcon, title: 'Home', path: '/home'},
    {icon: ExploreIcon, title: 'Explore', path: '/explore'}
];

const library = [
    {icon: ExploreIcon, title: 'For you', path: '/for-you'},
    {icon: RepeatIcon, title: 'Recent', path: '/reccent'},
    {icon: FavoriteIcon, title: 'Favorite', path: '/favorite'},
    {icon: LibraryMusicIcon, title: 'Album', path: '/album'},
    {icon: MicIcon, title: 'Atists', path: '/atists'}
]

const playList = [
    {icon: AddBoxOutlinedIcon, title: 'Submit new'},
    {icon: MusicNoteIcon, title: 'Adrenaline workout'},
    {icon: MusicNoteIcon, title: 'For running'},
    {icon: MusicNoteIcon, title: 'Crazy morning'},
    {icon: MusicNoteIcon, title: 'Autumn Leaves'},
]

const SideBar:React.FC<SideBarProps> =(props) :React.ReactElement => {

    const classes = useStyles();
    const location = useLocation();

    if(location.pathname==='/'){
        return(
            <></>
        )
    }
    return (
        <Box className={classes.root}>
            <Box className={classes.content}>
                <Typography variant="h5" color="inherit" >
                    <Link to='/' style={{fontFamily: 'Zen Dots'}}>MyMp3</Link>
                </Typography>
                <Box className='group'>
                    <Typography variant='h6' color='textSecondary'>
                        Menu
                    </Typography>
                    <Box className='items'>
                        {menu.length===0 || 
                            menu.map((item, index)=>(
                                <Box 
                                    className={clsx('item' , {
                                        ['item-picked']: location.pathname === item.path,
                                    })}
                                    key={index}
                                >
                                    <Box component={item.icon}/>
                                    <Link to={item.path}>{item.title}</Link>
                                    <span />
                                </Box>
                        ))}
                    </Box>
                </Box>
                <Box className='group'>
                    <Typography variant='h6' color='textSecondary'>
                        Library
                    </Typography>
                    <Box className='items'>
                        {library.length===0 ||
                            library.map((item, index)=>(
                                <Box
                                    className={clsx('item' , {
                                        ['item-picked']: location.pathname === item.path,
                                    })}
                                    key={index}
                                >
                                    <Box component={item.icon}/>
                                    <Link to={item.path}>{item.title}</Link>
                                    <span />
                                </Box>
                        ))}
                    </Box>
                </Box>
                <Box className='group'>
                    <Typography variant='h6' color='textSecondary'>
                        Playlist
                    </Typography>
                    <Box className='items'>
                        {playList.length===0 ||
                            playList.map((item, index)=>(
                                <Box className='item' key={index}>
                                    <Box component={item.icon}/>
                                    <Typography variant='subtitle1'>{item.title}</Typography>
                                </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default React.memo(SideBar);