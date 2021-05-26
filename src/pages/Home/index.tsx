import React from 'react';

// App  
import { useAppDispatch } from 'app/hooks'
import { setSuccess, progressWaiting } from 'app/slices/progressSlice';
import { setClose, setOpen } from 'app/slices/controlSlice';

// Package 
import { useLocation } from 'react-router';
import { Box } from '@material-ui/core';

// FireBase 
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

    const db = firebase.firestore();

    // Configure FirebaseUI.
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
        // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (authResult: any) => {
                const remember_firebase_account = {
                    id: authResult.user.uid,
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
    }

    React.useEffect(
        ()=>{
            const newData: {id: string, data: any}[] = [];
            const getDataBanner = async ()=>{
                await db.collection("music").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let item = {
                            id: doc.id,
                            data:  doc.data()
                        }
                        newData.push(item);
                    });
                });
                if(isMountedRef.current){
                    // action to progress store 
                    dispatch(setSuccess());
    
                    // set data have been fetched
                    setData(newData);
                }
            }
            getDataBanner();

            return ()=>{
                isMountedRef.current= false;
            };
        },[dispatch, location.pathname, db]
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