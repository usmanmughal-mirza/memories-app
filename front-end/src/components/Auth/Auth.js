import { Avatar, Button, Container, Grid, Icon, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import LockOutlined from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import Input from './Input'
import {GoogleLogin} from 'react-google-login'
// import {} from "@material-ui/icons/" 
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router';
import {signin,signup} from '../../actions/auth'

const initialValues={firstName:'',lastName:'',email:'',password:'',confirmPassword:'' };

const Auth = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [isSignup,setSignUp]=useState(false);
    const [formData,setFormData]=useState(initialValues);
    const classes=useStyles();
    const dispatch=useDispatch()
    const history=useHistory();
     

    const submitHandler =(e) =>{
e.preventDefault();

if(isSignup){
dispatch(signup(formData,history))
}else{
    dispatch(signin(formData,history))
}
    }


    const handleChange =(e) =>{
const {name,value} = e.target;

setFormData({
    ...formData,
    [name]:value
})
    }
    const switchMode =() =>{
setSignUp( (preState) => !preState)
    }
   const handleShowPassword =() =>{
       setShowPassword( (preState) =>!preState )
   } 
   const googleSuccess =async (res) =>{
       const result=res?.profileObj;
       const token=res?.tokenId;

       try {
       dispatch({type:"AUTH",data:{result,token} })    
       history.push("/")

       } catch (error) {
        console.log(error);
       }


   }
 const  googleFailure =() =>{
console.log('google sign in fail');
 }
    return (
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
            
               <Avatar className={classes.avatar}>
                 <LockOutlined />
               </Avatar>

       <Typography variant="h5">
           {isSignup ? 'Sign Up':'Sign In'} 
       </Typography>        
       
         <form className={classes.form} onSubmit={submitHandler} >
<Grid container spacing={2}>
{
    isSignup && (
        <>
<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
<Input name="lastName" label="Last Name" handleChange={handleChange}  half />
        </>
    )
}
<Input name="email" label="Email" handleChange={handleChange} type="email" />
<Input name="password" label="Password" handleChange={handleChange}  type={showPassword ? "text":"password"} handleShowPassword={handleShowPassword} />
{
    isSignup && (
        <>
<Input  name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
        </>
    )
}
</Grid>

<Button variant="contained" color="primary" fullWidth  
className={classes.submit} type="submit"> 
{isSignup ? 'Sign Up':'Sign In'}
</Button>
<GoogleLogin clientId="937586277696-fcuvfcia7g43a8l0so0mkqd0hurggfho.apps.googleusercontent.com" 
render={ (renderProps) =>(
    <Button className={classes.googleButton}
     fullWidth color="primary" 
     onClick={renderProps.onClick}
     disabled={renderProps.disabled} 
     startIcon={<Icon /> } variant="contained" >
Google Sign In
     </Button>     
)}
onSuccess={googleSuccess}
onFailure={googleFailure}
cookiePolicy="single_host_origin"
/>
<Grid container justifyContent="flex-end">
    <Grid item >
        <Button onClick={switchMode}>
            {isSignup ? 'Already have an account ? Sign In':'Dont have an account ? Sign Up'}
        </Button>
    </Grid>
</Grid>
         </form>
           </Paper>

       </Container>
    )
}

export default Auth
