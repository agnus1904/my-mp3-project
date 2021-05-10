import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { store } from 'app/store';

import { BrowserRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Root: React.FC = () => { 
   const history = useHistory() 

  //  React.useEffect(() => {
  //     return history.listen((location) => { 
  //        console.log(`You changed the page to: ${location.pathname}`) 
  //     }) 
  //  },[history]) 

   return ( 
      <App /> 
   ) 
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> 
        <Root /> 
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
