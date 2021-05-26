import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FavoriteIcon from '@material-ui/icons/Favorite';

interface Props{
    list: [any],
    fetchMusic: (id: string) =>void,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .banner':{
                height: 200,
                '& .slick-prev':{
                    right: 20,
                    top: 130,
                    zIndex: 1,
                    left: 'unset',
                    transform: 'rotate(90deg)',
                },
                '& .slick-next':{
                    right: 20,
                    top: 160,
                    zIndex: 1,
                    left: 'unset',
                    transform: 'rotate(90deg)',
                },
                '& .slick-dots':{
                    display: 'flex !important',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    bottom: 90,
                    right: 15,
                    '& li button:before':{
                        fontSize: 10,
                        color: 'white',
                    },
                },
                '& .slick-list':{
                    height: '200 !important',
                    borderRadius: 10,
                    '& .slick-track':{
                        height: 200,
                        '& .slick-slide':{
                            height: 200,
                            '& .slider-img':{
                                width: '100%',
                                height: 198,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative',
                                '& .overplay':{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0,0,0,0.4)',
                                },
                                '& .content': {
                                    maxWidth: '90%',
                                    position:'absolute',
                                    width: 'fit-content',
                                    height: '100%',
                                    padding: '10px 15px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    color: 'white',
                                    [theme.breakpoints.down('xs')]: {
                                        padding: '15px 15px',
                                    },
                                    '& .big-button':{
                                        borderRadius: 20,
                                        marginRight: 15,
                                        padding: '7px 35px',
                                        [theme.breakpoints.down('xs')]: {
                                            padding: '5px 30px',
                                            marginBottom: 5,
                                        },
                                    },
                                    '& .small-button': {
                                        width: 40,
                                        minWidth: 0,
                                        height: 40,
                                        borderRadius: '50%',
                                        [theme.breakpoints.down('xs')]: {
                                            width: 35,
                                            height: 35,
                                            marginBottom: 5,
                                        },
                                    },
                                },
                            }
                        }
                    }
                }
            }
        },
    }),
);

const CustomSlide: React.FC<{item: any, fetchMusic: (id: string)=>void}> = (props):React.ReactElement =>{
    const { item , fetchMusic, ...rests} = props;
    return (
      <div {...rests}>
        <Box 
          className='slider-img'
          style={{backgroundImage: `url(${item.data.music_banner_url})`}}
          >
              <Box className='overplay' />
              <Box className='content'>
                  <Box mb={1} mt={1}>
                      <Typography variant='subtitle1'>Trending now</Typography>
                  </Box>
                  <Box >
                      <Typography variant='h5' >{item.data.music_name}</Typography>
                      <Box mt={1}/>
                      <Typography variant='subtitle1' >Get happy with today's dose of feel-good country songs</Typography>
                  </Box>
                  <Box >
                      <Button variant='outlined' className='big-button' 
                          onClick={()=>fetchMusic(item)}
                      >Listen Now</Button>
                      <Button variant='outlined' className='small-button'><FavoriteIcon fontSize='small' /></Button>
                  </Box>
              </Box>
          </Box>
      </div>
    );
}

const HomeBanner:React.FC<Props> =(props):React.ReactElement => {

    const classes = useStyles();
    const { list, fetchMusic } = props;

    const settings = {
        dots: true,
        className: "banner",
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    
    return (
        <Box className={classes.root}>
            <Slider {...settings}>
                {list.map((item, index)=>(
                    <CustomSlide 
                        key={item.id}
                        fetchMusic={fetchMusic}
                        item={item}
                    />
                ))}
            </Slider>
        </Box>
    );
};

export default HomeBanner;