import { Box } from '@material-ui/core';
import SideBar from 'components/SideBar';
import React from 'react';
import {useAppDispatch} from 'app/hooks'
import { setSuccess } from 'app/slices/progressSlice';
import { setOpen } from 'app/slices/controlSlice';
import axios from 'axios';


interface HomeProps{
}

const Home:React.FC<HomeProps> =() :React.ReactElement => {

    const dispatch = useAppDispatch();

      React.useEffect(
        ()=>{
            const fetchBase64 = async ()=>{
                let response = await axios.get(
                    "http://localhost/MyMp3/"
                );
                let res = await response.data;
                const action = setOpen(res);
                const actionSuccess = setSuccess();
                dispatch(actionSuccess);
		        dispatch(action);
            }
            fetchBase64();
        },[]
    );


    return (
        <Box style={{height: '150vh'}}>
            <SideBar />

        </Box>
    );
};

export default Home;