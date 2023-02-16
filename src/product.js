import { Component } from 'react';

class Product extends Component {

   render() {
      const { SKU, Name, Price, Size, Weight, Dimensions, Type } = this.props;

      let fields;
      if (this.props.Type == 'DVD') {
         fields = <h5 id='size' >{Size} MB</h5>;
      } else if (this.props.Type == 'Book') {
         fields = <h5 id='weight'>{Weight} KG</h5>
      } else if (this.props.Type == 'Furniture') {
         fields = <h5 id='dimensions'>{Dimensions} HxWxL</h5>
      }

      return (
         <div className='border p-3 m-3 col-10 col-sm-6 col-md-4 col-lg-3'>
            <input id='delete-checkbox' type="checkbox" className='ms-3 delete-checkbox' value={SKU}></input>
            <div className='my-auto text-center'>
               <h5>{SKU}</h5>
               <h5>{Name}</h5>
               <h5>{Price} $</h5>
               {fields}
            </div>
         </div>
      )
   }
}

export default Product;