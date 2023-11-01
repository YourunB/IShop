import React from 'react';

import './IShop.css';

import IShopProducts from './IShopProducts';
import IShopShowProduct from './IShopShowProduct';
import IShopEditProduct from './IShopEditProduct';

class IShop extends React.Component {

  state = {
    selectedProduct:null,
    editingProduct:false,
    blockedButtons:false,
    blockedButtonSave:false,

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

  render() {

    const productsCode=this.state.products.map( v => <IShopProducts 
      key={v.code}
      code={v.code} product={v.product} price={v.price} url={v.url} quantity={v.quantity} image={v.image}
      selectedProduct={this.state.selectedProduct}
      selectedProductChange={this.seclectProduct}
      deleteProduct={this.deleteProduct}
      editProduct={this.editProduct}
      blockedButtons={this.state.blockedButtons}
      />
    );

    const productShow=<IShopShowProduct
      product={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].product : ''}
      price={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].price : ''}
      image={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].image : ''}
      selectedProduct={this.state.selectedProduct}
    />

    const productEdit=<IShopEditProduct
      product={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].product : ''}
      price={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].price : ''}
      url={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].url : ''}
      quantity={(this.state.selectedProduct !== null) ? this.state.products[this.state.selectedProduct].quantity : ''}
      selectedProduct={this.state.selectedProduct}
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
        <button disabled={this.state.blockedButtons}>New product</button>
        {productShow}
        {productEdit}
      </div>
    );

  }

}

export default IShop;
