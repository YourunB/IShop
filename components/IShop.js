import React from 'react';

import './IShop.css';

import IShopProducts from './IShopProducts';
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
    const productsCopy = JSON.parse(JSON.stringify(this.state.products));
    const result = productsCopy.filter((item) => item.code !== product.props.code);
    this.setState( {products:result} )
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

  render() {

    const productsCode=this.state.products.map( v => <IShopProducts 
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
