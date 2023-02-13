import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Component } from 'react';
import Product from './product';
import Footer from './footer';
import { Button } from 'bootstrap';

function ProductPage() {

   const [products, setProducts] = useState([]);

   useEffect(() => {
      Axios.get("http://localhost:3002/api/get").then((response) => {
         setProducts(response.data)
      });
   }, [])

   return (
      <div>
         <NavBar />
         <div className="row justify-content-center">
            {products.map((product) => {
               return (
                  <Product {...product} />
               )
            })}
         </div>
         <Footer />
      </div>
   );
}

class NavBar extends Component {

   render() {

      function deleteAll() {
         let checkboxes = document.getElementsByClassName('form-check-input');

         for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked == true) {
               Axios.post('http://localhost:3002/api/delete/', { SKU: checkboxes[i].value });
               console.log(checkboxes[i].value)
            }
         }
         window.location.href = '/';
      }
      return (
         <div>
            <div className='d-flex flex-row pt-5'>
               <div className='col-6 my-auto'>
                  <h1 className='ps-3'>Product List</h1>
               </div>
               <div className='d-flex justify-content-end col-6 my-auto'>
                  <a href='/add-product' className='btn btn-outline-primary me-3'> ADD</a>
                  <button onClick={deleteAll} className="btn btn-outline-primary me-3 delete-checkbox"> MASS DELETE</button>
               </div>
            </div>
            <div>
               <hr className='m-3'></hr>
            </div>
         </div >
      );
   }
}

export default ProductPage;
