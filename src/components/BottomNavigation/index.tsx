import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

interface Props{
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        position:  'fixed',
        bottom: 0,
        zIndex: 15,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
        '& .MuiBottomNavigationAction-root.Mui-selected':{
            color: '#FF3200',
        }
      },
  }),
);

const BottomNavigationApp:React.FC<Props> =(props):React.ReactElement => {

    const classes = useStyles();
    const  history = useHistory();
    
    const [value, setValue] = React.useState(history.location.pathname);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                history.push(newValue);
                console.log(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Home" value='/home' icon={<RestoreIcon />} />
            <BottomNavigationAction label="Explore" value='/explore' icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Library" value='/library' icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Play List" value='/play-list' icon={<LocationOnIcon />} />
        </BottomNavigation>
    );

};

export default BottomNavigationApp;