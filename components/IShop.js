﻿import React from 'react';

import './IShop.css';

import IShopProducts from './IShopProducts';

class IShop extends React.Component {

  state = {
    selectedProduct:null,
    products:JSON.parse(JSON.stringify(this.props.products)),
  };

  seclectProduct = (number) => {
    this.setState( {selectedProduct:number} );
  }

  deleteProduct = (product) => {
    for (let i = 0; i < this.state.products.length; i++) {
      if (this.state.products[i].code === product.props.code) {
        //delete this.state.products[i];
        this.state.products.splice(i, 1);
      }
    }
    console.log(this.state.products)
  }

  render() {

    const productsCode=this.state.products.map( v =>
      <IShopProducts key={v.code}
      code={v.code} product={v.product} price={v.price} url={v.url} quantity={v.quantity} image={v.image}
      selectedProduct={this.state.selectedProduct}
      selectedProductChange={this.seclectProduct}
      deleteProduct={this.deleteProduct}
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
      </div>
    );

  }

}

export default IShop;
