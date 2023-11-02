import React from 'react';

import './IShopProducts.css';

class IShopProducts extends React.Component {

  checkedProductChanged = () => {
    if (this.props.selectedProductBlock === false) {
      this.props.selectedProductChange(this.props.code);
      this.props.editProduct(false);
    }
  };

  deleteProduct = event => {
    event.stopPropagation();
    if (confirm('Are you sure?')) this.props.deleteProduct(this);
  }

  editProduct = event => {
    event.stopPropagation();
    this.props.selectedProductChange(this.props.code);
    this.props.editProduct(true);
    this.props.addProduct(false);
  }

  saveProduct = () => {
    
  }

  render() {

    return (
      <tr className={(this.props.selectedProduct===this.props.code) ? 'IShopProducts checked' : 'IShopProducts'} onClick={this.checkedProductChanged}>
        <td className='IShopProducts__name'>{this.props.product}</td>
        <td><img className='IShopProducts__image' src={this.props.image} /></td>
        <td className='IShopProducts__price'>{this.props.price}</td>
        <td><a href={this.props.url} target='_blank'>{this.props.url}</a></td>
        <td>{this.props.quantity}</td>
        <td>
          <button disabled={this.props.blockedButtons} onClick={this.editProduct}>Edit</button>
          <button disabled={this.props.blockedButtons} onClick={this.deleteProduct}>Remove</button>
        </td>
      </tr>
    );

  }

}

export default IShopProducts;
