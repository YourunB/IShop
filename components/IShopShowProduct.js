import React from 'react';
import PropTypes from 'prop-types';

import './IShopShowProduct.css';

class IShopShowProduct extends React.Component {

  static propTypes = {
    selectedProduct: PropTypes.number,
    editingProduct: PropTypes.bool.isRequired,
  };

  render() {

      return (
        <div className={(this.props.selectedProduct !== null && this.props.editingProduct === false) ? 'IShopShowProduct' : 'IShopShowProduct unvisible'}>
          <h3>{ (this.props.product !== null) ? this.props.product.product : ''}</h3>
          <img src={ (this.props.product !== null) ? this.props.product.image : ''}></img>
          <p>Price: { (this.props.product !== null) ? this.props.product.price : ''}</p>
        </div>
      );
    }

  }
  
  export default IShopShowProduct;