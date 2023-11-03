import React from 'react';
import PropTypes from 'prop-types';

import './IShopEditProduct.css';

class IShopEditProduct extends React.Component {

  static propTypes = {
    editingProduct:PropTypes.bool.isRequired,
    selectedProductBlock: PropTypes.bool.isRequired,
    seclectProductBlock: PropTypes.func.isRequired,
    addedProduct: PropTypes.bool.isRequired,
    saveProduct: PropTypes.func.isRequired,
    editProduct: PropTypes.func.isRequired,
  };

  state = {
    product: (this.props.product !== null) ? this.props.product.product : '',
    price: (this.props.product !== null) ? this.props.product.price: '',
    url: (this.props.product !== null) ? this.props.product.url : '',
    quantity: (this.props.product !== null) ? this.props.product.quantity : '',

    productError:'',
    priceError:'',
    urlError:'',
    quantityError:'',

    blockedButtonSave:false,
  }

  changeText = (field) => {
    this.setState( {[field]:event.target.value} )
  }

  blockButtons = (bool) => {
    this.props.blockButtons(bool);
  }

  blockButtonSave = (bool) => {
    this.setState( {blockedButtonSave:bool} );
  }

  seclectProductBlock = (bool) => {
    this.props.seclectProductBlock(bool);
  }

  checkInput = (field) => {
    this.seclectProductBlock(true);
    if (event.target.value.length === 0) this.setState( {[field]:' Error Input'}, () => {this.checkButtonSave()} );
    else this.setState( {[field]:''}, () => {this.checkButtonSave()} );
  }

  checkButtonSave = () => {
    if (this.state.product === '' || this.state.price === '' || this.state.url === '' || this.state.quantity === '') this.blockButtonSave(true);
    else this.blockButtonSave(false);
  }
  
  blockButtonSave = (bool) => {
    this.setState( {blockedButtonSave:bool} );
  }
  
  cancelEdit = () => {
    this.seclectProductBlock(false);
    this.blockButtons(false);
    this.blockButtonSave(false);
    this.setState( {
      product: (this.props.product !== null) ? this.props.product.product : '', productError:'',
      price: (this.props.product !== null) ? this.props.product.price: '', productError:'',
      url: (this.props.product !== null) ? this.props.product.url : '', productError:'',
      quantity: (this.props.product !== null) ? this.props.product.quantity : '', productError:'',
    } );
    this.checkButtonSave();
    this.props.editProduct(false);
  }

  saveProduct = () => {
    this.props.saveProduct(this.state.product, this.state.price, this.state.url, this.state.quantity, this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product || this.props.price !== prevProps.price || this.props.url !== prevProps.url || this.props.quantity !== prevProps.quantity) {
      this.setState( {
        product: (this.props.product !== null) ? this.props.product.product : '', productError:'',
        price: (this.props.product !== null) ? this.props.product.price: '', productError:'',
        url: (this.props.product !== null) ? this.props.product.url : '', productError:'',
        quantity: (this.props.product !== null) ? this.props.product.quantity : '', productError:'',
      }, () => this.checkButtonSave() );
      this.blockButtons(false);
    }
   }

  render() {

      return (
        <div className={(this.props.editingProduct === true) ? 'IShopEditProduct' : 'IShopEditProduct unvisible'}>
          <h3>{(this.props.addedProduct === true) ? 'Add New Product' : 'Edit existing Product'}</h3>
          <div className='IShopEditProduct__container'>
            <span>Name: </span><input onInput={ () => {this.checkInput('productError'); this.blockButtons(true)} } onChange={ () => this.changeText('product')} value={this.state.product}></input><span className='IShopEditProduct__error'>{this.state.productError}</span>
            <span>Price: </span><input type='number' onInput={ () => {this.checkInput('priceError'); this.blockButtons(true)} } onChange={ () => this.changeText('price')} value={this.state.price}></input><span className='IShopEditProduct__error'>{this.state.priceError}</span>
            <span>URL: </span><input onInput={ () => {this.checkInput('urlError'); this.blockButtons(true)} } onChange={ () => this.changeText('url')} value={this.state.url}></input><span className='IShopEditProduct__error'>{this.state.urlError}</span>
            <span>Quantity: </span><input type='number' onInput={ () => {this.checkInput('quantityError'); this.blockButtons(true)} } onChange={ () => this.changeText('quantity')} value={this.state.quantity}></input><span className='IShopEditProduct__error'>{this.state.quantityError}</span>
          </div>
          <div className='IShopEditProduct__controls'>
            <button onClick={() => this.saveProduct(this)} disabled={this.state.blockedButtonSave}>{(this.props.addedProduct === true) ? 'Add' : 'Save'}</button>
            <button onClick={this.cancelEdit}>Cancel</button>
          </div>
        </div>
      );
    }

  }
  
  export default IShopEditProduct;