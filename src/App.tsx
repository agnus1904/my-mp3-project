import React from 'react';
import './App.css';

// package 
import { Switch, Redirect, Route, useHistory, useLocation} from 'react-router-dom';

import { setWaiting } from 'app/slices/progressSlice';

import { ThemeProvider} from "@material-ui/styles";
import {
	CssBaseline,
	createMuiTheme,
	Box,
	ThemeOptions,
} from "@material-ui/core";

// app
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { lightTheme, darkTheme } from './theme';
import CustomProgress from 'components/CustomProgress';
import CustomControl from 'components/CustomControl';



// pages 
import OverView from './pages/OverView';
import Home from './pages/Home';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';

// lazy load Pages
// const OverView: React.FC = React.lazy(()=> import('./pages/OverView'));
// const Home: React.FC  = React.lazy(()=> import('./pages/Home'));
// const Explore: React.FC  = React.lazy(()=> import('./pages/Explore'));
// const NotFound: React.FC  = React.lazy(()=> import('./pages/NotFound'));

const App: React.FC = ()=>{
	
	console.log('app render');
	const darkMode = useAppSelector(state => state.darkMode.value);
	const darkThemeApp: ThemeOptions = createMuiTheme(darkTheme);
	const lightThemeApp: ThemeOptions = createMuiTheme(lightTheme);
	const dispatch = useAppDispatch();
	const history = useHistory();
	const location = useLocation();

	// React.useEffect(
	// 	()=>{
	// 		console.log(location.pathname, ' test ')
	// 	}, [location.pathname]
	// );

	React.useEffect(() => { 
		return history.listen((location) => { 
			if(location.pathname != '/' )
			{
				const action1 = setWaiting();
            	dispatch(action1);
			}
		   console.log(location.pathname, 'app render');
		}) 
	 }, [history])

	// React.useEffect(() => {
	// 	console.log('Location changed');
	// }, [location]);

	return (
		<ThemeProvider theme={darkMode ? darkThemeApp : lightThemeApp}>
			<CssBaseline />
			<Box className="App">
				<CustomProgress />
				<CustomControl />
				{/* <BrowserRouter> */}
					<Switch>
						<Redirect exact to='/' from='/OverView'/>

						<Route exact path='/' component={OverView} />
						<Route exact path='/home' component={Home} />
						<Route exact path='/explore' component={Explore} />

						<Route component={NotFound} />
					</Switch>
				{/* </BrowserRouter> */}
			</Box>
		</ThemeProvider>
	);
}

export default App;
