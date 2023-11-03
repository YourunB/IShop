import React from 'react';
import PropTypes from 'prop-types';

import './IShopProduct.css';

class IShopProduct extends React.Component {

  static propTypes = {
    code: PropTypes.number,
    product: PropTypes.string,
    price: PropTypes.number,
    url: PropTypes.string,
    quantity: PropTypes.number,
    image: PropTypes.string,
    selectedProduct: PropTypes.number,
    selectedProductChange: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
    blockedButtons: PropTypes.bool.isRequired,
    selectedProductBlock: PropTypes.bool.isRequired,
    addedProduct: PropTypes.bool.isRequired,
    addProduct: PropTypes.func.isRequired,
  };

  checkedProductChanged = () => {
    if (this.props.selectedProductBlock === false) {
      this.props.selectedProductChange(this.props.code);
      this.props.editProduct(false);
    }
  };

  deleteProduct = event => {
    event.stopPropagation();
    if (confirm('Are you sure?')) {
      this.props.deleteProduct(this);
      this.props.addProduct(false);
      this.props.editProduct(false);
    }
  }

  editProduct = event => {
    event.stopPropagation();
    this.props.selectedProductChange(this.props.code);
    this.props.editProduct(true);
    this.props.addProduct(false);
  }

  render() {

    return (
      <tr className={(this.props.selectedProduct===this.props.code) ? 'IShopProduct checked' : 'IShopProduct'} onClick={this.checkedProductChanged}>
        <td className='IShopProduct__name'>{this.props.product}</td>
        <td><img className='IShopProduct__image' src={this.props.image} /></td>
        <td className='IShopProduct__price'>{this.props.price}</td>
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

export default IShopProduct;
