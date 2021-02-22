import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import {Provider} from 'react-redux';
import store from './store/store'

 // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS2ngQ4FNoYuE6Yc981ssFHKF9gT3FGvw",
  authDomain: "chat-application-3faca.firebaseapp.com",
  databaseURL: "https://chat-application-3faca-default-rtdb.firebaseio.com",
  projectId: "chat-application-3faca",
  storageBucket: "chat-application-3faca.appspot.com",
  messagingSenderId: "345069008303",
  appId: "1:345069008303:web:5caad13b389e5f9d5f2b5a",
  measurementId: "G-E8XYJKZ3DG"
};
firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
