import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Link} from 'react-router-dom';
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
        height: '100%',
        position: 'relative',
        width: 250,
        top: 0,
        left: 0,
        padding: '30px 0',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        paddingBottom: 150,
    },
    content: {
        // border: '1px solid red',
        width: 200,
        height: '100%',
        '& .group':{
            color: 'white',
            textAlign: 'start',
            // border: '1px solid blue',
            margin: '40px 0',
            '& .items':{
                fontSize: 15,
                marginTop: 20,

                '& .item':{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '10px 0',
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
    {icon: HomeIcon, title: 'Home'},
    {icon: ExploreIcon, title: 'Explore'}
];

const library = [
    {icon: ExploreIcon, title: 'For you'},
    {icon: RepeatIcon, title: 'Recent'},
    {icon: FavoriteIcon, title: 'Favorite'},
    {icon: LibraryMusicIcon, title: 'Album'},
    {icon: MicIcon, title: 'Atists'}
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

    return (
        <Box className={classes.root}>
            <Box className={classes.content}>
                <Typography variant="h5" color="inherit" >
                    <Link to='/' >MyMp3</Link>
                </Typography>
                <Box className='group'>
                    <Typography variant='h6' color='textSecondary'>
                        Menu
                    </Typography>
                    <Box className='items'>
                        {menu.length===0 || 
                            menu.map((item, index)=>(
                                <Box className='item' key={index}>
                                    <Box component={item.icon}/>
                                    <Link to=''>{item.title}</Link>
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
                                <Box className='item' key={index}>
                                    <Box component={item.icon}/>
                                    <Link to=''>{item.title}</Link>
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
                                    <Link to=''>{item.title}</Link>
                                </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default React.memo(SideBar);