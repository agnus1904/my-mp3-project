import { Box } from '@material-ui/core';
import React from 'react';
import {useAppDispatch} from 'app/hooks'
import { setSuccess } from 'app/slices/progressSlice';
import { setOpen } from 'app/slices/controlSlice';
import axios from 'axios';
import HomeHeader from './HomeHeader';
import musicApi from 'api/musicApi';

interface MyFormValues {
    name: String
}

interface HomeProps{
}

const Home:React.FC<HomeProps> =() :React.ReactElement => {

    const dispatch = useAppDispatch();
    const [data, setData] = React.useState<boolean>(false);

    const initialValue = {name: ''};
    const onSubmit= (values: MyFormValues)=>{
        console.log('onsubmit', values);
    }

    React.useEffect(
        ()=>{
            let isMounted = true;
            const fetchBase64 = async ()=>{
                try {
                    const response = await musicApi.get('1');
                    if(isMounted){
                        const action = setOpen(response.data);
                        const actionSuccess = setSuccess();
                        dispatch(actionSuccess);
                        dispatch(action);
                        setData(true);
                    }
                }catch(error) {
                    console.log('error', error);
                }
            }
            fetchBase64();
            return ()=>{
                isMounted= false;
            };
        },[]
    );

    React.useEffect(()=>{
        if(data){
            const actionSuccess = setSuccess();
            dispatch(actionSuccess);
        }
    },[data]);

    return (
        <Box style={{width: '100%', padding: '30px 20px'}}>
            <HomeHeader 
                initialValue={initialValue}
                onSubmit={onSubmit}
            />
        </Box>
    );
};

export default Home;