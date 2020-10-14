import React, { Component } from 'react';
import formatCurrency from '../util';

class Products extends Component {

  render() {
    const { products, addToCart } = this.props;
    return (
      <div>
        <ul className="products">
          {
            products.map(product => {
              return (
                <li key={product._id}>
                  <div className="product">
                    <a href={`#${product._id}`}>
                      <img src={product.image} alt={product.title} />
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button onClick={_ => addToCart(product)} className="button primary">Add to Cart</button>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

}

export default Products;