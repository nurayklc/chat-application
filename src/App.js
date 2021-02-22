import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './containers/HomePage/home';
import LoginPage from './containers/LoginPage/login';
import RegisterPage from './containers/RegisterPage/register'
import { isLoggedInUser } from './actions/auth.action';
import { useDispatch, useSelector} from 'react-redux';
import './App.css';
import PrivateRoute from './components/privateRoute';
import Webcam from './containers/HomePage/webcams'
function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!auth.authenticated){
      dispatch(isLoggedInUser())
    }
 }, []);

  return (
    <div className="App">
      <Router>
        {/* kullanıcı home sadece giriş yaparken erişebilir.*/}
        <PrivateRoute path="/" exact component={HomePage} />        
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} /> 
        <PrivateRoute path="/webcam" component={Webcam} /> 
      </Router>
    </div>
  );
}

export default App;
