import React from 'react';
import ReactDOM from 'react-dom';

import IShop from './components/IShop';
import productsArr from './products.json';

ReactDOM.render(
  <IShop 
    products={productsArr}
  />
  , document.getElementById('container') 
);
