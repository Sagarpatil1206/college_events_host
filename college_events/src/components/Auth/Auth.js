import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {GoogleLogin} from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import './authcss.css'
import jwt_decode from 'jwt-decode'
import { AUTH } from '../../actions/actionTypes';
// import GoogleIcon from './GoogleIcon';
import {signup,signin} from '../../actions/authActions'

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

const Auth = () => {
  const [formData,setFormData] = useState(initialState)
  const [showPassword,setShowPassword] = useState(false);
  const [isSignUp,setSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if(isSignUp){
      dispatch(signup(formData,navigate));
    }else{
      dispatch(signin(formData,navigate));
    }
  }
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const switchMode = () => {
    setSignUp(!isSignUp);
    handleShowPassword(false);//as we pass through screens password visibility should be off
  }

  const googleSuccess = async(res) =>{
    const result = jwt_decode(res?.credential);
    const token = res?.credential;
    try {
      dispatch({type:AUTH , payload : {result , token}});
      navigate('/posts')
    } catch (error) {
      console.log(error);
    }
  }
  const googleError = (error) => {
    console.log("Google sign in unsuccessfull. "+error);
  }
  return (
    <div className='maindiv'>
    <Container component="main" maxWidth='xs' className='root'>
      <Paper className='paper' elevation={3} style={{padding:'16px'}}>
        <Avatar style={{backgroundColor:'#f83636',margin:'8px'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant='h5'>{isSignUp ? `Sign Up` : `Sign In`}</Typography>
        <form className='form' onSubmit={handleSubmit} style={{width:'100%'}}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half/>
                  <Input name='lastName' label="Last Name" handleChange={handleChange} half/>
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
            {
              isSignUp && 
              <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>
            }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' style={{ margin: '24px 0px 16px 0px'}}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleOAuthProvider style={{margin:'100px'}}>
          <GoogleLogin client_id='194974084529-b573d191ilvmt6s058rtqfmjd3uugo3b.apps.googleusercontent.com'
          onSuccess={googleSuccess} onFailure={googleError} cookiePolicy='single_host_origin'/>
          </GoogleOAuthProvider>

          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp ? 'Already have an account ? sign In' : `Don't have an account ? Sign Up`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
  );
};

export default Auth;

//xs = 6 takes half of grid
//spacing 1 = 8px