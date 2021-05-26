import React from 'react';
import './App.css';

// package 
import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/styles";
import {
	CssBaseline,
	createMuiTheme,
	Box,
	ThemeOptions,
} from "@material-ui/core";

// FireBase
import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

// app
import { useAppSelector } from 'app/hooks'
import { lightTheme, darkTheme } from './theme';

// components 
import CustomProgress from 'components/CustomProgress';
import CustomControl from 'components/CustomControl';
import SideBar from 'components/SideBar';

// Routes
import pages from './pages/routes';
import BottomNavigationApp from 'components/BottomNavigation';




// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN+".firebaseapp.com",
  databaseURL: "https://"+process.env.REACT_APP_FIREBASE_AUTH_DOMAIN+".firebaseapp.com",
  projectId: 'mymp3-be903',
  // ...
};

firebase.initializeApp(config);


const App: React.FC = ()=>{

	const darkMode = useAppSelector(state => state.darkMode.value);
	const [appTheme, setAppTheme] = React.useState<ThemeOptions >(createMuiTheme(darkTheme));

	React.useEffect(()=>{
		darkMode ? setAppTheme(createMuiTheme(darkTheme)): setAppTheme(createMuiTheme(lightTheme));
	},[darkMode]);

	// const [isSignedIn, setIsSignedIn] = React.useState(false); // Local signed-in state.

	// Listen to the Firebase Auth state and set the local state.
	React.useEffect(() => {
		console.log("No Warning here. Thanks");
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
		//   setIsSignedIn(!!user);
			if(!user){
				return;
			}
			
		});
		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	  }, []);

	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline />
			<Box className="App">
				<BrowserRouter> 
					<CustomProgress />
					<CustomControl />
					<SideBar />
					<BottomNavigationApp/>
					<Box className='App-Content'>
						<React.Suspense fallback={(<></>)}>
								<Switch>
									<Redirect exact to='/' from='/OverView'/>
									{pages && pages.map((page, index)=>(
										<Route key={index} exact={page.exact} path={page.path} component={page.component}/>
									))}
								</Switch>
						</React.Suspense>
					</Box>
				</BrowserRouter>
			</Box>
		</ThemeProvider>
	);
}

export default App;
