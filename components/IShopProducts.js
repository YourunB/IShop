import React from 'react';

import './IShopProducts.css';

class IShopProducts extends React.Component {

  render() {

    return (
      <tr className='IShopProducts'>
        <td className='IShopProducts__name'>{this.props.product}</td>
        <td><img className='IShopProducts__image' src={this.props.image} /></td>
        <td className='IShopProducts__price'>{this.props.price}</td>
        <td><a href={this.props.url} target='_blank'>{this.props.url}</a></td>
        <td>{this.props.quantity}</td>
        <td><button id={this.props.code}>Remove</button></td>
      </tr>
    );

  }

}

export default IShopProducts;
