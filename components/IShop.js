import React from 'react';

import './IShop.css';

import IShopProducts from './IShopProducts';

class IShop extends React.Component {

  state = {
    selectedProduct:null,
    editingProduct:false,
    blockedButtons:false,
    blockedButtonSave:false,

    errorInputProduct:'',
    errorInputPrice:'',
    errorInputURL:'',
    errorInputQuantity:'',

    products:JSON.parse(JSON.stringify(this.props.products)),
  };

  seclectProduct = (number) => {
    this.setState( {selectedProduct:number} );
  }
  
  deleteProduct = (product) => {
    const productsCopy = JSON.parse(JSON.stringify(this.state.products));
    const result = productsCopy.filter((item) => item.code !== product.props.code);
    this.setState( {products:result} )
  }

  editProduct = () => {
    this.setState( {editingProduct:true} )
  }

  blockButtons = (btn) => {
    if (btn === 'save') this.setState( {blockedButtonSave:true} )
    this.setState( {blockedButtons:true} );
  }

  unblockButtons = (btn) => {
    if (btn === 'save') this.setState( {blockedButtonSave:false} )
    this.setState( {blockedButtons:false} );
  }

  checkInput = (inputName, str) => {
    if (str.length === 0) {
      this.blockButtons('save');
      this.setState( {[inputName]:'Error input' } );
    } else {
      this.unblockButtons('save');
      this.setState( {[inputName]:'' } );
    }
  }

  render() {

    const productsCode=this.state.products.map( v =>
      <IShopProducts 
      key={v.code}
      code={v.code} product={v.product} price={v.price} url={v.url} quantity={v.quantity} image={v.image}
      selectedProduct={this.state.selectedProduct}
      selectedProductChange={this.seclectProduct}
      deleteProduct={this.deleteProduct}
      editProduct={this.editProduct}
      blockedButtons={this.state.blockedButtons}
      />
    );

    return (
      <div className='IShop'>
        <h3 className='IShop__title'>Products for example:</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Product</th>
              <th>Price</th>
              <th>URL</th>
              <th>Quantity</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {productsCode}
          </tbody>
        </table>
        <button disabled={this.state.blockedButtons}>New product</button>

        <div className={(this.state.selectedProduct !== null && this.state.editingProduct === false) ? 'IShop__info' : 'IShop__info unvisible'}>
          <h3>{(this.state.selectedProduct !== null && this.state.editingProduct === false) ? this.state.products[this.state.selectedProduct].product : ''}</h3>
          <p>{(this.state.selectedProduct !== null && this.state.editingProduct === false) ? `price: ${this.state.products[this.state.selectedProduct].price}` : ''}</p>
        </div>

        <div className='IShop__edit'>
          <h3>Edit existing Product</h3>
          <div className='IShop__edit_conatiner'>
            Name: <input onInput={ () => {this.blockButtons(), this.checkInput('errorInputProduct', event.target.value)} } defaultValue={(this.state.selectedProduct !== null && this.state.editingProduct !== false) ? this.state.products[this.state.selectedProduct].product : ''} id='product-name'></input><label htmlFor='product-name' className='IShop__edit_conatiner_error'>{this.state.errorInputProduct}</label>
            Price: <input onInput={ () => {this.blockButtons(), this.checkInput('errorInputPrice', event.target.value)} } id='product-price'></input><label className='IShop__edit_conatiner_error' htmlFor='product-price'>{this.state.errorInputPrice}</label>
            URL: <input onInput={ () => {this.blockButtons(), this.checkInput('errorInputURL', event.target.value)} } id='product-url'></input><label className='IShop__edit_conatiner_error' htmlFor='product-url'>{this.state.errorInputURL}</label>
            Quantity: <input onInput={ () => {this.blockButtons(), this.checkInput('errorInputQuantity', event.target.value)} } id='product-quantity'></input><label className='IShop__edit_conatiner_error' htmlFor='product-quantity'>{this.state.errorInputQuantity}</label>
          </div>
          <div className='IShop__edit_control'>
            <button disabled={this.state.blockedButtonSave}>Save</button><button>Cancel</button>
          </div>
        </div>
        
      </div>
    );

  }

}

export default IShop;
