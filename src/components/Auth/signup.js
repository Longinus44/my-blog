import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
          Create a New Account
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

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleSignUp}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </Button>

        <Typography align="center" my={2} color="textSecondary">
          or
        </Typography>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          size="large"
          onClick={handleGoogleSignUp}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up with Google'}
        </Button>

        <Typography align="center" mt={3}>
          Already have an account?{' '}
          <MuiLink component={Link} to="/signin" fontWeight="bold">
            Sign In
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
