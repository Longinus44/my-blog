import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setErrorMsg('');
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f0f2f5"
      px={2}
    >
      <Box
        bgcolor="white"
        padding={4}
        borderRadius={4}
        boxShadow={3}
        width={{ xs: '100%', sm: 400 }}
      >
        <Typography variant="h5" mb={2} align="center">
          Sign In to Your Account
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end" mb={1}>
          <MuiLink component={Link} to="/forgot-password" variant="body2">
            Forgot password?
          </MuiLink>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>

        <Typography align="center" my={2} color="textSecondary">
          or
        </Typography>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          size="large"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In with Google'}
        </Button>

        <Typography align="center" mt={3}>
          Don't have an account?{' '}
          <MuiLink component={Link} to="/signup" fontWeight="bold">
            Sign Up
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignIn;