import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from './productPage'
import CreateProduct from './createProduct';


export default function App() {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
  });
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<ProductPage />} />
        <Route path="/add-product" element={<CreateProduct />} />
      </Routes>
    </HashRouter >
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
