import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MenuContextProvider } from './context/menuContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <MenuContextProvider>
   <App />
   </MenuContextProvider>
  </React.StrictMode>
);


