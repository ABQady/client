import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Component } from 'react';
import Product from './product';
import Footer from './footer';

function ProductPage() {

   const [products, setProducts] = useState([]);

   useEffect(async () => {
      await Axios.get("https://server-abqady.vercel.app/get").then((response) => {
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
      async function timeout(delay) {
         return new Promise(res => setTimeout(res, delay));
      }

      //async 
      function deleteAll() {

         let checkboxes = document.getElementsByClassName('delete-checkbox');

         for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true) {
               try {
                  //await 
                  Axios.post('https://server-abqady.vercel.app/delete', { SKU: checkboxes[i].value });
               } catch (e) {

               }
               console.log(checkboxes[i].value);
            }
         }
         //await 
         //timeout(1000).then(window.location.reload());
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
