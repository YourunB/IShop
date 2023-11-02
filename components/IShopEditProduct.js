import React from 'react';

import './IShopEditProduct.css';

class IShopEditProduct extends React.Component {

  state = {
    product: this.props.product,
    price: this.props.price,
    url: this.props.url,
    quantity: this.props.quantity,

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
    this.setState( {product:this.props.product, productError:''} );
    this.setState( {price:this.props.price, priceError:''} );
    this.setState( {url:this.props.url, urlError:''} );
    this.setState( {quantity:this.props.quantity, quantityError:''} );
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product || this.props.price !== prevProps.price || this.props.url !== prevProps.url || this.props.quantity !== prevProps.quantity) {
      this.setState( {
        product:this.props.product, productError:'',
        price:this.props.price, priceError:'',
        url:this.props.url, urlError:'',
        quantity:this.props.quantity, quantityError:'',
      }, () => this.checkButtonSave() );
      this.blockButtons(false);
    }
   }

  render() {

      return (
        <div className={(this.props.editingProduct === true) ? 'IShopEditProduct' : 'IShopEditProduct unvisible'}>
          <h3>{(this.props.addedProduct === true) ? 'Add New Product' : 'Edit existing Product'}</h3>
          <span>Name: </span><input onInput={ () => {this.checkInput('productError'); this.blockButtons(true)} } onChange={ () => this.changeText('product')} value={this.state.product}></input><span className='IShopEditProduct__error'>{this.state.productError}</span>
          <span>Price: </span><input type='number' onInput={ () => {this.checkInput('priceError'); this.blockButtons(true)} } onChange={ () => this.changeText('price')} value={this.state.price}></input><span className='IShopEditProduct__error'>{this.state.priceError}</span>
          <span>URL: </span><input onInput={ () => {this.checkInput('urlError'); this.blockButtons(true)} } onChange={ () => this.changeText('url')} value={this.state.url}></input><span className='IShopEditProduct__error'>{this.state.urlError}</span>
          <span>Quantity: </span><input type='number' onInput={ () => {this.checkInput('quantityError'); this.blockButtons(true)} } onChange={ () => this.changeText('quantity')} value={this.state.quantity}></input><span className='IShopEditProduct__error'>{this.state.quantityError}</span>
          <div className='IShopEditProduct__controls'>
            <button disabled={this.state.blockedButtonSave}>{(this.props.addedProduct === true) ? 'Add' : 'Save'}</button>
            <button onClick={this.cancelEdit}>Cancel</button>
          </div>
        </div>
      );
    }

  }
  
  export default IShopEditProduct;