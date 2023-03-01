import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Component } from 'react';
import Product from './product';
import Footer from './footer';

function ProductPage() {

   const [products, setProducts] = useState([]);

   //async function deleteAll() {
   const deleteAll = async () => {

      // let checkboxes = Array.from(document.getElementsByClassName('delete-checkbox'));

      // for (let i = 0; i < checkboxes.length; i++) {

      const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
      // // const copy = Array.from(checkboxes);

      for (const cb of checkboxes) {
         //if (checkboxes[i].checked === true) {
         if (cb.checked === true) {
            //console.log(checkboxes[i].value);
            console.log(cb.value);
            try {
               await
                  // Axios.post('https://server-abqady.vercel.app/delete', { SKU: checkboxes[i].value })
                  Axios.post('https://server-abqady.vercel.app/delete', { SKU: cb.value })
                     .then((response) => {
                        console.log(response.status);
                        console.log(response.data);
                     })
               // //  .then(cb.classList.add("d-none"))
               //   .then(checkboxes[i].classList.add("d-none"))
               // .then(
               //    this.setState({
               //       products: this.state.products.filter(product => product.SKU !== checkboxes[i].value)
               //    })
               // );
               //.then(this.setProducts(this.state.products.filter(product => product.SKU !== checkboxes[i].value)))
               //.then(deleteProduct(checkboxes[i].value))
               // .then(setProducts(products.filter(product => product.SKU !== checkboxes[i].value)))
               //.then(setProducts(products.filter(product => product.SKU !== cb.value)))
            } catch (e) {

            }
            // console.log(checkboxes[i].value);
            // // console.log(cb.value);
         }
      }
      // // for (const cb of copy) {
      //    copy.filter(product => product.SKU !== cb.value);
      // }
      // // console.log(copy);
      // // setProducts(copy);
      // document.getElementsById("delete-checkbox").classList.add("d-none");
      window.location.reload();
   }

   useEffect(async () => {
      await Axios.get("https://server-abqady.vercel.app/get").then((response) => {
         setProducts(response.data)
      });
   }, [])

   return (
      <div>
         {/* <NavBar /> */}
         <div>
            <div className='d-flex flex-row pt-5'>
               <div className='col-6 my-auto'>
                  <h1 className='ps-3'>Product List</h1>
               </div>
               <div className='d-flex justify-content-end col-6 my-auto'>
                  <a href='/add-product' className='btn btn-outline-primary me-3'> ADD</a>
                  <button onClick={() => { deleteAll(); }} id="delete-product-btn" className="btn btn-outline-primary me-3"> MASS DELETE</button>
               </div>
            </div>
            <div>
               <hr className='m-3'></hr>
            </div>
         </div >

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

// class NavBar extends Component {

//    render() {
//       // function deleteProduct(sku) {
//       //    const copy = [...this.products];
//       //    copy.splice(sku, 1);
//       //    this.setProducts(copy);
//       // }

//       // //async function deleteAll() {
//       // const deleteAll = async () => {

//       //    let checkboxes = document.getElementsByClassName('delete-checkbox');

//       //    for (var i = 0; i < checkboxes.length; i++) {
//       //       if (checkboxes[i].checked === true) {
//       //          try {
//       //             await
//       //                Axios.post('https://server-abqady.vercel.app/delete', { SKU: checkboxes[i].value })
//       //                   .then((response) => {
//       //                      console.log(response.status);
//       //                      console.log(response.data);
//       //                   })
//       //                   //  .then(checkboxes[i].classList.add("d-none"))
//       //                   // .then(
//       //                   //    this.setState({
//       //                   //       products: this.state.products.filter(product => product.SKU !== checkboxes[i].value)
//       //                   //    })
//       //                   // );
//       //                   //.then(this.setProducts(this.state.products.filter(product => product.SKU !== checkboxes[i].value)))
//       //                   .then(deleteProduct(checkboxes[i].value))
//       //          } catch (e) {

//       //          }
//       //          console.log(checkboxes[i].value);
//       //       }
//       //    }
//       //    // document.getElementsById("delete-checkbox").classList.add("d-none");
//       //    //window.location.reload();
//       // }

//       return (
//          // <div>
//          //    <div className='d-flex flex-row pt-5'>
//          //       <div className='col-6 my-auto'>
//          //          <h1 className='ps-3'>Product List</h1>
//          //       </div>
//          //       <div className='d-flex justify-content-end col-6 my-auto'>
//          //          <a href='/add-product' className='btn btn-outline-primary me-3'> ADD</a>
//          //          <button onClick={() => { deleteAll(); }} className="btn btn-outline-primary me-3 delete-checkbox"> MASS DELETE</button>
//          //       </div>
//          //    </div>
//          //    <div>
//          //       <hr className='m-3'></hr>
//          //    </div>
//          // </div >
//       );
//    }
// }

export default ProductPage;
