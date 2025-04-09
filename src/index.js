import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Container } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Container maxWidth="lg">
    <App />
    </Container>
  </React.StrictMode>
);
