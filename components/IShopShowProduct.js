import React from 'react';

import './IShopShowProduct.css';

class IShopShowProduct extends React.Component {

  render() {

      return (
        <div className={(this.props.selectedProduct !== null && this.props.editingProduct === false) ? 'IShopShowProduct' : 'IShopShowProduct unvisible'}>
          <h3>{this.props.product}</h3>
          <img src={this.props.image}></img>
          <p>Price: {this.props.price}</p>
        </div>
      );
    }

  }
  
  export default IShopShowProduct;