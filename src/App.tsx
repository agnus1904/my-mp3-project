import React from 'react';
import './App.css';

// package 
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/styles";
import {
	CssBaseline,
	createMuiTheme,
	Box,
	ThemeOptions,
} from "@material-ui/core";

// app
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setWaiting } from 'app/slices/progressSlice';
import { lightTheme, darkTheme } from './theme';
import CustomProgress from 'components/CustomProgress';
import CustomControl from 'components/CustomControl';

// Routes
import pages from './pages/routes';

const App: React.FC = ()=>{
	
	console.log('app render');
	const darkMode = useAppSelector(state => state.darkMode.value);
	const darkThemeApp: ThemeOptions = createMuiTheme(darkTheme);
	const lightThemeApp: ThemeOptions = createMuiTheme(lightTheme);
	const dispatch = useAppDispatch();
	const history = useHistory();

	React.useEffect(() => { 
		return history.listen((location) => { 
			if(location.pathname != '/' ){
				const action1 = setWaiting();
            	dispatch(action1);
			}
		   console.log(location.pathname, 'app render');
		}) 
	 }, [history])

	return (
		<ThemeProvider theme={darkMode ? darkThemeApp : lightThemeApp}>
			<CssBaseline />
			<Box className="App">
				<CustomProgress />
				<CustomControl />
				<React.Suspense fallback={(<></>)}>
					<Switch>
						<Redirect exact to='/' from='/OverView'/>
						{pages && pages.map((page, index)=>(
							<Route key={index} exact={page.exact} path={page.path} component={page.component}/>
						))}
					</Switch>
				</React.Suspense>
			</Box>
		</ThemeProvider>
	);
}

export default App;
