// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './components/App/App';
// import { BrowserRouter as Router } from 'react-router-dom';
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <Router>
//         <App />
//     </Router>
// );
//




// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);
