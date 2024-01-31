import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from 'react';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { THEME } from "./utils/custom/Theme";
import { ThemeProvider } from "@mui/material/styles";

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const firebaseConfig = {
  apiKey: "AIzaSyASdlfob7hRD1ijQdqLAQgZYHQtquwPsoM",
  authDomain: "mountx-learning.firebaseapp.com",
  projectId: "mountx-learning",
  storageBucket: "mountx-learning.appspot.com",
  messagingSenderId: "534323228384",
  appId: "1:534323228384:web:dd7a2f0b3e19b3776a2a85",
  measurementId: "G-8GP05QTNQV"
};


initializeApp(firebaseConfig);
// getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
  <ThemeProvider theme={THEME}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

root.render(<StrictMode>{app}</StrictMode>);

reportWebVitals();
