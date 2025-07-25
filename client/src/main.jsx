import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MantineProvider } from '@mantine/core';
import 'aos/dist/aos.css';
import AOS from 'aos';
AOS.init({ duration: 800, once: true });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
