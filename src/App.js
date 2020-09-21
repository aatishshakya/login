import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import logo from './logo.png';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let readyToSubmit = true;
    if (inputs.email.trim() === '') {
      setEmailError(true);
      readyToSubmit = false;
    }

    if (inputs.password.trim() === '') {
      setPasswordError(true);
      readyToSubmit = false;
    }

    if (readyToSubmit) {
      console.log('submit', inputs)

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            email: inputs.email,
            password: inputs.password
          }
        )
      };

      setIsSubmitting(true);
      fetch('https://cors-anywhere.herokuapp.com/https://apptesting.docsumo.com/api/v1/eevee/login/', requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log('response', response);
          if (response?.status === 'success') {
            toast.success(`Hello ${response?.data?.user?.full_name}`); 
            setInputs({
              email: '',
              password: ''
            })
          } else {
            toast.error(response.error);
          }
          setIsSubmitting(false);
        })
        .catch(error => {
          toast.error('Oops. Something went wrong.');
          console.log('Error');
          setIsSubmitting(false);
        })
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <img src={logo} className={classes.logo} alt="logo" />
        <h4 className={classes.heading}>Login to Docsumo</h4>
        <form onSubmit={handleFormSubmit}>
          <div className={classes.inputWrapper}>
            <TextField
              type='email'
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, email: e.target.value })
                setEmailError(false);
              }}
              className={`${classes.input} ${classes.emailInput}`} label="Work Email" fullWidth
              helperText={emailError ? <span className={classes.helperText}>Please enter your email address</span> : <span>&nbsp;</span>}
            />
            <TextField
              type='password'
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value })
                setPasswordError(false);
              }}
              className={classes.input} label="Password" fullWidth
              helperText={passwordError ? <span className={classes.helperText}>Please enter your password</span> : <span>&nbsp;</span>}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button type='submit' className={`${classes.button}`}>
              {isSubmitting ? 'Please wait...' : 'Login'}
            </button>
          </div>
        </form>
        <div className={classes.additionalWrapper}>
          <p className={classes.signupText}> Don't have an account?</p>
          <button className={classes.signUpBtn}> Sign up</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}


const useStyles = makeStyles({
  root: {
    background: '#F7F8FF',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '370px',
    height: '420px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px hsla(0,0%,42.7%,.5)'
  },
  input: {
    display: 'block'
  },
  heading: {
    textAlign: 'center',
    fontSize: '22px',
    color: '#3d3d3d',
    padding: '0px',
    margin: '0px',
    marginTop: '10px'
  },
  logo: {
    width: '70px',
    height: '70px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-35px'
  },
  inputWrapper: {
    marginTop: '15px',
    padding: '24px'
  },
  buttonWrapper: {
    padding: '5px 24px 10px 24px'
  },
  emailInput: {
    marginBottom: '10px'
  },
  button: {
    backgroundColor: '#526199',
    padding: '12px 0px',
    width: '100%',
    fontSize: '14px',
    color: 'white',
    borderRadius: '20px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: '#526199'
    },
    "&:focus": {
      outline: 'none'
    }
  },
  additionalWrapper: {
    padding: '10px 24px 10px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  signupText: {
    color: '#707070',
    fontSize: '14px'
  },
  signUpBtn: {
    border: '1px solid #405089',
    height: '32px',
    padding: '0px 16px',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '16px',
    color: '#526199',
    backgroundColor: 'white'
  },
  helperText: {
    color: '#fc493d'
  }
});

export default App;
