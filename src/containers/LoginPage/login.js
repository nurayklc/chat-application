import React, { useState } from 'react'
import Layout from '../../components/Layout/layout'
import Card from '../../components/UI/card/card';
import { signin } from '../../actions/auth.action';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import './login.css'

/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state =>state.auth);


const userLogin = (e) =>{
   e.preventDefault();

    if(email ===  "" && email !== email){
      alert("Lütfen e-posta giriniz.");
      return;
    }
    if(password === "" && password !== password){
      alert("Lütfen şifre giriniz.");
      return;
    }
    dispatch(signin({ email, password }));
}

if(auth.authenticated){
  return <Redirect to={`/`} />
}
  return(
    <Layout>
      <div className="loginContainer">
        <Card>
          <form onSubmit={userLogin} className="loginForm">
          <h3> Welcome, please login.</h3>
          <input 
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input 
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div>
              <button className="button">Login</button>
            </div>
          </form>
          </Card>
      </div>
    </Layout>
   )
 }

export default LoginPage