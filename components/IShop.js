import React from 'react';

import './IShop.css';

import IShopProducts from './IShopProducts';

class IShop extends React.Component {

  render() {

    const productsCode=this.props.products.map( v =>
      <IShopProducts key={v.code} code={v.code} product={v.product} price={v.price} url={v.url} quantity={v.quantity} image={v.image}/>
    );

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
      </div>
    );

  }

}

export default IShop;
