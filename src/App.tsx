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

// app
import { useAppSelector } from 'app/hooks'
import { lightTheme, darkTheme } from './theme';

// components 
import CustomProgress from 'components/CustomProgress';
import CustomControl from 'components/CustomControl';
import SideBar from 'components/SideBar';

// Routes
import pages from './pages/routes';

const App: React.FC = ()=>{

	const darkMode = useAppSelector(state => state.darkMode.value);
	const [appTheme, setAppTheme] = React.useState<ThemeOptions >(createMuiTheme(darkTheme));

	React.useEffect(()=>{
		darkMode ? setAppTheme(createMuiTheme(darkTheme)): setAppTheme(createMuiTheme(lightTheme));
	},[darkMode]);

	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline />
			<Box className="App">
				<BrowserRouter> 
					<CustomProgress />
					<CustomControl />
					<SideBar />
					<Box style={{width: '100%'}}>
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
