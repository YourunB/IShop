import React from 'react';

import './IShopProducts.css';

class IShopProducts extends React.Component {

  checkedProductChanged = () => {
    this.props.selectedProductChange(this.props.code);
  };

  deleteProduct = () => {
    if (confirm('Are you sure?')) this.props.deleteProduct(this);
  }

  render() {

    return (
      <tr className={(this.props.selectedProduct===this.props.code) ? 'IShopProducts checked' : 'IShopProducts'}>
        <td onClick={this.checkedProductChanged} className='IShopProducts__name'>{this.props.product}</td>
        <td onClick={this.checkedProductChanged}><img className='IShopProducts__image' src={this.props.image} /></td>
        <td onClick={this.checkedProductChanged} className='IShopProducts__price'>{this.props.price}</td>
        <td onClick={this.checkedProductChanged}><a href={this.props.url} target='_blank'>{this.props.url}</a></td>
        <td onClick={this.checkedProductChanged}>{this.props.quantity}</td>
        <td><button onClick={this.deleteProduct}>Remove</button></td>
      </tr>
    );

  }

}

export default IShopProducts;
