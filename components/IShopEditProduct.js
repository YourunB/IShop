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
  }

  changeText = (field) => {
    this.setState( {[field]:event.target.value} )
  }

  checkInput = (field) => {
    if (event.target.value === '') {
      this.setState( {[field]:'Error Input'} );
    } else {
      this.setState( {[field]:''} );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) this.setState( {product:this.props.product, productError:''} );
    if (this.props.price !== prevProps.price) this.setState( {price:this.props.price, priceError:''} );
    if (this.props.url !== prevProps.url) this.setState( {url:this.props.url, urlError:''} );
    if (this.props.quantity !== prevProps.quantity) this.setState( {quantity:this.props.quantity, quantityError:''} );
   }

  render() {

      return (
        <div className='IShopEditProduct'>
          <h3>Edit existing Product</h3>
          <span>Name: </span><input onInput={ () => this.checkInput('productError')} onChange={ () => this.changeText('product')} value={this.state.product}></input><span>{this.state.productError}</span>
          <span>Price: </span><input onChange={ () => this.changeText('price')} value={this.state.price}></input>
          <span>URL: </span><input onChange={ () => this.changeText('url')} value={this.state.url}></input>
          <span>Quantity: </span><input onChange={ () => this.changeText('quantity')} value={this.state.quantity}></input>
        </div>
      );
    }

  }
  
  export default IShopEditProduct;