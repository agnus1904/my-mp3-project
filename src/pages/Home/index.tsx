import React from 'react';

// App  
import musicApi from 'api/musicApi';
import { useAppDispatch } from 'app/hooks'
import { setSuccess, setWaiting, progressWaiting } from 'app/slices/progressSlice';
import { setClose, setOpen } from 'app/slices/controlSlice';

// Package 
import { useLocation } from 'react-router';
import { Box } from '@material-ui/core';

// FireBase 
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

// Components 
import HomeHeader from './HomeHeader';
import HomeBanner from './HomeBanner';
import { addRememberAccount } from 'app/slices/accountSlice';

interface MyFormValues {
    name: String
}

interface HomeProps{
}



const Home:React.FC<HomeProps> =() :React.ReactElement => {

    const dispatch = useAppDispatch();
    const [data, setData] = React.useState<any>(null);
    const location = useLocation()
    const isMountedRef = React.useRef(true);

    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    //   signInSuccessUrl: '/home',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //   firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
        // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (authResult: any) => {
                const remember_firebase_account = {
                    name: authResult.user.displayName,
                    photo: authResult.user.photoURL,
                    email:  authResult.user.email,
                };
                const action = addRememberAccount(remember_firebase_account);
                dispatch(action);
                localStorage.setItem('remember_firebase_account', JSON.stringify(remember_firebase_account));
                return false
            },
        },
    };

    // Data of the form 
    const initialValue = {name: ''};
    const onSubmit= (values: MyFormValues)=>{
        console.log('onsubmit', values);
    }

    // function in banner 
    const fetchMusic = async (object: any)=>{
        
        // console.log(setClose,setOpen);

        const params = {
            path: location.pathname+object.music_url,
            actions: [
                {
                    action: setClose,
                    params: undefined
                },
                {
                    action: setOpen,
                    params: object,
                }
            ]
        }

        await dispatch(progressWaiting(params));

        // dispatch(setClose());
        
        // dispatch(setOpen(object));

        // action to progress store 
        // dispatch(setSuccess());
        // setTimeout(()=>dispatch(setSuccess()), 1000);
    }

    React.useEffect(
        ()=>{
            const fetchMusicBanner = async ()=>{
                isMountedRef.current = true;
                dispatch(setWaiting(location.pathname));
                try {
                    const response: any = await musicApi.getPageLimitLocal(1,4);
                    const res = await response.data;
                    if(isMountedRef.current){
                        // action to progress store 
                        dispatch(setSuccess());
        
                        // set data have been fetched
                        setData(res);
                    }
                }catch(error) {
                    console.log('error', error);
                }
            }
            fetchMusicBanner();
            return ()=>{
                isMountedRef.current= false;
            };
        },[dispatch, location.pathname]
    );

    React.useEffect(()=>{
        if(data){
            const actionSuccess = setSuccess();
            dispatch(actionSuccess);
        }
    },[data, dispatch]);

    return (
        <Box style={{width: '100%', maxWidth: '1000px'}}>
            <HomeHeader 
                initialValue={initialValue}
                onSubmit={onSubmit}
                uiConfig={uiConfig} 
            />
            <Box mb={3}/>
            {data && <HomeBanner 
                list={data}
                fetchMusic={fetchMusic}
            />}
            
             {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
        </Box>
    );
};

export default Home;