import React from 'react';
import PropTypes from 'prop-types';

import './IShop.css';

import IShopProduct from './IShopProduct';
import IShopShowProduct from './IShopShowProduct';
import IShopEditProduct from './IShopEditProduct';

class IShop extends React.Component {

  state = {
    selectedProduct:null,
    selectedProductBlock:false,
    editingProduct:false,
    blockedButtons:false,
    addedProduct:false,

    products:JSON.parse(JSON.stringify(this.props.products)),
  };

  seclectProduct = (number) => {
    if (this.state.selectedProductBlock === false) this.setState( {selectedProduct:number} );
  }

  seclectProductBlock = (bool) => {
    this.setState( {selectedProductBlock:bool} );
  }
  
  deleteProduct = (product) => {
    this.setState( {selectedProduct:null} )
    this.editProduct(false);
    const result = this.state.products.filter((item) => item.code !== product.props.code);
    for (let i = 0; i < result.length; i++) { result[i].code = i; }
    this.setState( {products:result.slice(0)} );
  }

  editProduct = (bool) => {
    this.setState( {editingProduct:bool} )
  }

  blockButtons = (bool) => {
    this.setState( {blockedButtons:bool} );
  }

  addProduct = (bool) => {
    this.setState( {addedProduct:bool} );
    this.editProduct(true);
  }

  addProductAndSelectReset = (bool) => {
    this.setState( {addedProduct:bool, selectedProduct:null} );
    this.editProduct(true);
  }

  saveProduct = (product, price, url, quantity, obj) => {
    const productsCopy = this.state.products; //поверхностная копия
    console.log(typeof productsCopy, productsCopy)
    if (this.state.addedProduct == true) {
      const arr = {
        code: productsCopy.length,
        product: product,
        price: price,
        image: 'http://alfa.dev-top-it.ru/local/templates/alpha/img/nophoto.jpg',
        url: url,
        quantity: quantity,
      }
      productsCopy.push(arr);
      this.setState( {products:productsCopy, addedProduct:false}, () => {
        this.blockButtons(false);
        this.seclectProductBlock(false);
        this.editProduct(false);
        this.seclectProduct(null);
      } );
    }

    if (this.state.addedProduct == false) {
      productsCopy.forEach(element => {
        if (element.code === this.state.selectedProduct) {
          element.product = product;
          element.price = price;
          element.url = url;
          element.quantity = quantity;
        }
      });
      this.setState( {products:productsCopy}, () => {
        this.blockButtons(false);
        this.seclectProductBlock(false);
        this.editProduct(false);
      } );
    }
  }

  render() {

    const productsCode=this.state.products.map( v => <IShopProduct 
      key={v.code}
      code={v.code} product={v.product} price={v.price} url={v.url} quantity={v.quantity} image={v.image}
      selectedProduct={this.state.selectedProduct}
      selectedProductChange={this.seclectProduct}
      deleteProduct={this.deleteProduct}
      editProduct={this.editProduct}
      blockedButtons={this.state.blockedButtons}
      selectedProductBlock={this.state.selectedProductBlock}
      addedProduct={this.state.addedProduct}
      addProduct={this.addProduct}
      />
    );

    const productShow=<IShopShowProduct
      product={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].product : ''}
      price={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].price : ''}
      image={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].image : ''}
      selectedProduct={this.state.selectedProduct}
      editingProduct={this.state.editingProduct}
    />

    const productEdit=<IShopEditProduct
      product={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].product : ''}
      price={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].price : ''}
      url={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].url : ''}
      quantity={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].quantity : ''}
      selectedProduct={this.state.selectedProduct}
      editingProduct={this.state.editingProduct}
      blockButtons={this.blockButtons}
      selectedProductBlock={this.state.selectedProductBlock}
      seclectProductBlock={this.seclectProductBlock}
      addedProduct={this.state.addedProduct}
      saveProduct={this.saveProduct}
      editProduct={this.editProduct}
    />

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
        <button disabled={this.state.blockedButtons} onClick={() => this.addProductAndSelectReset(true)}>New product</button>
        {productShow}
        {productEdit}
      </div>
    );

  }

}

export default IShop;
