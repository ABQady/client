import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import './App.css'
import Footer from './footer';

function CreateProduct() {

   const [switcher, setSwitcher] = useState("");

   const [sku, setSKU] = useState("");
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [size, setSize] = useState("0");
   const [weight, setWeight] = useState("0");
   const [height, setHeight] = useState("0");
   const [width, setWidth] = useState("0");
   const [length, setLength] = useState("0");
   const [dimensions, setDimensions] = useState("");

   function validateForm() {
      var fsku = document.forms["product_form"]["sku"].value;
      var fname = document.forms["product_form"]["name"].value;
      var fprice = document.forms["product_form"]["price"].value;
      var fsize = document.forms["product_form"]["size"].value;
      var fweight = document.forms["product_form"]["weight"].value;
      var fheight = document.forms["product_form"]["height"].value;
      var fwidth = document.forms["product_form"]["width"].value;
      var flength = document.forms["product_form"]["length"].value;

      var missingFlag = false;
      var errorFlag = false;

      if (fsku == "") {
         missingFlag = true;
      } else if (!/^[0-9]+$/i.test(fsku)) {
         errorFlag = true;
      }
      if (fname == "") {
         missingFlag = true;
      } else if (!/^[A-Z0-9._%+-]+$/i.test(fname)) {
         errorFlag = true;
      }
      if (fprice == "") {
         missingFlag = true;
      } else if (!/^[0-9]+$/i.test(fprice)) {
         errorFlag = true;
      }
      if (switcher == 'DVD') {
         if (fsize == "") {
            missingFlag = true;
         } else if (!/^[0-9]+$/i.test(fsize)) {
            errorFlag = true;
         }
      } else if (switcher == 'Book') {
         if (fweight == "") {
            missingFlag = true;
         } else if (!/^[0-9]+$/i.test(fweight)) {
            errorFlag = true;
         }
      } else if (switcher == 'Furniture') {
         if (fheight == "") {
            missingFlag = true;
         } else if (!/^[0-9]+$/i.test(fheight)) {
            errorFlag = true;
         }
         if (fwidth == "") {
            missingFlag = true;
         } else if (!/^[0-9]+$/i.test(fwidth)) {
            errorFlag = true;
         }
         if (flength == "") {
            missingFlag = true;
         } else if (!/^[0-9]+$/i.test(flength)) {
            errorFlag = true;
         }
      }
      if (errorFlag) {
         alert("Please, provide the data of indicated type");
         return false;
      }
      else if (missingFlag) {
         alert("Please, submit required data");
         return false;
      }
      else return true;

   }
   const navigate = useNavigate();
   function addProduct() {
      var dim = height + "x" + width + "x" + length;

      console.log(dim);
      setDimensions(dim);
      console.log(dimensions)
      if (validateForm()) {
         Axios.post('https://server-abqady.vercel.app/api/create', { sku: sku, name: name, price: price, size: size, weight: weight, dimensions: dimensions, type: switcher });
         navigate('/', { replace: true });
      }
   }

   useEffect(() => {
      if (switcher == 'DVD') {
         document.getElementById("DVD").classList.remove("d-none")
         document.getElementById("Furniture").classList.add("d-none")
         document.getElementById("Book").classList.add("d-none")
      } else if (switcher == 'Furniture') {
         document.getElementById("Furniture").classList.remove("d-none")
         document.getElementById("DVD").classList.add("d-none")
         document.getElementById("Book").classList.add("d-none")
      } else if (switcher == 'Book') {
         document.getElementById("Book").classList.remove("d-none")
         document.getElementById("Furniture").classList.add("d-none")
         document.getElementById("DVD").classList.add("d-none")
      } else {
         document.getElementById("DVD").classList.add("d-none")
         document.getElementById("Furniture").classList.add("d-none")
         document.getElementById("Book").classList.add("d-none")
      }
   })

   return (
      <div>
         <div>
            <div className='d-flex flex-row pt-5'>
               <div className='col-6 my-auto'>
                  <h1 className='ps-3'>Product Add</h1>
               </div>
               <div className='d-flex justify-content-end col-6 my-auto'>
                  <button
                     onClick={() => {
                        addProduct();
                     }}
                     className='btn btn-outline-primary me-3'> Save</button>
                  <a href='/' className="btn btn-outline-primary me-3"> Cancel</a>
               </div>
            </div>
            <div>
               <hr className='m-3'></hr>
            </div>
         </div >

         <div className="m-3">
            <form id='product_form'>
               <div className='col-6'>
                  <div className='row mb-3'>
                     <label htmlFor='sku' className='col-4'>SKU: </label>
                     <input id='sku' className='col-8' type="text" onChange={(e) => { setSKU(e.target.value) }} required />
                  </div>
                  <div className='row mb-3'>
                     <label htmlFor='name' className='col-4'>Name: </label>
                     <input id='name' className='col-8' type="text" onChange={(e) => { setName(e.target.value) }} required />
                  </div>
                  <div className='row mb-3'>
                     <label htmlFor='price' className='col-4'>Price: </label>
                     <input id='price' className='col-8' type="text" onChange={(e) => { setPrice(e.target.value) }} required />
                  </div>
                  <div className='row mb-3'>
                     <label htmlFor='productType' className='col-4'>Type:</label>
                     <select id="productType" className='col-8' name="type" onChange={(e) => { setSwitcher(e.target.value) }}>
                        <option value="">---</option>
                        <option value="DVD">DVD</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Book">Book</option>
                     </select>
                  </div>

                  <div id='DVD' className='row mb-3  d-none'>
                     <label htmlFor='size' className='col-4'>Size (MB): </label>
                     <input id='size' className='col-8' type="text" value={size} onChange={(e) => setSize(e.target.value)} />
                     <label className='col-12 text-center mt-2'>Please, provide size </label>
                  </div>

                  <div id='Furniture' className='d-none'>
                     <div className='row mb-3'>
                        <label htmlFor='height' className='col-4'>Height: </label>
                        <input id='height' className='col-8' type="text" onChange={(e) => { setHeight(e.target.value) }}></input>
                     </div>
                     <div className='row mb-3'>
                        <label htmlFor='width' className='col-4'>Width: </label>
                        <input id='width' className='col-8' type="text" onChange={(e) => { setWidth(e.target.value) }}></input>
                     </div>
                     <div className='row mb-3'>
                        <label htmlFor='length' className='col-4'>Length: </label>
                        <input id='length' className='col-8' type="text" onChange={(e) => { setLength(e.target.value) }}></input>
                     </div>
                     <label className='col-12 text-center mt-2'>Please, provide dimensions </label>
                  </div>
                  <div id='Book' className='row mb-3 d-none'>
                     <label htmlFor='weight' className='col-4'>Weight (KG): </label>
                     <input id='weight' className='col-8' type="text" onChange={(e) => { setWeight(e.target.value) }}></input>
                     <label className='col-12 text-center mt-2'>Please, provide weight </label>
                  </div>
               </div>
            </form>
         </div>
         <Footer />
      </div >
   )
}

export default CreateProduct;